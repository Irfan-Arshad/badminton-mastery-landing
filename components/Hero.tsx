"use client";
import { motion, useScroll, useTransform } from 'framer-motion';
import { CheckCircle2, Medal, Shield } from 'lucide-react';
import { Button } from './ui/button';

export default function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 400], [0, -60]);
  const o = useTransform(scrollY, [0, 400], [1, 0.6]);
  return (
    <section className="pt-24 pb-16 grid-overlay">
      <div className="container relative">
        <motion.div style={{ y, opacity: o }} className="absolute -top-20 -right-20 -z-10 h-72 w-72 rounded-full bg-emerald-500/20 blur-3xl" />
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Master the Core Foundations of Badminton
            </h1>
            <p className="mt-4 text-lg text-mutedForeground max-w-xl">
              A step-by-step course for beginners to low-advanced players—built by a Level 2
              certified coach.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="#signup">
                <Button size="lg" className="focus-ring">Join the Waitlist</Button>
              </a>
              <a href="#curriculum">
                <Button size="lg" variant="secondary" className="focus-ring">See What’s Inside</Button>
              </a>
            </div>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Badge icon={<Shield className="h-4 w-4" />} text="Level 2 Certified Coach" />
              <Badge icon={<Medal className="h-4 w-4" />} text="Ex-Adidas Sponsored" />
              <Badge icon={<CheckCircle2 className="h-4 w-4" />} text="8+ Years Experience" />
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="aspect-[4/3] rounded-2xl glass shadow-soft overflow-hidden flex items-center justify-center">
              <span className="text-mutedForeground">Course preview coming soon</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Badge({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2">
      <span className="text-emerald-400">{icon}</span>
      <span className="text-sm text-mutedForeground">{text}</span>
    </div>
  );
}

