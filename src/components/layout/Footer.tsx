'use client';

import { useState } from 'react';
import Link from 'next/link';

export function Footer() {
  const [isPaused, setIsPaused] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-ink text-cream mt-24 md:mt-32 overflow-hidden selection:bg-vermilion selection:text-white">
      {/* Top Band */}
      <div className="max-w-container mx-auto px-5 sm:px-10 lg:px-20 pt-12 pb-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          {/* Positioning Pill */}
          <div>
            <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-label text-cream font-medium bg-white/10 px-3.5 py-1.5 rounded-full border border-white/15">
              <span className="w-2 h-2 rounded-full bg-vermilion-ember" aria-hidden="true" />
              Product Designer &amp; Graphic Designer
            </span>
          </div>

          {/* Contact Pathways */}
          <nav aria-label="Footer contact links" className="flex flex-wrap items-center gap-6 sm:gap-8 font-sans text-sm text-sand">
            <a
              href="mailto:umeakukachinazor@gmail.com"
              className="hover:text-vermilion-ember transition-colors underline underline-offset-4 decoration-line/40 hover:decoration-vermilion-ember"
            >
              Email
            </a>
            <a
              href="http://www.linkedin.com/in/chinazor-umeakuka-a87a1413a"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-vermilion-ember transition-colors underline underline-offset-4 decoration-line/40 hover:decoration-vermilion-ember"
            >
              LinkedIn
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-vermilion-ember transition-colors underline underline-offset-4 decoration-line/40 hover:decoration-vermilion-ember"
            >
              Résumé (PDF)
            </a>
            <Link
              href="/contact"
              className="text-cream hover:text-vermilion-ember font-semibold inline-flex items-center gap-1 transition-colors"
            >
              Send an inquiry <span aria-hidden="true">&rarr;</span>
            </Link>
          </nav>
        </div>
      </div>

      {/* Hairline Divider & Second Row */}
      <div className="border-t border-white/15">
        <div className="max-w-container mx-auto px-5 sm:px-10 lg:px-20 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono text-sand/80">
          <div>
            &copy; 2026 Chinazor Blessing Umeakuka
          </div>
          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={scrollToTop}
              className="hover:text-cream transition-colors focus-visible:outline-none"
              aria-label="Scroll back to the top of the page"
            >
              Back to top &uarr;
            </button>
            <button
              type="button"
              onClick={() => setIsPaused(!isPaused)}
              className="hover:text-cream transition-colors focus-visible:outline-none font-mono text-xs flex items-center gap-1.5 px-2 py-1 rounded bg-white/5 border border-white/10"
              aria-label={isPaused ? 'Resume marquee animation' : 'Pause marquee animation'}
            >
              <span aria-hidden="true">{isPaused ? '▶ Play' : '❚❚ Pause'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Marquee Row */}
      <div className="marquee-container w-full overflow-hidden border-t border-white/10 py-6 sm:py-8">
        <div
          aria-hidden="true"
          className={`animate-marquee ${isPaused ? 'is-paused' : ''}`}
          style={{ fontSynthesis: 'none' }}
        >
          {/* Repeated items for seamless infinite scroll */}
          {[1, 2, 3, 4].map((i) => (
            <span
              key={i}
              className="font-serif font-normal text-cream tracking-tight whitespace-nowrap leading-[1.15] px-6 sm:px-10"
              style={{
                fontSize: 'clamp(72px, 14vw, 240px)',
              }}
            >
              Chinazor Blessing Umeakuka<span className="text-[#FF7A55]">.</span>
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}
