'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function AboutHero() {
  return (
    <section className="relative py-28 bg-primary overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-800 to-primary-900" />
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-white/20" />
        <div className="absolute bottom-10 right-20 w-96 h-96 rounded-full bg-accent/20" />
      </div>

      <div className="relative z-10 container-custom text-center text-white">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-accent rounded-full"></span>
            Established 2009 • Incorporated 2012
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-heading">About Our Company</h1>
          <p className="text-white/70 text-xl max-w-2xl mx-auto leading-relaxed">
            Tenders General Merchant Ltd. — Building Nigeria's infrastructure and creating lasting
            value through excellence, innovation, and integrity.
          </p>
          <div className="flex flex-wrap gap-2 justify-center mt-6 text-sm text-white/60">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-accent">About Us</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
