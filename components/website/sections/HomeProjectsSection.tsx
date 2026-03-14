import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import SectionHeader from '../SectionHeader';
import ProjectCard from '../ProjectCard';

interface Project {
  id: string;
  projectName: string;
  slug: string;
  client?: string | null;
  location?: string | null;
  description: string;
  featuredImage?: string | null;
  category: string;
  status: string;
  completionDate?: Date | null;
  images: { url: string }[];
}

export default function HomeProjectsSection({ projects }: { projects: Project[] }) {
  return (
    <section className="py-20 bg-white">
      <div className="container-custom">
        <SectionHeader
          badge="Our Work"
          title="Featured Projects"
          subtitle="Explore our portfolio of completed and ongoing projects that showcase our expertise and commitment to excellence."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.id}
              {...project}
              featuredImage={project.featuredImage || project.images[0]?.url}
              index={i}
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/projects" className="btn-primary">
            View All Projects
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
