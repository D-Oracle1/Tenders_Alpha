'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ExternalLink, ArrowRight } from 'lucide-react';
import SectionHeader from '../SectionHeader';

interface SisterCompany {
  id: string;
  name: string;
  slug: string;
  logo?: string | null;
  description: string;
  websiteUrl?: string | null;
}

export default function HomeSisterCompanies({ companies }: { companies: SisterCompany[] }) {
  return (
    <section className="py-20 bg-primary">
      <div className="container-custom">
        <SectionHeader
          badge="Our Network"
          title="Sister Companies"
          subtitle="We are part of a powerful ecosystem of companies, working together to deliver comprehensive solutions."
          light
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {companies.map((company, i) => (
            <motion.div
              key={company.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link
                href={`/sister-companies/${company.slug}`}
                className="block bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 group h-full"
              >
                {/* Logo placeholder */}
                <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center mb-4">
                  <span className="text-white font-bold text-lg font-heading">
                    {company.name.charAt(0)}
                  </span>
                </div>

                <h3 className="text-white font-bold text-lg mb-2 group-hover:text-accent transition-colors font-heading">
                  {company.name}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed line-clamp-3 mb-4">
                  {company.description}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-accent text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                    Learn More <ArrowRight size={14} />
                  </span>
                  {company.websiteUrl && (
                    <a
                      href={company.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-white/40 hover:text-white transition-colors"
                    >
                      <ExternalLink size={14} />
                    </a>
                  )}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/sister-companies"
            className="bg-white text-primary px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
          >
            View All Sister Companies
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
