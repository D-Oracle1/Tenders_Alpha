'use client';

import { motion } from 'framer-motion';
import { Calendar, MapPin, Building, Globe, User } from 'lucide-react';

const defaultOverview = `Tenders Alpha is a dynamic, multi-faceted indigenous Nigerian company committed to delivering world-class construction, engineering, and procurement solutions to both public and private sector clients. Founded on the principles of excellence, innovation, and integrity, we have built a strong reputation for executing projects that meet global standards and stand the test of time.

With a diverse portfolio spanning seven core service areas, Tenders Alpha operates as a one-stop partner for complex, multi-disciplinary projects. Beyond our core operations, we have strategically diversified into several high-growth sectors both within Nigeria and internationally, with a presence in Australia, the United States, and the United Kingdom.

Our group includes Tenders General Merchant Ltd., a sister company headquartered in Lagos, Nigeria, and Soibi Alpha House, focused on personal and professional development — equipping individuals with practical skills in forex trading, skincare, and hair beautification.`;

const defaultTimeline: { year: string; event: string }[] = [
  { year: '2009', event: 'Tenders Alpha founded' },
  { year: '2012', event: 'Formally incorporated as a limited liability company' },
  { year: '2015', event: 'Expanded operations to Rivers State with Port Harcourt branch' },
  { year: '2018', event: 'Diversified into Oil & Gas procurement and Equipment Supply' },
  { year: '2020', event: 'Launched Disinfection Technology and Agricultural divisions' },
  { year: '2024', event: 'Strengthened sister company network for larger contracts' },
  { year: '2025', event: 'International expansion: UK office opened in Southampton; presence in USA & Australia' },
];

interface Props {
  overview?: string;
  foundedYear?: string;
  incorporatedYear?: string;
  headOfficeCity?: string;
  internationalPresence?: string;
  directorOfWorks?: string;
  directorName?: string;
  timelineEntries?: { year: string; event: string }[];
}

export default function AboutCompanyOverview({
  overview,
  foundedYear,
  incorporatedYear,
  headOfficeCity,
  internationalPresence,
  directorOfWorks,
  directorName,
  timelineEntries,
}: Props) {
  const text = overview || defaultOverview;
  const paragraphs = text.split('\n\n').filter(Boolean);

  const timeline = (timelineEntries && timelineEntries.length > 0) ? timelineEntries : defaultTimeline;

  const infoCards = [
    { icon: Calendar, label: 'Founded', value: foundedYear || '2009' },
    { icon: Building, label: 'Incorporated', value: incorporatedYear || '2012' },
    { icon: MapPin, label: 'Head Office', value: headOfficeCity || 'Lekki, Lagos' },
    { icon: Globe, label: 'International', value: internationalPresence || 'UK · USA · Australia' },
    { icon: User, label: 'Operational Director', value: directorOfWorks || 'Mrs Soibi Shedrach-Essumei' },
    { icon: User, label: 'Director', value: directorName || 'Shedrach Essumei' },
  ];

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
              A Legacy of Building Excellence
            </h2>
            {paragraphs.map((para, i) => (
              <p key={i} className={`text-gray-600 leading-relaxed ${i < paragraphs.length - 1 ? 'mb-4' : 'mb-6'}`}>
                {para}
              </p>
            ))}

            <div className="grid grid-cols-2 gap-4">
              {infoCards.map(({ icon: Icon, label, value }) => (
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
                    key={`${item.year}-${i}`}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-4 relative"
                  >
                    <div className="w-10 h-10 rounded-full bg-primary border-4 border-white shadow-md flex items-center justify-center flex-shrink-0 z-10">
                      <span className="text-white text-xs font-bold">{item.year.slice(-2)}</span>
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
