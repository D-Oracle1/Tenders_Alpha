'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { MapPin, Calendar, ArrowRight } from 'lucide-react';
import { PROJECT_CATEGORY_LABELS, PROJECT_STATUS_LABELS, formatDate } from '@/lib/utils';
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

export default function ProjectCard({
  id,
  projectName,
  slug,
  client,
  location,
  description,
  featuredImage,
  category,
  status,
  completionDate,
  index = 0,
}: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link href={`/projects/${slug}`} className="card group block h-full">
        {/* Image */}
        <div className="relative h-56 overflow-hidden bg-gray-100">
          {featuredImage ? (
            <Image
              src={featuredImage}
              alt={projectName}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary-700 flex items-center justify-center">
              <span className="text-6xl">🏗️</span>
            </div>
          )}
          <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors duration-300" />
          <div className="absolute top-3 left-3 flex gap-2">
            <span className="badge-primary text-xs">
              {PROJECT_CATEGORY_LABELS[category] || category}
            </span>
          </div>
          <div className="absolute top-3 right-3">
            <span
              className={cn(
                'badge text-xs',
                status === 'COMPLETED' ? 'bg-green-100 text-green-700' :
                status === 'ONGOING' ? 'bg-blue-100 text-blue-700' :
                'bg-gray-100 text-gray-700'
              )}
            >
              {PROJECT_STATUS_LABELS[status] || status}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-lg font-bold text-primary mb-2 group-hover:text-accent transition-colors font-heading line-clamp-2">
            {projectName}
          </h3>

          <div className="flex flex-wrap gap-3 mb-3 text-xs text-gray-500">
            {location && (
              <span className="flex items-center gap-1">
                <MapPin size={12} />
                {location}
              </span>
            )}
            {completionDate && (
              <span className="flex items-center gap-1">
                <Calendar size={12} />
                {formatDate(completionDate)}
              </span>
            )}
          </div>

          {client && (
            <p className="text-xs text-gray-500 mb-2">
              Client: <span className="font-medium text-gray-700">{client}</span>
            </p>
          )}

          <p className="text-gray-600 text-sm leading-relaxed line-clamp-2 mb-4">{description}</p>

          <div className="flex items-center gap-2 text-accent text-sm font-semibold">
            View Project
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
