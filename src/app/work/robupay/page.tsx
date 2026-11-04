import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProjectBySlug } from '@/content/projects';
import { MinorProjectShowcase } from '@/components/ui/MinorProjectShowcase';

export const metadata: Metadata = {
  title: 'RobuPay — UI Screens',
  description:
    'A UI-focused look at onboarding, wallet connection and transaction screens for RobuPay by Roburna Blockchain.',
};

export default function RobuPayPage() {
  const project = getProjectBySlug('robupay');

  if (!project || !project.published) {
    notFound();
  }

  return <MinorProjectShowcase project={project} />;
}
