import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProjectBySlug } from '@/content/projects';
import { MinorProjectShowcase } from '@/components/ui/MinorProjectShowcase';

export const metadata: Metadata = {
  title: 'Smartline — UI Screens',
  description: 'A UI-focused look at the Smartline desktop and mobile screens.',
};

export default function SmartlinePage() {
  const project = getProjectBySlug('smartline');

  if (!project || !project.published) {
    notFound();
  }

  return <MinorProjectShowcase project={project} />;
}
