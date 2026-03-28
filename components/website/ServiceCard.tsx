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

export default function ServiceCard({ title, slug, description, featuredImage, category, index = 0 }: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        href={`/services/${slug}`}
        className="group block border border-gray-100 hover:border-primary/20 rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5"
      >
        {/* Image */}
        <div className="relative h-52 overflow-hidden bg-gray-50">
          {featuredImage ? (
            <Image
              src={featuredImage}
              alt={title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
          ) : (
            <div className="absolute inset-0 bg-primary/5 flex items-center justify-center">
              <span className="text-5xl opacity-40">{serviceIcons[category] || '📋'}</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-[11px] font-semibold tracking-widest uppercase text-accent mb-2">
            {SERVICE_CATEGORY_LABELS[category] || category}
          </p>
          <h3 className="text-base font-bold text-primary mb-2 font-heading group-hover:text-accent transition-colors duration-300">
            {title}
          </h3>
          <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-5">{description}</p>
          <div className="flex items-center gap-1.5 text-primary text-xs font-semibold">
            <span className="group-hover:underline underline-offset-4">Learn more</span>
            <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
