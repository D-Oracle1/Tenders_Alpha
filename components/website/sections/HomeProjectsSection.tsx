import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
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
    <section className="py-24 bg-gray-50/50">
      <div className="container-custom">
        {/* Header row */}
        <div className="flex items-end justify-between mb-14">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-6 h-px bg-accent" />
              <span className="text-xs font-semibold tracking-widest uppercase text-accent">Our Work</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary font-heading leading-tight">
              Featured Projects
            </h2>
          </div>
          <Link
            href="/projects"
            className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-primary/60 hover:text-primary transition-colors group"
          >
            View all
            <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.id}
              {...project}
              featuredImage={project.featuredImage || project.images[0]?.url}
              index={i}
            />
          ))}
        </div>

        {/* Mobile see all */}
        <div className="mt-10 sm:hidden">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary"
          >
            View all projects <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
