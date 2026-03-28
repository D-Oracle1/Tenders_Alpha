import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads');
const USE_CLOUDINARY = !!(
  process.env.CLOUDINARY_CLOUD_NAME &&
  process.env.CLOUDINARY_API_KEY &&
  process.env.CLOUDINARY_API_SECRET
);

const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml'];
const ALLOWED_DOC_TYPES = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.ms-excel'];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export interface UploadResult {
  url: string;
  name: string;
  size: number;
  type: string;
}

async function getCloudinary() {
  const { v2: cloudinary } = await import('cloudinary');
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  return cloudinary;
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

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  if (USE_CLOUDINARY) {
    const cloudinary = await getCloudinary();
    const result = await new Promise<{ secure_url: string }>((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder: `tenders-alpha/${folder}`,
          resource_type: 'auto',
          use_filename: true,
          unique_filename: true,
        },
        (error, result) => {
          if (error || !result) reject(error || new Error('Cloudinary upload failed'));
          else resolve(result);
        }
      ).end(buffer);
    });

    return {
      url: result.secure_url,
      name: file.name,
      size: file.size,
      type: file.type,
    };
  }

  // Local filesystem (development)
  const uploadFolder = path.join(UPLOAD_DIR, folder);
  await mkdir(uploadFolder, { recursive: true });

  const ext = file.name.split('.').pop() || 'bin';
  const fileName = `${uuidv4()}.${ext}`;
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
  if (USE_CLOUDINARY && url.includes('cloudinary.com')) {
    const cloudinary = await getCloudinary();
    // Extract public_id: everything after /upload/v{digits}/ or /upload/, strip extension
    const match = url.match(/\/upload\/(?:v\d+\/)?(.+)\.[^.]+$/);
    if (match) {
      await cloudinary.uploader.destroy(match[1]);
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
