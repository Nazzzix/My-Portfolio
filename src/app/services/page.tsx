import { Metadata } from 'next';
import Link from 'next/link';
import { SERVICES } from '@/content/services';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Button } from '@/components/ui/Button';
import { Tag } from '@/components/ui/Tag';

export const metadata: Metadata = {
  title: 'Services & Capabilities',
  description:
    'Product design, graphic design, branding, and social media design capabilities by Chinazor Blessing Umeakuka (Nazor).',
};

export default function ServicesPage() {
  return (
    <div className="max-w-container mx-auto px-5 sm:px-10 lg:px-20 py-12 sm:py-20 space-y-16 sm:space-y-24">
      {/* Page Header */}
      <div className="border-b border-line pb-10">
        <SectionHeader
          label="What I Do"
          title="Capabilities & Offerings"
          italicWord="Capabilities"
          description="I partner with startups, agencies, and scale-ups to design intuitive digital products, distinctive brand identities, and high-impact graphic assets."
        />
      </div>

      {/* Services List */}
      <div className="space-y-12">
        {SERVICES.map((service, index) => (
          <article
            key={service.slug}
            className="p-8 sm:p-10 bg-paper border border-line rounded-card space-y-6 shadow-card"
          >
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-line/60 pb-4">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold text-vermilion-deep">
                  0{index + 1}
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl text-ink font-normal">
                  {service.title}
                </h2>
              </div>
              <Tag variant={service.serviceType === 'Core service' ? 'vermilion' : 'sand'}>
                {service.serviceType}
              </Tag>
            </div>

            <p className="font-sans text-base sm:text-lg text-stone leading-relaxed max-w-3xl">
              {service.description}
            </p>

            {/* Deliverables & Best For */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-4">
              <div className="md:col-span-7 space-y-3">
                <h4 className="font-mono text-xs uppercase tracking-label text-stone font-semibold">
                  What I Deliver
                </h4>
                <ul className="space-y-2 text-sm text-stone font-sans list-disc list-inside">
                  {service.deliverables.map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>
              </div>

              <div className="md:col-span-5 p-5 bg-sand/30 border border-line/70 rounded flex flex-col justify-between">
                <div>
                  <h4 className="font-mono text-xs uppercase tracking-label text-ink font-bold mb-2">
                    Ideal Fit For
                  </h4>
                  <p className="font-sans text-xs sm:text-sm text-stone leading-relaxed">
                    {service.audience}
                  </p>
                </div>
                <div className="pt-4">
                  {service.enquiryHref?.startsWith('#') || service.enquiryHref?.startsWith('/work') ? (
                    <Link
                      href={service.enquiryHref}
                      className="font-sans text-xs font-bold text-ink hover:text-vermilion-deep transition-colors inline-flex items-center gap-1.5 py-1"
                    >
                      View graphic design work <span aria-hidden="true">&rarr;</span>
                    </Link>
                  ) : (
                    <Link
                      href={service.enquiryHref || `/contact?service=${service.slug}`}
                      className="font-sans text-xs font-bold text-ink hover:text-vermilion-deep transition-colors inline-flex items-center gap-1.5 py-1"
                    >
                      Inquire about this capability <span aria-hidden="true">&rarr;</span>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Engagement Models */}
      <section className="bg-sand/40 border border-line rounded-card p-8 sm:p-12 space-y-6">
        <SectionHeader
          label="Ways of Working"
          title="Engagement Formats"
          italicWord="Working"
          description="Three ways to work together, depending on the scope and the kind of commitment the work needs."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <div className="p-6 bg-paper border border-line rounded-card">
            <h3 className="font-sans text-base font-bold text-ink mb-1">Full-time</h3>
            <p className="font-sans text-xs sm:text-sm text-stone leading-relaxed">
              Permanent employment as a Product Designer within your team.
            </p>
          </div>
          <div className="p-6 bg-paper border border-line rounded-card">
            <h3 className="font-sans text-base font-bold text-ink mb-1">Contract</h3>
            <p className="font-sans text-xs sm:text-sm text-stone leading-relaxed">
              A fixed-scope engagement for specific deliverables or projects, with the scope and timeline agreed upfront.
            </p>
          </div>
          <div className="p-6 bg-paper border border-line rounded-card">
            <h3 className="font-sans text-base font-bold text-ink mb-1">Freelance</h3>
            <p className="font-sans text-xs sm:text-sm text-stone leading-relaxed">
              Independent, project-based design work for a defined brief, such as a product launch, brand identity, or campaign.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <div className="text-center space-y-4 pt-6">
        <h3 className="font-serif text-3xl text-ink">Ready to talk through your project?</h3>
        <p className="font-sans text-stone text-base max-w-md mx-auto">
          Share your product requirements or timeline and let&apos;s evaluate mutual fit.
        </p>
        <div className="pt-2">
          <Button href="/contact" variant="primary">
            Start a project conversation &rarr;
          </Button>
        </div>
      </div>
    </div>
  );
}
