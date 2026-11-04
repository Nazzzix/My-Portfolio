'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import type { ProjectVideo as ProjectVideoData } from '@/types/portfolio';

interface ProjectVideoProps {
  video: ProjectVideoData;
  className?: string;
}

/**
 * Real project recording with a static poster. Motion is only started when the
 * visitor has not asked for reduced motion; otherwise the poster is the whole
 * experience. Controls remain available so the recording can be paused.
 */
export function ProjectVideo({ video, className = '' }: ProjectVideoProps) {
  const [motionAllowed, setMotionAllowed] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setMotionAllowed(!query.matches);

    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    const element = videoRef.current;
    if (!motionAllowed || !element) return;

    const play = () => {
      element.play().catch(() => {
        // Autoplay may be blocked by the browser; the controls remain available.
      });
    };

    play();
    element.addEventListener('canplay', play);
    return () => element.removeEventListener('canplay', play);
  }, [motionAllowed]);

  return (
    <figure className={className}>
      <div className="overflow-hidden rounded-frame border border-line bg-sand/30">
        {motionAllowed ? (
          <video
            ref={videoRef}
            className="h-auto w-full"
            width={video.width}
            height={video.height}
            poster={video.poster}
            autoPlay
            muted
            loop
            playsInline
            controls
            preload="metadata"
            aria-label={video.alt}
          >
            {video.sources.map((source) => (
              <source key={source.src} src={source.src} type={source.type} />
            ))}
          </video>
        ) : (
          <Image
            src={video.poster}
            alt={video.alt}
            width={video.width}
            height={video.height}
            sizes="(min-width: 640px) 45vw, 92vw"
            className="h-auto w-full"
          />
        )}
      </div>
      <figcaption className="mt-3 font-mono text-[11px] leading-relaxed text-stone">
        {video.caption}
      </figcaption>
    </figure>
  );
}
