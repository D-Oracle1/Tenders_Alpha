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
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={cn(centered ? 'text-center' : 'text-left', 'mb-14', className)}
    >
      {badge && (
        <div className={cn('flex items-center gap-3 mb-4', centered && 'justify-center')}>
          <span className="w-6 h-px bg-accent" />
          <span
            className={cn(
              'text-xs font-semibold tracking-widest uppercase',
              light ? 'text-white/60' : 'text-accent'
            )}
          >
            {badge}
          </span>
        </div>
      )}
      <h2
        className={cn(
          'text-3xl md:text-4xl lg:text-5xl font-bold leading-tight font-heading',
          light ? 'text-white' : 'text-primary'
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            'mt-5 text-base md:text-lg leading-relaxed max-w-2xl text-gray-500',
            centered && 'mx-auto',
            light && 'text-white/50'
          )}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
