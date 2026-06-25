'use client';

import { useState, useCallback, useRef } from 'react';
import Cropper, { Area } from 'react-easy-crop';
import Image from 'next/image';
import { Upload, X, Check, ZoomIn, Loader2, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

interface ImageUploadCropperProps {
  /** Current image URL */
  value?: string | null;
  /** Called with the uploaded image URL after a successful crop + upload */
  onChange: (url: string) => void;
  /** Storage folder for the upload (e.g. 'team') */
  folder?: string;
  /** Crop aspect ratio (width / height). Defaults to 1 (square). */
  aspect?: number;
  /** Render the preview as a circle (good for avatars). */
  round?: boolean;
  label?: string;
}

/** Build a cropped JPEG blob from the source image and crop area (in pixels). */
async function getCroppedBlob(src: string, area: Area): Promise<Blob> {
  const image = await new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new window.Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });

  const canvas = document.createElement('canvas');
  canvas.width = Math.round(area.width);
  canvas.height = Math.round(area.height);
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Could not get canvas context');

  ctx.drawImage(
    image,
    area.x,
    area.y,
    area.width,
    area.height,
    0,
    0,
    area.width,
    area.height
  );

  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error('Canvas is empty'))),
      'image/jpeg',
      0.9
    );
  });
}

export default function ImageUploadCropper({
  value,
  onChange,
  folder = 'general',
  aspect = 1,
  round = true,
  label = 'Photo',
}: ImageUploadCropperProps) {
  const [src, setSrc] = useState<string | null>(null); // image being cropped (object URL)
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const onCropComplete = useCallback((_: Area, areaPixels: Area) => {
    setCroppedAreaPixels(areaPixels);
  }, []);

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      toast.error('Please choose an image file');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      toast.error('Image must be under 10MB');
      return;
    }
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setSrc(URL.createObjectURL(file));
    // Allow re-selecting the same file later
    e.target.value = '';
  }

  function cancelCrop() {
    if (src) URL.revokeObjectURL(src);
    setSrc(null);
  }

  async function confirmCrop() {
    if (!src || !croppedAreaPixels) return;
    setUploading(true);
    try {
      const blob = await getCroppedBlob(src, croppedAreaPixels);
      const formData = new FormData();
      formData.append('file', new File([blob], `${folder}-${Date.now()}.jpg`, { type: 'image/jpeg' }));
      formData.append('folder', folder);

      const res = await fetch('/api/media', { method: 'POST', body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Upload failed');

      onChange(data.file.url);
      toast.success('Photo uploaded');
      cancelCrop();
    } catch (err: any) {
      toast.error(err.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      {label && <label className="form-label">{label}</label>}

      <div className="flex items-center gap-4">
        {/* Preview */}
        <div
          className={`relative w-20 h-20 flex-shrink-0 overflow-hidden bg-gray-100 border border-gray-200 ${
            round ? 'rounded-full' : 'rounded-lg'
          }`}
        >
          {value ? (
            <Image src={value} alt="Preview" fill className="object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-300">
              <Upload size={22} />
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="btn-outline text-sm"
          >
            <Upload size={15} /> {value ? 'Change photo' : 'Upload photo'}
          </button>
          {value && (
            <button
              type="button"
              onClick={() => onChange('')}
              className="text-xs text-red-500 inline-flex items-center gap-1 hover:underline"
            >
              <Trash2 size={13} /> Remove
            </button>
          )}
        </div>

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={onFileChange}
          className="hidden"
        />
      </div>

      <p className="text-xs text-gray-400 mt-2">Upload an image, then drag and zoom to crop.</p>

      {/* Crop modal */}
      {src && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="font-bold font-heading">Crop photo</h3>
              <button onClick={cancelCrop} className="p-1.5 hover:bg-gray-100 rounded-lg">
                <X size={18} />
              </button>
            </div>

            <div className="relative h-72 bg-gray-900">
              <Cropper
                image={src}
                crop={crop}
                zoom={zoom}
                aspect={aspect}
                cropShape={round ? 'round' : 'rect'}
                showGrid={!round}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            </div>

            <div className="p-4 space-y-4">
              <div className="flex items-center gap-3">
                <ZoomIn size={16} className="text-gray-400 flex-shrink-0" />
                <input
                  type="range"
                  min={1}
                  max={3}
                  step={0.01}
                  value={zoom}
                  onChange={(e) => setZoom(Number(e.target.value))}
                  className="w-full accent-primary"
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={confirmCrop}
                  disabled={uploading}
                  className="btn-primary flex-1 justify-center disabled:opacity-60"
                >
                  {uploading ? <Loader2 size={16} className="animate-spin" /> : <Check size={16} />}
                  {uploading ? 'Uploading…' : 'Apply & Upload'}
                </button>
                <button type="button" onClick={cancelCrop} className="btn-outline flex-1 justify-center">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
