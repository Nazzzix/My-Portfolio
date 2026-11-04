import { Metadata } from 'next';
import Link from 'next/link';
import { getPublishedProjects } from '@/content/projects';
import { GRAPHIC_DESIGN_PROJECTS } from '@/content/graphic-design';
import { ProjectCard } from '@/components/ui/ProjectCard';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { GraphicDesignGallery } from '@/components/ui/GraphicDesignGallery';

export const metadata: Metadata = {
  title: 'Selected Work & Case Studies',
  description:
    'Product design case studies across mobility, healthtech SaaS and event technology, alongside minor product UI work and a dedicated graphic design showcase.',
};

export default function WorkPage() {
  const publishedProjects = getPublishedProjects();
  const mainProjects = publishedProjects.filter((project) => project.tier === 'main');
  const minorProjects = publishedProjects.filter((project) => project.tier === 'minor');
  const primaryProject = mainProjects.find((project) => project.slug === 'ryde-assist');
  const otherMainProjects = mainProjects.filter((project) => project.slug !== 'ryde-assist');

  return (
    <div className="mx-auto max-w-container space-y-16 px-5 pt-12 sm:space-y-24 sm:px-10 sm:pt-20 lg:px-20">
      {/* Page Header */}
      <div className="space-y-4 border-b border-line pb-10">
        <SectionHeader
          label="Portfolio"
          title="Product Work & Case Studies"
          italicWord="Case"
          description="Product thinking, interface design and visual craft across healthcare, mobility, events, technology and brand work."
        />
      </div>

      {/* 01. Main Projects */}
      <section id="main-projects" className="space-y-8 scroll-mt-28">
        <div className="flex flex-col gap-2 border-b border-line pb-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="font-mono text-xs font-bold uppercase tracking-label text-vermilion-deep">
              01
            </span>
            <h2 className="mt-1 font-serif text-3xl font-normal text-ink sm:text-4xl">
              Main Projects
            </h2>
          </div>
          <p className="max-w-md font-sans text-sm text-stone">
            Full case studies across mobility, healthcare and event technology.
          </p>
        </div>

        <div className="space-y-8">
          {primaryProject && <ProjectCard project={primaryProject} priority layout="lead" />}

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {otherMainProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* 02. Minor Projects */}
      {minorProjects.length > 0 && (
        <section id="minor-projects" className="space-y-8 border-t border-line pt-10 scroll-mt-28">
          <div className="flex flex-col gap-2 border-b border-line pb-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="font-mono text-xs font-bold uppercase tracking-label text-vermilion-deep">
                02
              </span>
              <h2 className="mt-1 font-serif text-3xl font-normal text-ink sm:text-4xl">
                Minor Projects
              </h2>
            </div>
            <p className="max-w-md font-sans text-sm text-stone">
              UI-focused screens from additional product work.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {minorProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </section>
      )}

      {/* 03. Graphic Design */}
      <section id="graphic-design" className="space-y-8 border-t border-line pt-10 scroll-mt-28">
        <div className="flex flex-col gap-4 border-b border-line pb-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="font-mono text-xs font-bold uppercase tracking-label text-vermilion-deep">
              03
            </span>
            <h2 className="mt-1 font-serif text-3xl font-normal text-ink sm:text-4xl">
              Graphic Design
            </h2>
            <p className="mt-2 max-w-xl font-sans text-sm text-stone">
              Visual identity, campaign graphics, packaging and event branding.
            </p>
          </div>
          <Link
            href="/work/graphic-design"
            className="shrink-0 font-sans text-sm font-semibold text-ink transition-colors hover:text-vermilion-deep"
          >
            Open the graphic design showcase &rarr;
          </Link>
        </div>

        <GraphicDesignGallery projects={GRAPHIC_DESIGN_PROJECTS} />
      </section>
    </div>
  );
}
