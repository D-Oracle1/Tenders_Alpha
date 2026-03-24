'use client';

import { motion } from 'framer-motion';
import { Eye, Target, BookOpen } from 'lucide-react';

export default function AboutVisionMission() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary font-heading">Our Core Principles</h2>
          <div className="w-16 h-1 bg-accent rounded-full mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: Eye,
              title: 'Our Vision',
              content:
                'To be the leading indigenous engineering and procurement company in Nigeria, delivering world-class solutions that drive national development and regional growth.',
              color: 'bg-primary',
            },
            {
              icon: Target,
              title: 'Our Mission',
              content:
                'To provide high-quality, innovative, and cost-effective construction, engineering, procurement, beauty/cosmetics, and vocational skills services while maintaining the highest standards of professionalism, integrity, and environmental responsibility.',
              color: 'bg-accent',
            },
            {
              icon: BookOpen,
              title: 'Our Philosophy',
              content:
                'We believe in building lasting partnerships with our clients based on trust, transparency, and consistent delivery of excellence. Every project we undertake is a testament to our commitment to quality and the development of Nigeria.',
              color: 'bg-primary-700',
            },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow"
            >
              <div className={`w-14 h-14 rounded-xl ${item.color} flex items-center justify-center mb-6`}>
                <item.icon size={28} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-primary mb-4 font-heading">{item.title}</h3>
              <p className="text-gray-600 leading-relaxed">{item.content}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
