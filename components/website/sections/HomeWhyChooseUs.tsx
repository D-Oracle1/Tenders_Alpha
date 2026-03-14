'use client';

import { motion } from 'framer-motion';
import { Shield, Award, Clock, Users, Lightbulb, Handshake } from 'lucide-react';
import SectionHeader from '../SectionHeader';

const reasons = [
  {
    icon: Award,
    title: 'Proven Excellence',
    description: 'Over 15 years of delivering high-quality projects that meet international standards and exceed client expectations.',
  },
  {
    icon: Shield,
    title: 'Safety First',
    description: 'We maintain the highest safety standards on all our project sites, protecting our workers, clients, and the public.',
  },
  {
    icon: Clock,
    title: 'On-Time Delivery',
    description: 'We understand the value of time in business. Our project management ensures timely delivery without compromising quality.',
  },
  {
    icon: Users,
    title: 'Expert Team',
    description: 'Our team of qualified engineers, procurement specialists, and construction experts bring decades of combined experience.',
  },
  {
    icon: Lightbulb,
    title: 'Innovative Solutions',
    description: 'We embrace modern technologies and innovative approaches to solve complex engineering and construction challenges.',
  },
  {
    icon: Handshake,
    title: 'Client Partnership',
    description: 'We build lasting relationships with our clients, treating every project as a partnership built on trust and transparency.',
  },
];

export default function HomeWhyChooseUs() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container-custom">
        <SectionHeader
          badge="Why Choose Us"
          title="The Tenders General Advantage"
          subtitle="We combine expertise, innovation, and integrity to deliver solutions that create lasting value for our clients and communities."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, i) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-100"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                <reason.icon size={28} className="text-primary" />
              </div>
              <h3 className="text-lg font-bold text-primary mb-3 font-heading">{reason.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{reason.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
