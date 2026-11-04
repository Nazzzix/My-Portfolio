'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';

interface GalleryImage {
  src?: string;
  alt: string;
  caption?: string;
  width: number;
  height: number;
  fit?: 'cover' | 'contain';
}

interface ImageGalleryProps {
  images: GalleryImage[];
  /** Used in labels, e.g. "Spurt! Graphic Design". */
  label: string;
  /**
   * "masonry" preserves each artwork's aspect ratio (graphic design).
   * "screens" uses fixed-height crops that expand in the lightbox (UI screens).
   */
  variant?: 'masonry' | 'screens';
}

export function ImageGallery({ images, label, variant = 'masonry' }: ImageGalleryProps) {
  const isScreens = variant === 'screens';
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const triggerRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  const close = useCallback(() => {
    const current = selectedIndex;
    setSelectedIndex(null);

    if (current !== null) {
      window.setTimeout(() => triggerRefs.current[current]?.focus(), 0);
    }
  }, [selectedIndex]);

  const next = useCallback(() => {
    setSelectedIndex((current) =>
      current === null ? current : (current + 1) % images.length
    );
  }, [images.length]);

  const previous = useCallback(() => {
    setSelectedIndex((current) =>
      current === null ? current : (current - 1 + images.length) % images.length
    );
  }, [images.length]);

  useEffect(() => {
    if (selectedIndex === null) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        close();
        return;
      }

      if (event.key === 'ArrowRight') {
        event.preventDefault();
        next();
        return;
      }

      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        previous();
        return;
      }

      if (event.key === 'Tab' && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, [href], [tabindex]:not([tabindex="-1"])'
        );

        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    closeButtonRef.current?.focus();

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [selectedIndex, close, next, previous]);

  const activeImage = selectedIndex === null ? null : images[selectedIndex];

  return (
    <>
      <div
        className={
          isScreens
            ? 'grid grid-cols-1 gap-6 sm:grid-cols-2'
            : 'columns-1 gap-5 sm:columns-2 lg:columns-3'
        }
      >
        {images.map((image, index) => (
          <figure
            key={`${image.src ?? 'placeholder'}-${index}`}
            className={isScreens ? '' : 'mb-5 break-inside-avoid'}
          >
            <button
              ref={(element) => {
                triggerRefs.current[index] = element;
              }}
              type="button"
              onClick={() => setSelectedIndex(index)}
              className={`group relative block w-full overflow-hidden rounded-frame border border-line bg-sand/30 text-left transition-colors hover:border-ink/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-cream ${
                isScreens ? 'aspect-[16/10]' : ''
              }`}
              aria-label={`Open image ${index + 1} of ${images.length}: ${image.alt}`}
            >
              {image.src ? (
                isScreens ? (
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(min-width: 640px) 45vw, 92vw"
                    className={`${
                      image.fit === 'contain' ? 'object-contain p-2' : 'object-cover object-top'
                    } transition-transform duration-200 ease-out group-hover:scale-[1.01] motion-reduce:transition-none motion-reduce:group-hover:scale-100`}
                  />
                ) : (
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={image.width}
                    height={image.height}
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw"
                    className="h-auto w-full transition-transform duration-200 ease-out group-hover:scale-[1.015] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                  />
                )
              ) : (
                <div
                  className={`flex w-full flex-col items-center justify-center gap-2 border border-dashed border-line bg-cream p-6 text-center ${
                    isScreens ? 'h-full' : ''
                  }`}
                  style={
                    isScreens
                      ? undefined
                      : { aspectRatio: `${image.width} / ${image.height}` }
                  }
                >
                  <span className="font-mono text-[11px] font-semibold uppercase tracking-label text-vermilion-deep">
                    Asset to be added
                  </span>
                  <span className="font-sans text-xs text-stone">
                    {label}, image {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
              )}

              {isScreens && image.caption && (
                <span className="absolute left-3 top-3 rounded-full border border-line bg-paper/95 px-2.5 py-1 font-mono text-[10px] uppercase tracking-label text-ink">
                  {image.caption}
                </span>
              )}
            </button>

            {!isScreens && image.caption && (
              <figcaption className="mt-2 font-mono text-[11px] uppercase tracking-label text-stone">
                {image.caption}
              </figcaption>
            )}
          </figure>
        ))}
      </div>

      {activeImage && selectedIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/85 p-4 sm:p-6"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) close();
          }}
        >
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={`Image viewer: ${label}`}
            className="flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-card border border-line bg-paper shadow-2xl"
          >
            <div className="flex items-center justify-between gap-4 border-b border-line bg-cream p-3 sm:p-4">
              <div className="min-w-0">
                <p className="truncate font-mono text-[11px] uppercase tracking-label text-vermilion-deep">
                  {label}
                </p>
                <p className="mt-0.5 font-mono text-[11px] text-stone">
                  Image {selectedIndex + 1} of {images.length}
                </p>
              </div>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={close}
                className="shrink-0 rounded-button bg-ink px-3 py-2 font-mono text-xs uppercase tracking-label text-cream transition-colors hover:bg-vermilion-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vermilion focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
                aria-label="Close image viewer (Escape)"
              >
                Close
              </button>
            </div>

            <div className="flex min-h-0 flex-1 items-center justify-center overflow-auto bg-sand/20 p-3 sm:p-6">
              {activeImage.src ? (
                <Image
                  src={activeImage.src}
                  alt={activeImage.alt}
                  width={activeImage.width}
                  height={activeImage.height}
                  sizes="90vw"
                  className="h-auto max-h-[68vh] w-auto max-w-full object-contain"
                />
              ) : (
                <div
                  className="flex w-full max-w-md flex-col items-center justify-center gap-3 rounded-frame border border-dashed border-line bg-cream p-8 text-center"
                  style={{ aspectRatio: `${activeImage.width} / ${activeImage.height}` }}
                >
                  <span className="font-mono text-xs font-semibold uppercase tracking-label text-vermilion-deep">
                    Asset to be added
                  </span>
                  <span className="font-sans text-sm text-stone">{activeImage.alt}</span>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between gap-3 border-t border-line bg-cream p-3 sm:p-4">
              <button
                type="button"
                onClick={previous}
                className="rounded-button px-3 py-2 font-mono text-xs uppercase tracking-label text-ink transition-colors hover:bg-sand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
                aria-label="Previous image (Left arrow)"
              >
                &larr; Previous
              </button>
              <span className="hidden font-mono text-[11px] text-stone sm:block">
                Use arrow keys or Escape
              </span>
              <button
                type="button"
                onClick={next}
                className="rounded-button px-3 py-2 font-mono text-xs uppercase tracking-label text-ink transition-colors hover:bg-sand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
                aria-label="Next image (Right arrow)"
              >
                Next &rarr;
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
