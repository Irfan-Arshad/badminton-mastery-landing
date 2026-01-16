"use client";

import { motion } from 'framer-motion';
import { BookOpen, Hand, Footprints, Sword, Goal, Brain, AlertTriangle, Wand2, Compass } from 'lucide-react';
import MotionInView from './MotionInView';

const modules = [
  { icon: BookOpen, title: 'Intro to Badminton' },
  { icon: Hand, title: 'Grips: forehand, backhand, panhandle, bevel' },
  { icon: Footprints, title: 'Movement & Footwork' },
  { icon: Sword, title: 'Key Shots: clear, drop, smash, net' },
  { icon: Goal, title: 'Serve & Return: singles, doubles, anticipation' },
  { icon: Brain, title: 'Game Strategies: singles, doubles, shot-selection' },
  { icon: Brain, title: 'Mental & Physical Conditioning' },
  { icon: AlertTriangle, title: 'Common Mistakes & Solutions' },
  { icon: Wand2, title: 'Advanced Tactics & Skills: deception, tempo, anticipation' },
  { icon: Compass, title: 'Beyond Fundamentals: styles, tracking progress' },
];

export default function Curriculum() {
  return (
    <section id="curriculum" className="py-20">
      <div className="container">
        <div className="mb-10">
          <h2 className="text-3xl md:text-4xl font-semibold">What You&apos;ll Learn</h2>
          <p className="text-mutedForeground mt-2 max-w-2xl">
            A structured curriculum with years of knowledge packed into concise lessons and practical drills, designed for steady progress and garunteed results.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((m, i) => (
            <MotionInView key={m.title} delay={i * 0.05}>
              <motion.div
                whileHover={{ y: -10, scale: 1.01 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 320, damping: 22 }}
                className="group rounded-2xl glass p-5 transition-shadow hover:shadow-soft"
              >
                <m.icon className="h-6 w-6 text-lime-300" />
                <div className="mt-3 font-medium">{m.title}</div>
              </motion.div>
            </MotionInView>
          ))}
        </div>
      </div>
    </section>
  );
}