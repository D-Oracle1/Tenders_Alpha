'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

interface Testimonial {
  id: string;
  clientName: string;
  company?: string | null;
  position?: string | null;
  content: string;
  rating: number;
  image?: string | null;
}

const fallback: Testimonial[] = [
  {
    id: '1',
    clientName: 'Engr. Adebayo Okafor',
    company: 'Lagos State Government',
    position: 'Director of Works',
    content:
      'Tenders Alpha delivered our road construction project ahead of schedule and within budget. Their professionalism and quality of work is unmatched.',
    rating: 5,
    image: null,
  },
];

export default function HomeTestimonials({ testimonials }: { testimonials: Testimonial[] }) {
  const items = testimonials.length > 0 ? testimonials : fallback;
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((p) => (p + 1) % items.length);
  const prev = () => setCurrent((p) => (p - 1 + items.length) % items.length);

  const item = items[current];

  return (
    <section className="py-24 bg-white">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-3 mb-12 justify-center">
            <span className="w-6 h-px bg-accent" />
            <span className="text-xs font-semibold tracking-widest uppercase text-accent">
              Client Testimonials
            </span>
            <span className="w-6 h-px bg-accent" />
          </div>

          {/* Quote area */}
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="text-center"
            >
              {/* Stars */}
              <div className="flex gap-1 justify-center mb-8">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={i < item.rating ? 'fill-accent text-accent' : 'text-gray-200'}
                  />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-xl md:text-2xl text-primary font-heading font-medium leading-relaxed mb-10">
                "{item.content}"
              </blockquote>

              {/* Author */}
              <div className="flex flex-col items-center gap-1">
                <div className="w-10 h-px bg-accent mb-4" />
                <span className="font-bold text-primary text-sm font-heading">{item.clientName}</span>
                {item.position && (
                  <span className="text-gray-400 text-xs">{item.position}</span>
                )}
                {item.company && (
                  <span className="text-accent text-xs font-semibold">{item.company}</span>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          {items.length > 1 && (
            <div className="flex items-center justify-center gap-6 mt-12">
              <button
                onClick={prev}
                className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:border-primary hover:text-primary transition-all duration-300"
              >
                <ChevronLeft size={16} />
              </button>
              <div className="flex gap-1.5">
                {items.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`transition-all duration-300 rounded-full ${
                      i === current ? 'w-6 h-1.5 bg-accent' : 'w-1.5 h-1.5 bg-gray-200'
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={next}
                className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:border-primary hover:text-primary transition-all duration-300"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
