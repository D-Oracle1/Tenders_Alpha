'use client';

import { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';

export interface GalleryImage {
  url: string;
  alt?: string | null;
}

interface ServiceGalleryProps {
  images: GalleryImage[];
  title: string;
}

/**
 * Displays a service's images as a large main image with a row of thumbnails.
 * Clicking the main image (or a thumbnail twice) opens a full-screen lightbox so
 * visitors can browse the full variety of photos for that service.
 */
export default function ServiceGallery({ images, title }: ServiceGalleryProps) {
  const [active, setActive] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const safeImages = images.filter((img) => img.url);
  const count = safeImages.length;

  const go = useCallback(
    (delta: number) => setActive((prev) => (prev + delta + count) % count),
    [count]
  );

  useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxOpen(false);
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightboxOpen, go]);

  if (count === 0) return null;

  const current = safeImages[active];

  return (
    <div className="mb-8">
      {/* Main image */}
      <button
        type="button"
        onClick={() => setLightboxOpen(true)}
        className="group relative block h-80 w-full overflow-hidden rounded-2xl md:h-[28rem]"
        aria-label="Open image gallery"
      >
        <Image
          src={current.url}
          alt={current.alt || title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          priority
        />
        <span className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full bg-black/50 px-3 py-1.5 text-xs font-medium text-white opacity-0 transition-opacity group-hover:opacity-100">
          <ZoomIn size={14} /> View
        </span>

        {count > 1 && (
          <>
            <span
              role="button"
              tabIndex={-1}
              onClick={(e) => {
                e.stopPropagation();
                go(-1);
              }}
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 text-primary shadow transition hover:bg-white"
            >
              <ChevronLeft size={20} />
            </span>
            <span
              role="button"
              tabIndex={-1}
              onClick={(e) => {
                e.stopPropagation();
                go(1);
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 text-primary shadow transition hover:bg-white"
            >
              <ChevronRight size={20} />
            </span>
            <span className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-3 py-1 text-xs font-medium text-white">
              {active + 1} / {count}
            </span>
          </>
        )}
      </button>

      {/* Thumbnails */}
      {count > 1 && (
        <div className="mt-4 grid grid-cols-4 gap-3 sm:grid-cols-5 md:grid-cols-6">
          {safeImages.map((img, i) => (
            <button
              key={`${img.url}-${i}`}
              type="button"
              onClick={() => setActive(i)}
              className={`relative aspect-square overflow-hidden rounded-lg transition ${
                i === active
                  ? 'ring-2 ring-accent ring-offset-2'
                  : 'opacity-70 hover:opacity-100'
              }`}
              aria-label={`View image ${i + 1}`}
            >
              <Image src={img.url} alt={img.alt || `${title} ${i + 1}`} fill className="object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            type="button"
            onClick={() => setLightboxOpen(false)}
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20"
            aria-label="Close gallery"
          >
            <X size={24} />
          </button>

          <div className="relative h-[80vh] w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <Image src={current.url} alt={current.alt || title} fill className="object-contain" />

            {count > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => go(-1)}
                  className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition hover:bg-white/20"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={28} />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition hover:bg-white/20"
                  aria-label="Next image"
                >
                  <ChevronRight size={28} />
                </button>
                <span className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white">
                  {active + 1} / {count}
                </span>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
