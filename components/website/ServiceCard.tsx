'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { SERVICE_CATEGORY_LABELS } from '@/lib/utils';

const serviceIcons: Record<string, string> = {
  CONSTRUCTION: '🏗️',
  CIVIL_ENGINEERING: '🛣️',
  OIL_GAS: '⚙️',
  EQUIPMENT_SUPPLY: '🔧',
  CARGO_HANDLING: '🚢',
  LOGISTICS: '🚚',
  DISINFECTION: '🧪',
  AGRICULTURE: '🌾',
  OTHER: '📋',
};

interface ServiceCardProps {
  id: string;
  title: string;
  slug: string;
  description: string;
  featuredImage?: string | null;
  category: string;
  index?: number;
}

export default function ServiceCard({
  title,
  slug,
  description,
  featuredImage,
  category,
  index = 0,
}: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <Link
        href={`/services/${slug}`}
        className="group block overflow-hidden rounded-2xl border border-gray-100 transition-all duration-500 hover:-translate-y-1 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5"
      >
        {/* Image Section */}
        <div className="relative h-52 overflow-hidden bg-gray-50">
          {featuredImage ? (
            <Image
              src={featuredImage}
              alt={title}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-primary/5">
              <span className="text-5xl opacity-40">
                {serviceIcons[category] || '📋'}
              </span>
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="p-6">
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-accent">
            {SERVICE_CATEGORY_LABELS[category] || category}
          </p>

          <h3 className="mb-2 font-heading text-base font-bold text-primary transition-colors duration-300 group-hover:text-accent">
            {title}
          </h3>

          <p className="mb-5 line-clamp-2 text-sm leading-relaxed text-gray-500">
            {description}
          </p>

          <div className="flex items-center gap-1.5 text-xs font-semibold text-primary">
            <span className="underline-offset-4 group-hover:underline">
              Learn more
            </span>
            <ArrowUpRight
              size={13}
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}