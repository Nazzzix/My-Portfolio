import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { PROJECTS } from '@/content/projects';
import { CaseStudyHeader } from '@/components/case-study/CaseStudyHeader';
import { ProjectVideo } from '@/components/ui/ProjectVideo';
import { Tag } from '@/components/ui/Tag';
import { TodoPlaceholder } from '@/components/ui/TodoPlaceholder';

export const metadata: Metadata = {
  title: 'Revela — Event Platform & Ticketing Case Study',
  description:
    'A focused product design case study on building an all-in-one event operations and post-event engagement platform for African creators.',
};

export default function RevelaPage() {
  const project = PROJECTS.find((p) => p.slug === 'revela')!;
  const workspaceVideo = project.videos?.find((video) => video.id === 'workspace');
  const brandingVideo = project.videos?.find((video) => video.id === 'branding');

  return (
    <div className="max-w-container mx-auto px-5 sm:px-10 lg:px-20 py-10 space-y-16">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="font-mono text-xs text-stone flex items-center gap-2">
        <Link href="/work" className="editorial-link">Work</Link>
        <span aria-hidden="true">/</span>
        <span className="text-ink font-medium">Revela</span>
      </nav>

      {/* Case Study Header */}
      <CaseStudyHeader project={project}>
        <div className="w-full max-w-3xl py-6 text-center space-y-4">
          <Tag variant="paper">African Event Operations · Studio Project</Tag>
          <h2 className="font-serif italic text-2xl sm:text-3xl text-ink">
            &ldquo;Unifying ticketing, localized payment channels, and post-event attendee retention.&rdquo;
          </h2>
          <p className="font-mono text-xs text-stone max-w-xl mx-auto">
            Designed within Cosmos Design Space to solve specific operational friction faced by creators and event organisers across Africa.
          </p>
        </div>
      </CaseStudyHeader>

      {project.heroImage && (
        <figure className="mx-auto w-full max-w-4xl">
          <div className="overflow-hidden rounded-frame border border-line bg-sand/30">
            <Image
              src={project.heroImage.src}
              alt={project.heroImage.alt}
              width={project.heroImage.width}
              height={project.heroImage.height}
              priority
              sizes="(min-width: 1024px) 56rem, 92vw"
              className="h-auto w-full"
            />
          </div>
          <figcaption className="mt-3 font-mono text-[11px] leading-relaxed text-stone">
            Each event becomes one workspace with six tabs: Overview, Guests, Tickets, Messages,
            Post Event and More Options.
          </figcaption>
        </figure>
      )}

      {/* Main Body */}
      <div className="max-w-4xl mx-auto space-y-20">

        {/* Role & Transparency Notice */}
        <section className="space-y-6">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs uppercase tracking-label text-vermilion-deep font-bold">01 / Scope & Role Attribution</span>
            <div className="h-px flex-1 bg-line" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-ink font-normal">
            Supporting Product Designer Role
          </h2>
          <div className="font-sans text-base text-stone leading-relaxed space-y-4">
            <p>
              I contributed as a <strong>Supporting Product Designer</strong> at Cosmos Design Space. In this capacity, I designed the majority of core user interface flows—including event creation, ticket tier configuration, and attendee checkout—within a wider brand and visual direction established by the design studio.
            </p>
            <div className="p-4 bg-sand/40 border border-line rounded text-xs font-mono text-stone space-y-1">
              <p><strong className="text-ink">Accurate Role Representation:</strong> Although historical CV versions listed this project as &ldquo;Lead UI/UX Designer&rdquo;, the authentic role was supporting design execution under the studio&apos;s creative leadership. I did not make final product scope decisions.</p>
            </div>
          </div>
        </section>

        {/* Competitor Review & Insights */}
        <section className="space-y-6">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs uppercase tracking-label text-vermilion-deep font-bold">02 / Market Analysis</span>
            <div className="h-px flex-1 bg-line" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-ink font-normal">
            Benchmarking & Three Core Insights
          </h2>
          <div className="font-sans text-base text-stone leading-relaxed space-y-4">
            <p>
              We analyzed four existing platforms: <strong>Eventbrite, Zoho Backstage, Luma, and Tix Africa</strong>. This competitive teardown revealed three major opportunities:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
              <div className="p-4 bg-paper border border-line rounded">
                <span className="font-mono text-xs text-vermilion-deep font-bold block mb-1">Insight 1</span>
                <h4 className="font-sans text-sm font-bold text-ink mb-1">Discovery vs Retention Split</h4>
                <p className="text-xs text-stone">Organisers used one tool for ticket sales and completely separate tools for emails and community building.</p>
              </div>
              <div className="p-4 bg-paper border border-line rounded">
                <span className="font-mono text-xs text-vermilion-deep font-bold block mb-1">Insight 2</span>
                <h4 className="font-sans text-sm font-bold text-ink mb-1">Post-Event Is Unserved</h4>
                <p className="text-xs text-stone">After an event concludes, attendee data sits dormant; certificate issuance and satisfaction surveys were purely manual.</p>
              </div>
              <div className="p-4 bg-paper border border-line rounded">
                <span className="font-mono text-xs text-vermilion-deep font-bold block mb-1">Insight 3</span>
                <h4 className="font-sans text-sm font-bold text-ink mb-1">Local African Behaviour</h4>
                <p className="text-xs text-stone">WhatsApp confirmations and domestic bank transfer / USSD rails are indispensable for high ticket checkout completion.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Documented Decisions */}
        <section className="space-y-8">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs uppercase tracking-label text-vermilion-deep font-bold">03 / Key Design Decisions</span>
            <div className="h-px flex-1 bg-line" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-ink font-normal">
            Key Architectural Decisions
          </h2>

          <div className="space-y-4">
            <div className="p-6 bg-paper border border-line rounded-card">
              <div className="flex justify-between items-center mb-1">
                <span className="font-mono text-xs font-bold text-ink">Decision 1</span>
                <Tag variant="sand">Workspace Model</Tag>
              </div>
              <h3 className="font-serif text-xl text-ink font-normal">Single-Workspace with 6 Dedicated Tabs</h3>
              <p className="font-sans text-sm text-stone mt-1">
                Structured every event into one centralized control center with six clear tabs: <strong>Details, Tickets, Schedule, Promotion, Post-Event, and Settings</strong>.
              </p>
            </div>

            <div className="p-6 bg-paper border border-line rounded-card">
              <div className="flex justify-between items-center mb-1">
                <span className="font-mono text-xs font-bold text-ink">Decision 2</span>
                <Tag variant="sand">Friction Reduction</Tag>
              </div>
              <h3 className="font-serif text-xl text-ink font-normal">One-Page Event Creation</h3>
              <p className="font-sans text-sm text-stone mt-1">
                Replaced multi-step wizards with a clean, progressive disclosure single-page form with advanced features placed cleanly behind optional toggles.
              </p>
            </div>

            <div className="p-6 bg-paper border border-line rounded-card">
              <div className="flex justify-between items-center mb-1">
                <span className="font-mono text-xs font-bold text-ink">Decision 3</span>
                <Tag variant="sand">Local Payments</Tag>
              </div>
              <h3 className="font-serif text-xl text-ink font-normal">Transparent Fee Transfer Toggle</h3>
              <p className="font-sans text-sm text-stone mt-1">
                Added a single &ldquo;Pass processing fee to guest&rdquo; toggle during ticket tier creation, providing clear real-time breakdown of organiser earnings.
              </p>
            </div>

            <div className="p-6 bg-paper border border-line rounded-card">
              <div className="flex justify-between items-center mb-1">
                <span className="font-mono text-xs font-bold text-ink">Decision 4</span>
                <Tag variant="sand">Post-Event Hub</Tag>
              </div>
              <h3 className="font-serif text-xl text-ink font-normal">In-App Post-Event Tools</h3>
              <p className="font-sans text-sm text-stone mt-1">
                Built automated post-event survey distributions and a certificate generator directly into the event completion dashboard.
              </p>
            </div>
          </div>

          {/* Real supplied recordings */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            {workspaceVideo && <ProjectVideo video={workspaceVideo} />}
            {brandingVideo && <ProjectVideo video={brandingVideo} />}
          </div>

          {/* Unverified Documentation Items */}
          <div className="pt-4">
            <TodoPlaceholder
              label="MVP launch date and post-handoff telemetry"
              description="Originally planned as a 7-week MVP from June 2025. Handoff metrics and production release dates await final studio verification."
            />
          </div>
        </section>

        {/* Pagination */}
        <div className="pt-12 border-t border-line flex justify-between items-center">
          <Link href="/work/pilotspan" className="editorial-link font-sans text-sm font-medium">
            &larr; Previous: Pilotspan
          </Link>
          <Link href="/work" className="editorial-link font-sans text-sm font-bold">
            Back to All Projects &rarr;
          </Link>
        </div>

      </div>
    </div>
  );
}

