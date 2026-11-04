'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Wordmark } from '@/components/ui/Wordmark';
import { Button } from '@/components/ui/Button';
import { MAIN_NAV_LINKS } from '@/content/navigation';

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-cream/90 backdrop-blur-md border-b border-line/70 transition-colors">
      <div className="max-w-container mx-auto px-5 sm:px-10 lg:px-20 h-20 flex items-center justify-between">
        {/* Left: Wordmark */}
        <Wordmark />

        {/* Center / Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
          {MAIN_NAV_LINKS.map((link) => {
            const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`font-sans text-sm font-medium transition-colors duration-150 py-1 relative ${
                  isActive ? 'text-ink font-semibold' : 'text-stone hover:text-ink'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                {link.label}
                {isActive && (
                  <span 
                    className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-ink"
                    aria-hidden="true" 
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right: CTA button */}
        <div className="hidden md:flex items-center gap-4">
          <Button 
            href="/contact" 
            variant="primary" 
            className={`!h-10 !px-5 text-sm ${pathname === '/contact' ? 'ring-2 ring-ink ring-offset-2 ring-offset-cream' : ''}`}
            ariaLabel="Contact me"
          >
            Contact me
          </Button>
        </div>

        {/* Mobile menu trigger */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-ink hover:text-vermilion-deep focus-visible:outline-none"
          aria-expanded={mobileMenuOpen}
          aria-label={mobileMenuOpen ? 'Close main navigation' : 'Open main navigation'}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-line bg-cream px-5 py-6 space-y-4">
          <nav className="flex flex-col space-y-3" aria-label="Mobile navigation">
            {MAIN_NAV_LINKS.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`font-sans text-base py-1.5 ${
                    isActive ? 'text-ink font-bold border-l-2 border-vermilion pl-2' : 'text-stone pl-2'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
          <div className="pt-2">
            <Button
              href="/contact"
              variant="primary"
              className="w-full text-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact me
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
