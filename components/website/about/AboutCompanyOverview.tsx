'use client';

import { motion } from 'framer-motion';
import { Calendar, MapPin, Building, Globe } from 'lucide-react';

const timeline = [
  { year: '2009', event: 'Tenders General Merchant founded', icon: '🌱' },
  { year: '2012', event: 'Formally incorporated as a limited liability company', icon: '📋' },
  { year: '2015', event: 'Expanded operations to Rivers State with Port Harcourt branch', icon: '🏢' },
  { year: '2018', event: 'Diversified into Oil & Gas procurement and Equipment Supply', icon: '⚙️' },
  { year: '2020', event: 'Launched Disinfection Technology and Agricultural divisions', icon: '🌿' },
  { year: '2024', event: 'Strengthened sister company network for larger contracts', icon: '🤝' },
];

export default function AboutCompanyOverview() {
  return (
    <section className="py-20 bg-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-6 bg-accent/10 text-accent border border-accent/20">
              <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
              Company Overview
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6 font-heading">
              A Legacy of Building Nigeria
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Tenders General Merchant Ltd. is a multi-faceted indigenous Nigerian company founded
              with the mission of providing world-class construction, engineering, and procurement
              services to both government and private sector clients.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              Our diverse portfolio spans seven core service areas, allowing us to serve as a
              one-stop partner for complex projects that require multiple disciplines. We bring
              together expertise, equipment, and strategic partnerships to deliver results that
              stand the test of time.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Calendar, label: 'Founded', value: '2009' },
                { icon: Building, label: 'Incorporated', value: '2012' },
                { icon: MapPin, label: 'Head Office', value: 'Lagos, Nigeria' },
                { icon: Globe, label: 'Branch', value: 'Port Harcourt, Rivers' },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="bg-gray-50 rounded-xl p-4 flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon size={20} className="text-primary" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">{label}</div>
                    <div className="font-semibold text-primary text-sm">{value}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Timeline */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h3 className="text-xl font-bold text-primary mb-8 font-heading">Our Journey</h3>
            <div className="relative">
              <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gray-200" />
              <div className="space-y-6">
                {timeline.map((item, i) => (
                  <motion.div
                    key={item.year}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-4 relative"
                  >
                    <div className="w-10 h-10 rounded-full bg-primary border-4 border-white shadow-md flex items-center justify-center flex-shrink-0 z-10 text-base">
                      {item.icon}
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4 flex-1">
                      <span className="text-accent font-bold text-sm">{item.year}</span>
                      <p className="text-gray-700 text-sm mt-0.5">{item.event}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
