'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { SERVICE_CATEGORY_LABELS } from '@/lib/utils';

interface ServiceCardProps {
  id: string;
  title: string;
  slug: string;
  description: string;
  featuredImage?: string | null;
  category: string;
  index?: number;
}

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

export default function ServiceCard({ id, title, slug, description, featuredImage, category, index = 0 }: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link href={`/services/${slug}`} className="card group block h-full">
        {/* Image */}
        <div className="relative h-52 overflow-hidden bg-gray-100">
          {featuredImage ? (
            <Image
              src={featuredImage}
              alt={title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary-700 flex items-center justify-center">
              <span className="text-6xl">{serviceIcons[category] || '📋'}</span>
            </div>
          )}
          <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors duration-300" />
          <div className="absolute top-3 left-3">
            <span className="badge-primary text-xs">
              {SERVICE_CATEGORY_LABELS[category] || category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-lg font-bold text-primary mb-2 group-hover:text-accent transition-colors font-heading">
            {title}
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4">{description}</p>
          <div className="flex items-center gap-2 text-accent text-sm font-semibold">
            Learn More
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
