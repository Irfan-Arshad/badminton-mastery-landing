"use client";

import { motion } from 'framer-motion';
import MotionInView from './MotionInView';
import { Button } from './ui/button';

export default function PricingTeaser() {
  return (
    <section className="py-16">
      <div className="container">
        <MotionInView>
          <motion.div
            whileHover={{ y: -8, scale: 1.01 }}
            transition={{ type: 'spring', stiffness: 260, damping: 18 }}
            className="rounded-2xl glass p-8 flex flex-col md:flex-row items-center justify-between gap-6 transition-shadow hover:shadow-soft"
          >
            <div>
              <h3 className="text-2xl font-semibold">Join the waitlist for an exclusive launch discount.</h3>
              <p className="text-mutedForeground mt-2">Early-bird benefits. Limited-time pricing at launch.</p>
            </div>
            <motion.a
              href="#signup"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 320, damping: 20 }}
            >
              <Button size="lg">Get Notified</Button>
            </motion.a>
          </motion.div>
        </MotionInView>
      </div>
    </section>
  );
}

