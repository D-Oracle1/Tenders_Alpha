'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { MapPin, ArrowUpRight } from 'lucide-react';
import { PROJECT_CATEGORY_LABELS, PROJECT_STATUS_LABELS } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface ProjectCardProps {
  id: string;
  projectName: string;
  slug: string;
  client?: string | null;
  location?: string | null;
  description: string;
  featuredImage?: string | null;
  category: string;
  status: string;
  completionDate?: Date | string | null;
  index?: number;
}

const statusDot: Record<string, string> = {
  COMPLETED: 'bg-emerald-400',
  ONGOING: 'bg-blue-400',
  PLANNED: 'bg-amber-400',
};

export default function ProjectCard({
  projectName,
  slug,
  location,
  description,
  featuredImage,
  category,
  status,
  index = 0,
}: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        href={`/projects/${slug}`}
        className="group block border border-gray-100 hover:border-primary/20 rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5"
      >
        {/* Image */}
        <div className="relative h-56 overflow-hidden bg-gray-50">
          {featuredImage ? (
            <Image
              src={featuredImage}
              alt={projectName}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
          ) : (
            <div className="absolute inset-0 bg-primary/5 flex items-center justify-center">
              <span className="text-5xl opacity-30">🏗️</span>
            </div>
          )}
          {/* Category pill — clean, bottom-left */}
          <div className="absolute bottom-3 left-3">
            <span className="bg-white/90 backdrop-blur-sm text-primary text-[10px] font-semibold tracking-wider uppercase px-3 py-1 rounded-full">
              {PROJECT_CATEGORY_LABELS[category] || category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Status row */}
          <div className="flex items-center gap-2 mb-2">
            <span className={cn('w-1.5 h-1.5 rounded-full', statusDot[status] || 'bg-gray-400')} />
            <span className="text-[11px] font-semibold tracking-widest uppercase text-gray-400">
              {PROJECT_STATUS_LABELS[status] || status}
            </span>
            {location && (
              <>
                <span className="text-gray-200">·</span>
                <span className="flex items-center gap-1 text-[11px] text-gray-400">
                  <MapPin size={10} />
                  {location}
                </span>
              </>
            )}
          </div>

          <h3 className="text-base font-bold text-primary mb-2 font-heading group-hover:text-accent transition-colors duration-300 line-clamp-2">
            {projectName}
          </h3>
          <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-5">{description}</p>
          <div className="flex items-center gap-1.5 text-primary text-xs font-semibold">
            <span className="group-hover:underline underline-offset-4">View project</span>
            <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
