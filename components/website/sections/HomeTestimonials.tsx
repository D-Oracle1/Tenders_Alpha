'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import SectionHeader from '../SectionHeader';

interface Testimonial {
  id: string;
  clientName: string;
  company?: string | null;
  position?: string | null;
  content: string;
  rating: number;
  image?: string | null;
}

export default function HomeTestimonials({ testimonials }: { testimonials: Testimonial[] }) {
  const [current, setCurrent] = useState(0);

  const items =
    testimonials.length > 0
      ? testimonials
      : [
          {
            id: '1',
            clientName: 'Engr. Adebayo Okafor',
            company: 'Lagos State Government',
            position: 'Director of Works',
            content:
              'Tenders General Merchant Ltd. delivered our road construction project ahead of schedule and within budget. Their professionalism and quality of work is unmatched.',
            rating: 5,
            image: null,
          },
        ];

  const next = () => setCurrent((p) => (p + 1) % items.length);
  const prev = () => setCurrent((p) => (p - 1 + items.length) % items.length);

  return (
    <section className="py-20 bg-gray-50">
      <div className="container-custom">
        <SectionHeader
          badge="Client Testimonials"
          title="What Our Clients Say"
          subtitle="Don't just take our word for it — hear from the clients who have experienced our commitment to excellence."
        />

        <div className="max-w-4xl mx-auto relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-2xl p-8 md:p-12 shadow-lg relative"
            >
              <Quote size={60} className="absolute top-6 right-6 text-primary/10" />

              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    className={i < items[current].rating ? 'fill-amber-400 text-amber-400' : 'text-gray-200'}
                  />
                ))}
              </div>

              <blockquote className="text-gray-700 text-lg leading-relaxed mb-8 italic">
                "{items[current].content}"
              </blockquote>

              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-xl font-heading">
                    {items[current].clientName.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="font-bold text-primary font-heading">{items[current].clientName}</div>
                  {items[current].position && (
                    <div className="text-gray-500 text-sm">{items[current].position}</div>
                  )}
                  {items[current].company && (
                    <div className="text-accent text-sm font-semibold">{items[current].company}</div>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          {items.length > 1 && (
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={prev}
                className="w-10 h-10 rounded-full border-2 border-primary/20 flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all"
              >
                <ChevronLeft size={18} />
              </button>
              <div className="flex gap-2">
                {items.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`transition-all rounded-full ${i === current ? 'w-8 h-2.5 bg-accent' : 'w-2.5 h-2.5 bg-gray-300'}`}
                  />
                ))}
              </div>
              <button
                onClick={next}
                className="w-10 h-10 rounded-full border-2 border-primary/20 flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
