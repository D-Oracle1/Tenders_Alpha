export const revalidate = 0;

import { Metadata } from 'next';
import prisma from '@/lib/prisma';
import PageHero from '@/components/website/PageHero';
import ProjectsGrid from '@/components/website/ProjectsGrid';

export const metadata: Metadata = {
  title: 'Projects Portfolio',
  description:
    'Explore the project portfolio of Tenders Alpha — construction, engineering, and procurement projects across Nigeria.',
};

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({
    where: { isActive: true },
    include: { images: { take: 1, orderBy: { order: 'asc' } } },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <>
      <PageHero
        title="Projects Portfolio"
        subtitle="A showcase of our completed and ongoing construction, engineering, and procurement projects."
        breadcrumbs={[{ label: 'Projects' }]}
      />
      <ProjectsGrid projects={projects} />
    </>
  );
}
