'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import SectionHeader from '../SectionHeader';

interface SisterCompany {
  id: string;
  name: string;
  slug: string;
  description: string;
}

export default function AboutSisterCompanies({ companies }: { companies: SisterCompany[] }) {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container-custom">
        <SectionHeader
          badge="Our Ecosystem"
          title="Sister Companies"
          subtitle="Together with our strategic partners, we deliver comprehensive solutions for large-scale projects."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {companies.map((company, i) => (
            <motion.div
              key={company.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                href={`/sister-companies/${company.slug}`}
                className="card group block p-6 h-full"
              >
                <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mb-4">
                  <span className="text-white font-bold text-xl font-heading">{company.name.charAt(0)}</span>
                </div>
                <h3 className="text-lg font-bold text-primary mb-2 group-hover:text-accent transition-colors font-heading">
                  {company.name}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4">{company.description}</p>
                <span className="text-accent text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                  Learn More <ArrowRight size={14} />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
