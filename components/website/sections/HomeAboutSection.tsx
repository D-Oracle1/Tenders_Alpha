'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, Award, Users, Building2 } from 'lucide-react';
import SectionHeader from '../SectionHeader';

const defaultHighlights = [
  'Founded in 2009, Incorporated 2012',
  '7 core service areas',
  'Offices in Lagos, Port Harcourt & UK',
  'Serving government and private sectors',
  'International presence: UK, USA & Australia',
  'Diversified group: construction to education',
];

interface Props {
  settings?: Record<string, string>;
}

export default function HomeAboutSection({ settings = {} }: Props) {
  const title = settings.home_about_title || "Building Nigeria's Future Since 2009";
  const subtitle = settings.home_about_subtitle || 'We are a multi-faceted indigenous company with deep expertise in construction, engineering, procurement, beauty/cosmetics, and vocational skills.';
  const description = settings.home_about_description || "Founded in 2009 and incorporated in 2012, Tenders Alpha has grown into a respected force in Nigeria's infrastructure landscape and beyond — delivering world-class construction, engineering, and procurement solutions across government and private sectors, with an expanding international footprint in the UK, USA, and Australia.";
  const profileUrl = settings.company_profile_url || '';

  const highlights = settings.home_about_highlights
    ? settings.home_about_highlights.split('\n').map((l) => l.trim()).filter(Boolean)
    : defaultHighlights;

  const stats = [
    { icon: Building2, value: settings.stat_1_value || '15+', label: settings.stat_1_label || 'Years of Excellence' },
    { icon: Users,     value: settings.stat_2_value || '200+', label: settings.stat_2_label || 'Projects Delivered' },
    { icon: Award,     value: settings.stat_3_value || '7',    label: settings.stat_3_label || 'Service Categories' },
    { icon: null,      value: settings.stat_4_value || '100%', label: settings.stat_4_label || 'Client Satisfaction' },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Visual Side */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                {stats.slice(0, 2).map((stat, i) => (
                  <div key={i} className="bg-accent rounded-2xl p-8 text-white">
                    {stat.icon && <stat.icon size={36} className="mb-4 text-white/60" />}
                    <div className="text-4xl font-bold font-heading">{stat.value}</div>
                    <div className="text-white/70 mt-1 text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
              <div className="space-y-4 mt-8">
                {stats.slice(2, 4).map((stat, i) => (
                  <div key={i} className="bg-accent rounded-2xl p-8 text-white">
                    {stat.icon && <stat.icon size={36} className="mb-4 text-white/60" />}
                    <div className="text-4xl font-bold font-heading">{stat.value}</div>
                    <div className="text-white/70 mt-1 text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-accent/10 rounded-full -z-10" />
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary/10 rounded-full -z-10" />
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <SectionHeader
              badge="About Tenders Alpha"
              title={title}
              subtitle={subtitle}
              centered={false}
            />

            <p className="text-gray-600 mb-6 leading-relaxed">{description}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {highlights.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-2 text-gray-700"
                >
                  <CheckCircle size={18} className="text-accent flex-shrink-0" />
                  <span className="text-sm">{item}</span>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <Link href="/about" className="btn-primary">
                Learn More About Us
                <ArrowRight size={18} />
              </Link>
              {profileUrl ? (
                <a
                  href={profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="btn-outline"
                >
                  Download Company Profile
                </a>
              ) : (
                <span className="btn-outline opacity-50 cursor-not-allowed" title="Company profile not yet configured">
                  Download Company Profile
                </span>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
