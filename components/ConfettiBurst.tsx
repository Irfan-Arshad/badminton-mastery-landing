"use client";

import { useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';

type ConfettiBurstProps = {
  onDone?: () => void;
};

const COLORS = ['#34d399', '#fbbf24', '#60a5fa', '#f472b6', '#f97316'];

export default function ConfettiBurst({ onDone }: ConfettiBurstProps) {
  const pieces = useMemo(
    () =>
      Array.from({ length: 55 }, (_, index) => {
        const angle = Math.random() * Math.PI - Math.PI; // upward hemisphere
        const distance = 160 + Math.random() * 180;
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance - 80;
        return {
          id: index,
          color: COLORS[index % COLORS.length],
          x,
          y,
          delay: Math.random() * 0.1,
          duration: 0.9 + Math.random() * 0.6,
          rotation: Math.random() * 360,
          spin: (Math.random() - 0.5) * 240,
          scale: 0.9 + Math.random() * 0.9,
        };
      }),
    [],
  );

  useEffect(() => {
    if (!onDone) return;
    const timer = setTimeout(() => onDone(), 1600);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="pointer-events-none fixed inset-x-0 bottom-0 z-[60] flex justify-center overflow-visible"
    >
      <div className="relative h-0 w-0">
        {pieces.map((piece) => (
          <motion.span
            key={piece.id}
            initial={{
              x: 0,
              y: 0,
              scale: 0.4,
              rotate: piece.rotation,
              opacity: 0,
            }}
            animate={{
              x: piece.x,
              y: piece.y,
              scale: piece.scale,
              rotate: piece.rotation + piece.spin,
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: piece.duration,
              delay: piece.delay,
              ease: 'easeOut',
            }}
            style={{
              position: 'absolute',
              backgroundColor: piece.color,
              width: `${10 * piece.scale}px`,
              height: `${28 * piece.scale}px`,
              borderRadius: '9999px',
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}
