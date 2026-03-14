'use client';

import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';
import { motion } from 'framer-motion';

const stats = [
  { value: 15, suffix: '+', label: 'Years Experience', description: 'Serving clients since 2009' },
  { value: 200, suffix: '+', label: 'Projects Completed', description: 'Across Nigeria and beyond' },
  { value: 7, suffix: '', label: 'Service Areas', description: 'Comprehensive solutions' },
  { value: 5, suffix: '', label: 'Sister Companies', description: 'Strategic partnerships' },
  { value: 100, suffix: '%', label: 'Client Satisfaction', description: 'Our top priority' },
  { value: 2, suffix: '', label: 'Office Locations', description: 'Lagos & Port Harcourt' },
];

export default function HomeStats() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section ref={ref} className="py-16 bg-primary">
      <div className="container-custom">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center text-white"
            >
              <div className="text-4xl md:text-5xl font-bold font-heading text-accent">
                {inView ? (
                  <>
                    <CountUp end={stat.value} duration={2.5} delay={i * 0.1} />
                    {stat.suffix}
                  </>
                ) : (
                  `0${stat.suffix}`
                )}
              </div>
              <div className="text-white font-semibold mt-1 text-sm">{stat.label}</div>
              <div className="text-white/50 text-xs mt-0.5">{stat.description}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
