"use client";
import { useEffect, useState } from 'react';
import { motion, useReducedMotion, animate } from 'framer-motion';

export default function WaitlistStat() {
  const [count, setCount] = useState(0);
  const [display, setDisplay] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    fetch('/api/waitlist/count', { cache: 'no-store' })
      .then(async (r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        const d = await r.json();
        setCount(Number(d.count || 0));
        setError(null);
      })
      .catch((e) => {
        console.error('Failed to load waitlist count', e);
        setError('');
        setCount(0);
      })
      .finally(() => setLoading(false));
    const onUpdated = (e: Event) => {
      const detail = (e as CustomEvent<number>).detail;
      if (typeof detail === 'number') setCount(detail);
    };
    window.addEventListener('waitlist:updated', onUpdated as EventListener);
    return () => window.removeEventListener('waitlist:updated', onUpdated as EventListener);
  }, []);

  useEffect(() => {
    if (prefersReduced) {
      setDisplay(count);
      return;
    }
    const controls = animate(display, count, {
      duration: 0.8,
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [count]);

  return (
    <div className="rounded-2xl glass px-6 py-4 flex items-center justify-between">
      <div>
        <div className="text-sm text-mutedForeground">Live Waitlist</div>
        <div className="text-2xl font-semibold">
          {loading ? '—' : display.toLocaleString()}
        </div>
      </div>
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ repeat: Infinity, repeatType: 'mirror', duration: 1.6 }}
        className="text-emerald-400 text-sm"
      >
        {error ? 'Fetching…' : 'Growing daily'}
      </motion.div>
    </div>
  );
}
