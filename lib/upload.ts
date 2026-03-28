import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads');
const USE_SUPABASE = !!(
  process.env.NEXT_PUBLIC_SUPABASE_URL &&
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const SUPABASE_BUCKET = 'uploads';

const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml'];
const ALLOWED_DOC_TYPES = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.ms-excel'];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export interface UploadResult {
  url: string;
  name: string;
  size: number;
  type: string;
}

function getSupabaseClient() {
  const { createClient } = require('@supabase/supabase-js');
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

export async function uploadFile(
  file: File,
  folder: string = 'general'
): Promise<UploadResult> {
  if (file.size > MAX_FILE_SIZE) {
    throw new Error('File size exceeds 10MB limit');
  }

  const isImage = ALLOWED_IMAGE_TYPES.includes(file.type);
  const isDoc = ALLOWED_DOC_TYPES.includes(file.type);

  if (!isImage && !isDoc) {
    throw new Error(`File type ${file.type} is not allowed`);
  }

  const ext = file.name.split('.').pop() || 'bin';
  const fileName = `${uuidv4()}.${ext}`;
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  if (USE_SUPABASE) {
    const supabase = getSupabaseClient();
    const storagePath = `${folder}/${fileName}`;

    const { error } = await supabase.storage
      .from(SUPABASE_BUCKET)
      .upload(storagePath, buffer, {
        contentType: file.type,
        upsert: false,
      });

    if (error) throw new Error(`Storage upload failed: ${error.message}`);

    const { data } = supabase.storage
      .from(SUPABASE_BUCKET)
      .getPublicUrl(storagePath);

    return {
      url: data.publicUrl,
      name: file.name,
      size: file.size,
      type: file.type,
    };
  }

  // Local filesystem (development)
  const uploadFolder = path.join(UPLOAD_DIR, folder);
  await mkdir(uploadFolder, { recursive: true });
  const filePath = path.join(uploadFolder, fileName);
  await writeFile(filePath, buffer);

  return {
    url: `/uploads/${folder}/${fileName}`,
    name: file.name,
    size: file.size,
    type: file.type,
  };
}

export async function deleteFile(url: string): Promise<void> {
  if (USE_SUPABASE && url.includes(process.env.NEXT_PUBLIC_SUPABASE_URL || '')) {
    const supabase = getSupabaseClient();
    // Extract path after /storage/v1/object/public/{bucket}/
    const match = url.match(/\/object\/public\/[^/]+\/(.+)$/);
    if (match) {
      await supabase.storage.from(SUPABASE_BUCKET).remove([match[1]]);
    }
    return;
  }

  if (url.startsWith('/uploads/')) {
    const { unlink } = await import('fs/promises');
    const filePath = path.join(process.cwd(), 'public', url);
    try {
      await unlink(filePath);
    } catch {
      // File may not exist on disk
    }
  }
}

export function getMediaType(mimeType: string): 'IMAGE' | 'DOCUMENT' | 'VIDEO' | 'OTHER' {
  if (mimeType.startsWith('image/')) return 'IMAGE';
  if (mimeType.startsWith('video/')) return 'VIDEO';
  if (
    mimeType === 'application/pdf' ||
    mimeType.includes('document') ||
    mimeType.includes('word') ||
    mimeType.includes('excel')
  )
    return 'DOCUMENT';
  return 'OTHER';
}
