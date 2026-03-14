'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Phone } from 'lucide-react';

export default function HomeCTA() {
  return (
    <section className="py-20 bg-accent">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-white max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-heading">
            Ready to Start Your Project?
          </h2>
          <p className="text-white/80 text-lg mb-8 leading-relaxed">
            Contact us today for a free consultation and project quote. Our team of experts is ready
            to help you bring your construction, engineering, or procurement project to life.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-accent px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
            >
              Get Free Quote
              <ArrowRight size={20} />
            </Link>
            <a
              href="tel:07065220758"
              className="bg-white/20 text-white border-2 border-white/40 px-8 py-4 rounded-xl font-bold hover:bg-white/30 transition-colors inline-flex items-center gap-2"
            >
              <Phone size={20} />
              Call Us Now
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
