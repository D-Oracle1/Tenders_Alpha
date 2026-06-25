'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight, Phone } from 'lucide-react';

const line1 = "Ready to win";
const line2 = "your next tender?";

export default function HomeCTA() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-15%' });

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
  };

  const lineVariants = {
    hidden: { scaleX: 0 },
    visible: { scaleX: 1, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section
      ref={ref}
      className="relative bg-primary overflow-hidden py-16 md:py-24"
    >
      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      {/* Accent glow — bottom right */}
      <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full bg-accent/20 blur-[120px] pointer-events-none" />

      <div className="container-custom relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {/* Eyebrow */}
          <motion.div variants={fadeUp} className="flex items-center gap-3 mb-10">
            <span className="w-8 h-px bg-accent" />
            <span className="text-accent text-sm font-medium tracking-widest uppercase">
              Nigeria's Procurement Platform
            </span>
          </motion.div>

          {/* Headline */}
          <div className="overflow-hidden mb-2">
            <motion.h2
              variants={fadeUp}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white font-heading leading-none tracking-tight"
            >
              {line1}
            </motion.h2>
          </div>
          <div className="overflow-hidden mb-12">
            <motion.h2
              variants={fadeUp}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold font-heading leading-none tracking-tight text-accent"
            >
              {line2}
            </motion.h2>
          </div>

          {/* Divider */}
          <motion.div
            variants={lineVariants}
            className="origin-left h-px bg-white/10 mb-12 w-full"
          />

          {/* Bottom row */}
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-10">
            {/* Supporting text */}
            <motion.p
              variants={fadeUp}
              className="text-white/50 text-base md:text-lg max-w-sm leading-relaxed"
            >
              Submit a tender, explore our procurement services, or speak directly with our team — we respond within 24 hours.
            </motion.p>

            {/* Actions */}
            <motion.div
              variants={fadeUp}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
            >
              <Link
                href="/tenders"
                className="group inline-flex items-center gap-3 bg-accent text-white px-8 py-4 rounded-full font-semibold text-sm tracking-wide hover:bg-accent/90 transition-all duration-300"
              >
                Submit a Tender
                <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                  <ArrowUpRight size={14} />
                </span>
              </Link>

              <a
                href="tel:08101365496"
                className="group inline-flex items-center gap-3 text-white/60 hover:text-white transition-colors duration-300 text-sm font-medium"
              >
                <span className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:border-white/60 transition-colors">
                  <Phone size={14} />
                </span>
                08101 365 496
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
