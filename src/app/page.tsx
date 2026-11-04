import Link from 'next/link';
import { getPublishedProjects } from '@/content/projects';
import { SERVICES } from '@/content/services';
import { Button } from '@/components/ui/Button';
import { ProjectCard } from '@/components/ui/ProjectCard';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Tag } from '@/components/ui/Tag';

const CORE_PROCESS_STEPS = [
  {
    step: '01',
    title: 'Understand & Frame',
    description:
      'Begin with real constraints. Dissect workflows, regulatory requirements, and baseline products riders or clinicians already use to define the real problem.',
  },
  {
    step: '02',
    title: 'Explore & Structure',
    description:
      'Map role relationships (riders, drivers, clinicians, organisers) and test structural architectures before committing to high-fidelity surface styling.',
  },
  {
    step: '03',
    title: 'Design & Systematise',
    description:
      'Craft high-fidelity components, consistent tokens, and WCAG-compliant colour pairings that scale effortlessly across complex, data-heavy products.',
  },
  {
    step: '04',
    title: 'Validate & Refine',
    description:
      'Incorporate stakeholder critique and local edge cases—such as driver accessibility certifications or clinic billing codes—to refine flows.',
  },
  {
    step: '05',
    title: 'Deliver & Collaborate',
    description:
      'Bridge the gap to engineering with clear component specifications, state documentation, and actionable tickets that leave zero guesswork.',
  },
];

export default function HomePage() {
  const publishedProjects = getPublishedProjects();
  const primaryProject = publishedProjects.find((p) => p.slug === 'ryde-assist');
  const otherFeaturedProjects = publishedProjects.filter(
    (p) => p.slug !== 'ryde-assist' && p.featured
  );

  return (
    <div className="space-y-24 sm:space-y-32">
      {/* Hero Section */}
      <section className="pt-16 sm:pt-24 lg:pt-32 pb-12 max-w-container mx-auto px-5 sm:px-10 lg:px-20">
        <div className="max-w-4xl space-y-6">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <Tag variant="vermilion">Product Designer (UI/UX)</Tag>
            <span className="font-mono text-xs uppercase tracking-label text-stone">
              4 Years Experience
            </span>
            <span aria-hidden="true" className="hidden text-stone sm:inline">
              ·
            </span>
            <span className="font-mono text-xs uppercase tracking-label text-stone">
              Healthtech · Fintech · Mobility · Blockchain
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-[72px] leading-[1.08] text-ink font-normal tracking-tight">
            Designing digital products that make{' '}
            <em className="font-serif italic font-normal text-ink">complex</em>{' '}
            things feel simple.
          </h1>

          <p className="font-sans text-lg sm:text-xl text-stone max-w-3xl leading-relaxed">
            I&apos;m a Product Designer with 4+ years of experience transforming complex problems into intuitive, meaningful digital experiences. I combine user research, strategic thinking, and thoughtful design to build products that are functional, accessible, and human-centred.
          </p>

          <div className="pt-4 flex flex-wrap items-center gap-4">
            <Button href="#selected-work" variant="primary">
              View selected work
            </Button>
            <Button href="/contact" variant="secondary">
              Contact me
            </Button>
          </div>
        </div>
      </section>

      {/* Selected Work Section */}
      <section id="selected-work" className="max-w-container mx-auto px-5 sm:px-10 lg:px-20 scroll-mt-24">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 pb-6 border-b border-line">
          <SectionHeader
            label="Curated Portfolio"
            title="Selected Case Studies"
            italicWord="Studies"
            description="Selected work across mobility, healthcare, events and technology."
          />
          <Link href="/work" className="editorial-link font-sans text-sm font-semibold shrink-0">
            View all work &rarr;
          </Link>
        </div>

        {/* 3-Card Balanced Layout: Primary wide card on top, 2-column grid below */}
        <div className="space-y-8">
          {primaryProject && (
            <div>
              <ProjectCard project={primaryProject} priority layout="lead" />
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {otherFeaturedProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities Section (Shared from src/content/services.ts) */}
      <section className="max-w-container mx-auto px-5 sm:px-10 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 space-y-4">
            <SectionHeader
              label="Capabilities"
              title="Design Expertise for High-Stake Products"
              italicWord="Expertise"
              description="From end-to-end web and mobile applications to brand identity and commercial packaging, I bring structure and commercial awareness."
            />
            <div className="pt-4">
              <Button href="/services" variant="secondary">
                Explore all capabilities &rarr;
              </Button>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {SERVICES.map((service) => (
              <div key={service.slug} className="p-6 bg-paper border border-line rounded-card flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-[11px] uppercase tracking-label text-vermilion-deep font-semibold">
                      {service.serviceType}
                    </span>
                  </div>
                  <h4 className="font-sans text-base font-bold text-ink mb-2">
                    {service.title}
                  </h4>
                  <p className="font-sans text-sm text-stone leading-relaxed">
                    {service.shortDescription}
                  </p>
                </div>
                <div className="pt-4 mt-auto">
                  <Link
                    href={service.enquiryHref || `/contact?service=${service.slug}`}
                    className="font-sans text-xs font-semibold text-ink hover:text-vermilion-deep transition-colors inline-flex items-center gap-1"
                  >
                    Learn more <span aria-hidden="true">&rarr;</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Five-Stage Working Process Section */}
      <section className="bg-sand/40 border-y border-line py-20 sm:py-28">
        <div className="max-w-container mx-auto px-5 sm:px-10 lg:px-20">
          <SectionHeader
            label="Methodology"
            title="How I Approach Complex Problems"
            italicWord="Complex"
            description="A disciplined, transparent design process built on collaboration with product managers, engineers, and real business constraints."
          />

          <div className="mt-16 grid grid-cols-1 md:grid-cols-5 gap-6">
            {CORE_PROCESS_STEPS.map((step) => (
              <div
                key={step.step}
                className="bg-paper border border-line p-6 rounded-card flex flex-col justify-between"
              >
                <div>
                  <span className="font-mono text-xs font-bold text-vermilion-deep block mb-3">
                    {step.step}
                  </span>
                  <h3 className="font-sans text-base font-bold text-ink mb-2">
                    {step.title}
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-stone leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pre-Footer Call to Action */}
      <section className="max-w-container mx-auto px-5 sm:px-10 lg:px-20">
        <div className="bg-sand/60 border border-line rounded-card p-8 sm:p-14 lg:p-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <p className="font-mono text-xs uppercase tracking-label text-vermilion-deep font-semibold">
              Get In Touch
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl text-ink font-normal leading-tight">
              Have a project or a role to discuss?
            </h2>
            <p className="font-sans text-base text-stone leading-relaxed">
              Tell me about the product, team or brand you&apos;re building, and let&apos;s see where I can help.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
            <Button href="/contact" variant="primary">
              Send an inquiry
            </Button>
            <Button 
              href="mailto:umeakukachinazor@gmail.com" 
              variant="secondary"
              external
            >
              Email directly
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
