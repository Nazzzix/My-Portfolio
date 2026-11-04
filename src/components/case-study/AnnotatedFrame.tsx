import React, { ReactNode } from 'react';

export interface AnnotationItem {
  number: number;
  label: string;
  detail: string;
}

interface AnnotatedFrameProps {
  deviceType?: 'mobile' | 'browser' | 'component';
  title?: string;
  caption: string;
  annotations?: AnnotationItem[];
  children: ReactNode;
}

export function AnnotatedFrame({
  deviceType = 'mobile',
  title,
  caption,
  annotations,
  children,
}: AnnotatedFrameProps) {
  return (
    <figure className="my-8 flex flex-col items-center">
      {/* Outer Device Frame */}
      <div className="w-full bg-sand/40 border border-line rounded-frame p-4 sm:p-8 flex flex-col items-center justify-center">
        {deviceType === 'browser' && (
          <div className="w-full max-w-2xl bg-paper border border-line rounded-lg shadow-soft overflow-hidden">
            {/* Browser top chrome */}
            <div className="bg-sand/60 px-4 py-2 border-b border-line flex items-center justify-between">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-line" />
                <span className="w-2.5 h-2.5 rounded-full bg-line" />
                <span className="w-2.5 h-2.5 rounded-full bg-line" />
              </div>
              {title && (
                <span className="font-mono text-xs text-stone truncate max-w-xs">{title}</span>
              )}
              <div className="w-6" />
            </div>
            {/* Screen Content */}
            <div className="p-4 sm:p-6 bg-cream/30">{children}</div>
          </div>
        )}

        {deviceType === 'mobile' && (
          <div className="w-full max-w-[320px] bg-paper border border-line rounded-[28px] shadow-soft overflow-hidden p-3 sm:p-4">
            {/* Mobile Top Speaker/Cam notch */}
            <div className="w-20 h-3 bg-sand rounded-full mx-auto mb-3" />
            {/* Screen Content */}
            <div className="bg-cream/30 rounded-[18px] p-3 border border-line/60">
              {children}
            </div>
          </div>
        )}

        {deviceType === 'component' && (
          <div className="w-full bg-paper border border-line rounded-lg shadow-soft p-6">
            {children}
          </div>
        )}
      </div>

      {/* Frame Caption */}
      <figcaption className="mt-4 font-mono text-xs text-stone text-left max-w-2xl px-2">
        <span className="text-ink font-semibold">Visual Evidence: </span>
        {caption}
      </figcaption>

      {/* Annotations List (if any) */}
      {annotations && annotations.length > 0 && (
        <div className="w-full max-w-2xl mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
          {annotations.map((ann) => (
            <div 
              key={ann.number} 
              className="p-3 bg-paper border border-line rounded-md flex items-start gap-3"
            >
              <span className="w-5 h-5 rounded-full bg-vermilion text-paper font-mono text-xs flex items-center justify-center shrink-0 mt-0.5">
                {ann.number}
              </span>
              <div>
                <p className="font-sans text-xs font-semibold text-ink">{ann.label}</p>
                <p className="font-sans text-xs text-stone mt-0.5">{ann.detail}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </figure>
  );
}

