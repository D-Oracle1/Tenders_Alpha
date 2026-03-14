'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TypewriterWord {
  id: string;
  word: string;
  order: number;
}

interface HeroSlide {
  id: string;
  title: string;
  subtitle?: string;
  backgroundImage: string;
  buttonText?: string;
  buttonLink?: string;
  typewriterWords: TypewriterWord[];
}

interface HeroSliderProps {
  slides: HeroSlide[];
}

// Default slides for when data loads
const defaultSlides: HeroSlide[] = [
  {
    id: '1',
    title: 'Building the Future of Nigeria',
    subtitle:
      'Your trusted partner in construction, civil engineering, oil & gas procurement, and agricultural solutions.',
    backgroundImage: '/images/hero/hero-bg-1.jpg',
    buttonText: 'Explore Our Services',
    buttonLink: '/services',
    typewriterWords: [
      { id: '1', word: 'Construction Services', order: 1 },
      { id: '2', word: 'Oil & Gas Procurement', order: 2 },
      { id: '3', word: 'Civil Engineering', order: 3 },
      { id: '4', word: 'Agricultural Solutions', order: 4 },
    ],
  },
];

export default function HeroSlider({ slides }: HeroSliderProps) {
  const activeSlides = slides.length > 0 ? slides : defaultSlides;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const next = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % activeSlides.length);
  }, [activeSlides.length]);

  const prev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + activeSlides.length) % activeSlides.length);
  }, [activeSlides.length]);

  useEffect(() => {
    if (!isAutoPlaying || activeSlides.length <= 1) return;
    const timer = setInterval(next, 7000);
    return () => clearInterval(timer);
  }, [isAutoPlaying, next, activeSlides.length]);

  const currentSlide = activeSlides[currentIndex];

  // Build typewriter sequence
  const typewriterSequence = currentSlide.typewriterWords.flatMap((w) => [w.word, 2500]);

  return (
    <section
      className="relative h-screen min-h-[600px] max-h-[900px] overflow-hidden"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Background Slides */}
      <AnimatePresence initial={false}>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          {/* Background Image with overlay */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${currentSlide.backgroundImage})`,
            }}
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container-custom">
          <div className="max-w-3xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="inline-flex items-center gap-2 bg-accent/20 border border-accent/40 text-white px-4 py-1.5 rounded-full text-sm font-medium mb-6"
                >
                  <span className="w-2 h-2 bg-accent rounded-full animate-pulse"></span>
                  Indigenous Nigerian Company • Est. 2009
                </motion.div>

                {/* Title */}
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight font-heading"
                >
                  {currentSlide.title}
                </motion.h1>

                {/* Typewriter */}
                {currentSlide.typewriterWords.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-2xl md:text-3xl font-bold text-accent mb-6 h-10"
                  >
                    <TypeAnimation
                      key={currentIndex}
                      sequence={typewriterSequence as (string | number)[]}
                      wrapper="span"
                      speed={50}
                      repeat={Infinity}
                    />
                  </motion.div>
                )}

                {/* Subtitle */}
                {currentSlide.subtitle && (
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="text-white/80 text-lg md:text-xl mb-8 leading-relaxed max-w-2xl"
                  >
                    {currentSlide.subtitle}
                  </motion.p>
                )}

                {/* CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="flex flex-wrap gap-4"
                >
                  {currentSlide.buttonText && currentSlide.buttonLink && (
                    <Link
                      href={currentSlide.buttonLink}
                      className="btn-accent group"
                    >
                      {currentSlide.buttonText}
                      <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  )}
                  <Link
                    href="/contact"
                    className="bg-white/10 backdrop-blur-sm border border-white/30 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/20 transition-all duration-300 inline-flex items-center gap-2"
                  >
                    Get A Quote
                  </Link>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      {activeSlides.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all"
            aria-label="Previous slide"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={next}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all"
            aria-label="Next slide"
          >
            <ChevronRight size={20} />
          </button>

          {/* Slide Indicators */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {activeSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={cn(
                  'transition-all duration-300 rounded-full',
                  i === currentIndex ? 'w-8 h-2.5 bg-accent' : 'w-2.5 h-2.5 bg-white/50 hover:bg-white/80'
                )}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}

      {/* Stats Bar */}
      <div className="absolute bottom-0 left-0 right-0 z-20 bg-white/10 backdrop-blur-md border-t border-white/10">
        <div className="container-custom py-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-white">
            {[
              { label: 'Years Experience', value: '15+' },
              { label: 'Projects Completed', value: '200+' },
              { label: 'Service Categories', value: '7' },
              { label: 'Sister Companies', value: '5' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl font-bold text-accent font-heading">{stat.value}</div>
                <div className="text-white/70 text-xs mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
