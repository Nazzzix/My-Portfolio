import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProjectBySlug } from '@/content/projects';
import { MinorProjectShowcase } from '@/components/ui/MinorProjectShowcase';

export const metadata: Metadata = {
  title: 'UdoFlow — UI Screens',
  description: 'A UI-focused look at the UdoFlow desktop and mobile screens.',
};

export default function UdoFlowPage() {
  const project = getProjectBySlug('udoflow');

  if (!project || !project.published) {
    notFound();
  }

  return <MinorProjectShowcase project={project} />;
}
