import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads');

const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml'];
const ALLOWED_DOC_TYPES = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.ms-excel'];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export interface UploadResult {
  url: string;
  name: string;
  size: number;
  type: string;
  width?: number;
  height?: number;
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

  const uploadFolder = path.join(UPLOAD_DIR, folder);
  await mkdir(uploadFolder, { recursive: true });

  const ext = file.name.split('.').pop() || 'bin';
  const fileName = `${uuidv4()}.${ext}`;
  const filePath = path.join(uploadFolder, fileName);

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  await writeFile(filePath, buffer);

  const url = `/uploads/${folder}/${fileName}`;

  return {
    url,
    name: file.name,
    size: file.size,
    type: file.type,
  };
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
