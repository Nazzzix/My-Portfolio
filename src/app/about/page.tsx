import { Metadata } from 'next';
import { EXPERIENCES, EDUCATION, RECOGNITION } from '@/content/experience';
import { PERSONAL_NOTES } from '@/content/personal';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Button } from '@/components/ui/Button';
import { Tag } from '@/components/ui/Tag';

export const metadata: Metadata = {
  title: 'About Nazor (Chinazor Blessing Umeakuka)',
  description:
    'Product Designer with 4 years experience across SaaS, healthtech, fintech, and mobility. Background, design philosophy, tools, and career history.',
};

const DESIGN_TOOLS = [
  { name: 'Figma', category: 'Interface & Systems' },
  { name: 'FigJam', category: 'User Journeys & Flows' },
  { name: 'Notion', category: 'Design Documentation' },
  { name: 'Adobe Photoshop', category: 'Visual & Brand Assets' },
  { name: 'Antigravity', category: 'AI-Assisted Building' },
  { name: 'Framer', category: 'Web Design & Prototyping' },
  { name: 'Canva', category: 'Social & Marketing Graphics' },
  { name: 'Axe & CCA', category: 'WCAG Accessibility QA' },
];

export default function AboutPage() {
  return (
    <div className="max-w-container mx-auto px-5 sm:px-10 lg:px-20 py-12 sm:py-20 space-y-20 sm:space-y-28">
      {/* Intro Header */}
      <section className="border-b border-line pb-12">
        <div className="max-w-3xl space-y-6">
          <Tag variant="vermilion">About Nazor</Tag>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-[56px] leading-[1.1] text-ink font-normal tracking-tight">
            I turn complex requirements into clear, usable digital products.
          </h1>
          <p className="font-sans text-lg sm:text-xl text-stone leading-relaxed">
            With 4+ years of experience I have transformed complex problems into intuitive, meaningful digital experiences. I combine user research, strategic thinking, and thoughtful design to build products that are functional, accessible, and human-centred.
          </p>
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <Button href="/resume.pdf" variant="primary" external>
              Download Résumé (PDF) &rarr;
            </Button>
            <Button href="/contact" variant="secondary">
              Get in touch
            </Button>
          </div>
        </div>
      </section>

      {/* Background & Approach */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-5 space-y-4">
          <SectionHeader
            label="My Perspective"
            title="Design Is Problem Solving, Not Mere Decoration"
            italicWord="Solving"
          />
        </div>
        <div className="lg:col-span-7 space-y-6 font-sans text-base text-stone leading-relaxed">
          <p>
            My background began in Geography at the University of Nigeria, Nsukka. Geography taught me spatial analysis, structural relationships, and empirical research methods.
          </p>
          <p>
            I apply that same spatial discipline to digital interfaces. A complex software dashboard is an information terrain. If navigation is confusing or hierarchy is flat, users make costly errors.
          </p>
          <p>
            I design from the database and user constraints outward. I prioritize clear mental models, legible typography, and WCAG accessibility standards from day one.
          </p>
        </div>
      </section>

      {/* Experience Timeline */}
      <section className="space-y-12">
        <div className="border-b border-line pb-6">
          <SectionHeader
            label="Career History"
            title="Work Experience"
            italicWord="Experience"
            description="Clearly distinguishing full-time employment, contract roles, and individual freelance projects."
          />
        </div>

        <div className="space-y-8">
          {EXPERIENCES.map((exp, index) => (
            <article
              key={`${exp.company}-${index}`}
              className="p-6 sm:p-8 bg-paper border border-line rounded-card space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-line/60 pb-4">
                <div>
                  <h3 className="font-serif text-2xl text-ink font-normal">{exp.role}</h3>
                  <p className="font-mono text-xs text-vermilion-deep font-medium mt-0.5">
                    {exp.company}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Tag variant="sand">{exp.type}</Tag>
                  <span className="font-mono text-xs text-stone">{exp.period}</span>
                </div>
              </div>

              <p className="font-sans text-sm sm:text-base text-stone leading-relaxed">
                {exp.description}
              </p>

              {exp.highlights && exp.highlights.length > 0 && (
                <ul className="space-y-1.5 pt-2 text-sm text-stone list-disc list-inside">
                  {exp.highlights.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              )}
            </article>
          ))}
        </div>
      </section>

      {/* Education & Awards Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Education */}
        <div className="p-6 sm:p-8 bg-sand/30 border border-line rounded-card space-y-4">
          <h3 className="font-serif text-2xl text-ink font-normal">Education & Certification</h3>
          <div className="space-y-6 pt-2">
            {EDUCATION.map((edu, idx) => (
              <div key={idx} className="border-l-2 border-vermilion pl-4 space-y-1">
                <p className="font-sans text-sm font-bold text-ink">{edu.degree}</p>
                <p className="font-mono text-xs text-stone">{edu.institution} · {edu.year}</p>
                {edu.notes && (
                  <p className="font-sans text-xs text-stone mt-1">{edu.notes}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Recognition */}
        <div className="p-6 sm:p-8 bg-sand/30 border border-line rounded-card space-y-4">
          <h3 className="font-serif text-2xl text-ink font-normal">Honours & Recognition</h3>
          <div className="space-y-4 pt-2">
            {RECOGNITION.map((award, idx) => (
              <div key={idx} className="p-3 bg-paper border border-line rounded flex items-center justify-between">
                <div>
                  <p className="font-sans text-sm font-bold text-ink">{award.title}</p>
                  <p className="font-mono text-xs text-stone">{award.organisation}</p>
                </div>
                <span className="font-mono text-xs text-vermilion-deep font-semibold">{award.year}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools */}
      <section className="space-y-6">
        <div className="border-b border-line pb-4">
          <SectionHeader
            label="Toolkit"
            title="Software & Tools"
            italicWord="Tools"
            description="Software I rely on daily for research, interface design, testing, and team delivery."
          />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {DESIGN_TOOLS.map((tool) => (
            <div key={tool.name} className="p-4 bg-paper border border-line rounded-card text-center">
              <p className="font-sans text-sm font-bold text-ink">{tool.name}</p>
              <p className="font-mono text-[10px] text-stone mt-1">{tool.category}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Personal Notes */}
      <section className="border-t border-line pt-12 sm:pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-4 lg:sticky lg:top-28">
            <SectionHeader
              label="Personal Notes"
              title="Beyond the Work"
              italicWord="Beyond"
              description="A little about the person behind the designer."
            />
          </div>

          <div className="lg:col-span-8 space-y-6">
            {PERSONAL_NOTES.map((paragraph, index) => (
              <p
                key={index}
                className={
                  index === 0
                    ? 'font-serif text-2xl sm:text-3xl text-ink leading-snug font-normal'
                    : 'font-sans text-base sm:text-lg text-stone leading-relaxed'
                }
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Strip */}
      <section className="bg-sand/60 border border-line rounded-card p-8 sm:p-12 text-center space-y-4">
        <h3 className="font-serif text-3xl text-ink font-normal">
          Let&apos;s build thoughtful software together.
        </h3>
        <p className="font-sans text-base text-stone max-w-xl mx-auto">
          Whether you&apos;re hiring, launching a brand, or need focused design support, I&apos;d like to hear about it.
        </p>
        <div className="pt-2">
          <Button href="/contact" variant="primary">
            Start a conversation &rarr;
          </Button>
        </div>
      </section>
    </div>
  );
}

