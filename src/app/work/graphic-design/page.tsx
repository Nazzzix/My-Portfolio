import { Metadata } from 'next';
import Link from 'next/link';
import { GRAPHIC_DESIGN_PROJECTS } from '@/content/graphic-design';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ImageGallery } from '@/components/ui/ImageGallery';
import { Tag } from '@/components/ui/Tag';

export const metadata: Metadata = {
  title: 'Graphic Design Showcase',
  description:
    'Visual identity, marketing collateral, promotional design, social media graphics, product packaging and event branding by Chinazor Blessing Umeakuka.',
};

export default function GraphicDesignPage() {
  return (
    <div className="mx-auto max-w-container px-5 py-10 sm:px-10 sm:py-16 lg:px-20">
      <nav
        aria-label="Breadcrumb"
        className="mb-8 flex items-center gap-2 font-mono text-xs text-stone"
      >
        <Link href="/work" className="editorial-link">
          Work
        </Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">Graphic Design</span>
      </nav>

      <header className="space-y-6 border-b border-line pb-10">
        <SectionHeader
          label="Visual Practice"
          title="Graphic Design"
          italicWord="Design"
          description="Visual identity, marketing collateral, promotional design, social media graphics, product packaging and event branding."
        />

        <nav aria-label="Graphic design projects" className="flex flex-wrap gap-2 pt-2">
          {GRAPHIC_DESIGN_PROJECTS.map((project) => (
            <a
              key={project.slug}
              href={`#${project.slug}`}
              className="rounded-full border border-line bg-paper px-3 py-1.5 font-mono text-[10px] uppercase tracking-label text-stone transition-colors hover:border-ink hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
            >
              {project.title}
            </a>
          ))}
        </nav>
      </header>

      <div className="divide-y divide-line">
        {GRAPHIC_DESIGN_PROJECTS.map((project) => {
          const galleryImages = [
            project.cover,
            ...project.images.filter((image) => image.src !== project.cover.src),
          ];

          return (
            <section
              key={project.slug}
              id={project.slug}
              className="space-y-8 py-12 scroll-mt-28 sm:py-16"
            >
              <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-3">
                    <Tag variant="sand">{project.category}</Tag>
                    <span className="font-mono text-[11px] uppercase tracking-label text-stone">
                      {[project.client, project.year].filter(Boolean).join(' · ')}
                    </span>
                  </div>

                  <h2 className="font-serif text-3xl font-normal tracking-tight text-ink sm:text-4xl">
                    {project.title}
                  </h2>

                  {project.caption && (
                    <p className="max-w-2xl font-sans text-base leading-relaxed text-stone">
                      {project.caption}
                    </p>
                  )}
                </div>

                <p className="shrink-0 font-mono text-[11px] uppercase tracking-label text-stone">
                  {galleryImages.length} images
                </p>
              </div>

              <ImageGallery images={galleryImages} label={project.title} />
            </section>
          );
        })}
      </div>

      <div className="border-t border-line pt-8">
        <Link href="/work" className="editorial-link font-sans text-sm font-semibold">
          &larr; Back to all work
        </Link>
      </div>
    </div>
  );
}
