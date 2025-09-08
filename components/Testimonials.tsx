"use client";
import { useState } from 'react';
import MotionInView from './MotionInView';

const testimonials = [
  { name: 'Alex', role: 'Beginner', text: 'Clear, practical, and motivating. My shots improved fast.' },
  { name: 'Priya', role: 'Intermediate', text: 'Footwork module alone was worth it. Felt immediate impact.' },
  { name: 'Tom', role: 'Recreational', text: 'Finally fixed my serve. Great structure and drills.' },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const t = testimonials[index];
  return (
    <section id="testimonials" className="py-20">
      <div className="container">
        <div className="mb-8">
          <h2 className="text-3xl font-semibold">What Players Say</h2>
        </div>
        <div className="grid lg:grid-cols-3 gap-6 items-stretch">
          {testimonials.map((item, i) => (
            <MotionInView key={i}>
              <div className="rounded-2xl glass p-6 h-full">
                <div className="text-sm text-mutedForeground">{item.role}</div>
                <div className="mt-2 text-lg">“{item.text}”</div>
                <div className="mt-4 font-medium">{item.name}</div>
              </div>
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
            />)
          )}
        </div>
      </div>
    </section>
  );
}

