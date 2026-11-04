'use client';

import { useEffect, useState } from 'react';

export interface IndexItem {
  id: string;
  label: string;
  number?: string;
}

interface StickyIndexProps {
  items: IndexItem[];
  title?: string;
}

export function StickyIndex({ items, title = 'Case Study Sections' }: StickyIndexProps) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id || '');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (let i = items.length - 1; i >= 0; i--) {
        const item = items[i];
        const element = document.getElementById(item.id);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveId(item.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [items]);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -90;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <nav 
      aria-label="Table of contents"
      className="sticky top-28 bg-sand/30 border border-line p-5 rounded-card backdrop-blur-sm"
    >
      <p className="font-mono text-xs uppercase tracking-label text-stone mb-4 font-semibold">
        {title}
      </p>
      <ol className="space-y-2 text-xs font-sans">
        {items.map((item, index) => {
          const isActive = activeId === item.id;
          return (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => scrollTo(item.id)}
                className={`text-left w-full py-1 px-2 rounded flex items-start gap-2 transition-colors ${
                  isActive
                    ? 'font-bold text-ink bg-paper border border-line/80 shadow-xs'
                    : 'text-stone hover:text-ink hover:bg-sand/60'
                }`}
              >
                <span className="font-mono text-[10px] text-stone-muted pt-0.5">
                  {item.number || `0${index + 1}`}
                </span>
                <span className="line-clamp-1">{item.label}</span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

