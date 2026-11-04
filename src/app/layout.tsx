import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: {
    default: 'Chinazor Blessing Umeakuka — Product Designer (UI/UX)',
    template: '%s · Chinazor Blessing Umeakuka',
  },
  description:
    'Product Designer working across SaaS, healthtech, fintech, mobility, and blockchain. Designing digital products that make complex things feel simple.',
  keywords: [
    'Chinazor Blessing Umeakuka',
    'Product Designer',
    'UI/UX Designer',
    'Nazor',
    'SaaS Design',
    'Healthtech UX',
    'Accessibility Design',
    'Design Systems',
  ],
  authors: [{ name: 'Chinazor Blessing Umeakuka', url: 'https://nazor.design' }],
  creator: 'Chinazor Blessing Umeakuka',
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://nazor.design',
    title: 'Chinazor Blessing Umeakuka — Product Designer (UI/UX)',
    description:
      'Designing digital products that make complex things feel simple. Product Designer working across SaaS, healthtech, fintech, mobility and blockchain.',
    siteName: 'Chinazor Blessing Umeakuka Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chinazor Blessing Umeakuka — Product Designer (UI/UX)',
    description: 'Designing digital products that make complex things feel simple.',
  },
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Chinazor Blessing Umeakuka',
    alternateName: 'Nazor',
    jobTitle: 'Product Designer',
    email: 'umeakukachinazor@gmail.com',
    sameAs: ['http://www.linkedin.com/in/chinazor-umeakuka-a87a1413a'],
    knowsAbout: [
      'Product Design',
      'UI/UX Design',
      'Design Systems',
      'Accessibility',
      'SaaS Design',
      'Mobile App Design',
    ],
  };

  return (
    <html lang="en-GB">
      <head>
        {/* Google Fonts preconnect & stylesheet */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Mono:ital,wght@0,400;0,500;1,400&family=Instrument+Serif:ital@0;1&family=Space+Grotesk:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-cream text-ink antialiased selection:bg-vermilion selection:text-white">
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>
        <Header />
        <main id="main-content" className="flex-1 focus:outline-none">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

