'use client';

import { useState } from 'react';
import ProjectCard from './ProjectCard';
import { PROJECT_CATEGORY_LABELS } from '@/lib/utils';

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

const categories = ['ALL', ...Object.keys(PROJECT_CATEGORY_LABELS)];

export default function ProjectsGrid({ projects }: { projects: Project[] }) {
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [activeStatus, setActiveStatus] = useState('ALL');

  const filtered = projects.filter((p) => {
    const categoryMatch = activeCategory === 'ALL' || p.category === activeCategory;
    const statusMatch = activeStatus === 'ALL' || p.status === activeStatus;
    return categoryMatch && statusMatch;
  });

  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-10">
          <div className="flex flex-wrap gap-2">
            {['ALL', 'ONGOING', 'COMPLETED'].map((s) => (
              <button
                key={s}
                onClick={() => setActiveStatus(s)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeStatus === s
                    ? 'bg-accent text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {s === 'ALL' ? 'All Status' : s.charAt(0) + s.slice(1).toLowerCase()}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActiveCategory(c)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === c
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {c === 'ALL' ? 'All Categories' : PROJECT_CATEGORY_LABELS[c] || c}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🏗️</div>
            <h3 className="text-xl font-bold text-gray-700">No projects found</h3>
            <p className="text-gray-500 mt-2">Try adjusting your filters</p>
          </div>
        ) : (
          <>
            <p className="text-gray-500 text-sm mb-6">{filtered.length} project{filtered.length !== 1 ? 's' : ''} found</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((project, i) => (
                <ProjectCard
                  key={project.id}
                  {...project}
                  featuredImage={project.featuredImage || project.images[0]?.url}
                  index={i}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
