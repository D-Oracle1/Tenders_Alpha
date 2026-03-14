'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, Award, Users, Building2 } from 'lucide-react';
import SectionHeader from '../SectionHeader';

const highlights = [
  'Founded in 2009, Incorporated 2012',
  'Multi-faceted indigenous company',
  '7 core service areas',
  'Offices in Lagos and Port Harcourt',
  'Network of 5 sister companies',
  'Serving government and private sectors',
];

export default function HomeAboutSection() {
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
                <div className="bg-primary rounded-2xl p-8 text-white">
                  <Building2 size={40} className="mb-4 text-accent" />
                  <div className="text-4xl font-bold font-heading">15+</div>
                  <div className="text-white/70 mt-1">Years of Excellence</div>
                </div>
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                  <Users size={40} className="mb-4 text-primary" />
                  <div className="text-4xl font-bold text-primary font-heading">200+</div>
                  <div className="text-gray-600 mt-1">Projects Delivered</div>
                </div>
              </div>
              <div className="space-y-4 mt-8">
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                  <Award size={40} className="mb-4 text-accent" />
                  <div className="text-4xl font-bold text-primary font-heading">7</div>
                  <div className="text-gray-600 mt-1">Service Categories</div>
                </div>
                <div className="bg-accent rounded-2xl p-8 text-white">
                  <div className="text-4xl font-bold font-heading">5</div>
                  <div className="text-white/80 mt-1">Sister Companies</div>
                  <div className="mt-3 text-sm text-white/60">Strategic partnerships across Africa</div>
                </div>
              </div>
            </div>
            {/* Decorative elements */}
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
              badge="About Tenders General Merchant"
              title="Building Nigeria's Future Since 2009"
              subtitle="We are a multi-faceted indigenous company with deep expertise in construction, engineering, procurement, and agricultural activities."
              centered={false}
            />

            <p className="text-gray-600 mb-6 leading-relaxed">
              Tenders General Merchant Ltd. was founded with a clear vision: to provide world-class
              construction, engineering, and procurement services that drive national development.
              From our humble beginnings in 2009 to our formal incorporation in 2012, we have grown
              into a respected force in Nigeria's infrastructure landscape.
            </p>

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
              <a
                href="/documents/company-profile.pdf"
                download
                className="btn-outline"
              >
                Download Company Profile
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
