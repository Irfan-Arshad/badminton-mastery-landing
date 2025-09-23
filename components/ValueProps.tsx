"use client";

import { motion } from 'framer-motion';
import { Globe2, Layers, Repeat, Users } from 'lucide-react';
import MotionInView from './MotionInView';

const props = [
  { icon: Layers, title: 'Structured lessons', desc: 'Clear progression with drills and practice.' },
  { icon: Repeat, title: 'Lifetime access', desc: 'Learn at your pace, revisit anytime.' },
  { icon: Users, title: 'Global community', desc: 'Train together and share wins.' },
  { icon: Globe2, title: 'Practical focus', desc: 'Techniques that transfer to the court.' },
];

export default function ValueProps() {
  return (
    <section className="py-16">
      <div className="container">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {props.map((p, i) => (
            <MotionInView key={p.title} delay={i * 0.05}>
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 340, damping: 20 }}
                className="rounded-2xl glass p-5 hover:shadow-soft transition-shadow"
              >
                <p.icon className="h-6 w-6 text-lime-300" />
                <div className="mt-3 font-medium">{p.title}</div>
                <div className="text-sm text-mutedForeground mt-1">{p.desc}</div>
              </motion.div>
            </MotionInView>
          ))}
        </div>
      </div>
    </section>
  );
}

