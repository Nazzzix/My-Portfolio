import Link from 'next/link';
import Image from 'next/image';
import { GraphicDesignProject } from '@/content/graphic-design';
import { Tag } from './Tag';

interface GraphicDesignGalleryProps {
  projects: GraphicDesignProject[];
  priorityFirst?: boolean;
}

export function GraphicDesignGallery({
  projects,
  priorityFirst = false,
}: GraphicDesignGalleryProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8">
      {projects.map((project, index) => (
        <article
          key={project.slug}
          className="group flex flex-col overflow-hidden rounded-card border border-line bg-paper transition-colors hover:border-ink/30"
        >
          <Link
            href={`/work/graphic-design#${project.slug}`}
            className="flex h-full flex-col focus-visible:outline-none"
            aria-label={`View graphic design project: ${project.title}`}
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden border-b border-line bg-sand/40">
              {project.cover.src ? (
                <Image
                  src={project.cover.src}
                  alt={project.cover.alt}
                  fill
                  priority={priorityFirst && index === 0}
                  sizes="(min-width: 640px) 45vw, 92vw"
                  className="object-cover object-top transition-transform duration-300 ease-out group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center gap-2 border border-dashed border-line bg-cream p-6 text-center">
                  <span className="font-mono text-[11px] font-semibold uppercase tracking-label text-vermilion-deep">
                    Asset to be added
                  </span>
                  <span className="font-sans text-xs text-stone">{project.title} cover</span>
                </div>
              )}

              <div className="absolute left-3 top-3">
                <Tag variant="paper">{project.category}</Tag>
              </div>
            </div>

            <div className="flex flex-1 flex-col p-5 sm:p-6">
              <div className="mb-1.5 flex items-center justify-between gap-3 font-mono text-[11px] uppercase tracking-label text-stone">
                <span className="truncate">{project.client}</span>
                {project.year && <span className="shrink-0">{project.year}</span>}
              </div>

              <h3 className="font-serif text-xl font-normal leading-snug text-ink transition-colors group-hover:text-vermilion-deep sm:text-2xl">
                {project.title}
              </h3>

              {project.caption && (
                <p className="mt-2 line-clamp-2 flex-1 font-sans text-sm leading-relaxed text-stone">
                  {project.caption}
                </p>
              )}

              <span className="mt-4 inline-flex items-center gap-1 font-sans text-xs font-semibold text-ink transition-transform group-hover:translate-x-1 motion-reduce:group-hover:translate-x-0">
                View project <span aria-hidden="true">&rarr;</span>
              </span>
            </div>
          </Link>
        </article>
      ))}
    </div>
  );
}
