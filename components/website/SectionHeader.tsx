'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  badge?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
  className?: string;
}

export default function SectionHeader({
  badge,
  title,
  subtitle,
  centered = true,
  light = false,
  className,
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={cn(centered ? 'text-center' : 'text-left', 'mb-12', className)}
    >
      {badge && (
        <span
          className={cn(
            'inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-4',
            light
              ? 'bg-white/20 text-white'
              : 'bg-accent/10 text-accent border border-accent/20'
          )}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
          {badge}
        </span>
      )}
      <h2
        className={cn(
          'text-3xl md:text-4xl font-bold leading-tight font-heading',
          light ? 'text-white' : 'text-primary'
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            'mt-4 text-lg leading-relaxed max-w-2xl',
            centered && 'mx-auto',
            light ? 'text-white/70' : 'text-gray-600'
          )}
        >
          {subtitle}
        </p>
      )}
      <div className={cn('mt-4 w-16 h-1 rounded-full', centered && 'mx-auto', 'bg-accent')} />
    </motion.div>
  );
}
