"use client";
import { motion } from 'framer-motion';
import { useState } from 'react';
import MotionInView from './MotionInView';

const testimonials = [
  { name: 'Donald', role: 'Advanced', text: 'Clear, practical, and motivating. My shots improved fast.' },
  { name: 'Jarjish', role: 'Intermediate', text: 'Footwork module alone was worth it. Felt immediate impact.' },
  { name: 'Umar', role: 'Begginer', text: 'Finally fixed my serve. Great structure and drills.' },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  return (
    <section id="testimonials" className="py-20">
      <div className="container">
        <div className="mb-8">
          <h2 className="text-3xl font-semibold">What Players Say</h2>
        </div>
        <div className="grid lg:grid-cols-3 gap-6 items-stretch">
          {testimonials.map((item) => (
            <MotionInView key={item.name}>
              <motion.div
                whileHover={{ y: -6, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                className="rounded-2xl glass p-6 h-full transition-shadow hover:shadow-soft"
              >
                <div className="text-sm text-mutedForeground">{item.role}</div>
                <div className="mt-2 text-lg">&ldquo;{item.text}&rdquo;</div>
                <div className="mt-4 font-medium">{item.name}</div>
              </motion.div>
            </MotionInView>
          ))}
        </div>
        <div className="mt-6 flex gap-2 lg:hidden" aria-label="testimonial carousel controls">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-2 w-6 rounded-full ${i === index ? 'bg-emerald-400' : 'bg-white/20'}`}
              aria-pressed={i === index}
              aria-label={`Show testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}


