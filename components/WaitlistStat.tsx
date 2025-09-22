"use client";
import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion, animate } from 'framer-motion';

export default function WaitlistStat() {
  const [count, setCount] = useState(0);
  const [display, setDisplay] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const prefersReduced = useReducedMotion();

  const loadCount = useCallback(async () => {
    try {
      const response = await fetch('/api/waitlist/count', { cache: 'no-store' });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      const incoming = Number(data?.count ?? 0);
      if (!Number.isFinite(incoming)) throw new Error('Invalid count payload');
      setCount(incoming);
      setError(null);
    } catch (err) {
      console.error('Failed to load waitlist count', err);
      setError('Unable to fetch the latest count.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCount();
    const onUpdated = (event: Event) => {
      const detail = (event as CustomEvent<number>).detail;
      if (typeof detail === 'number') {
        setCount(detail);
        setError(null);
      }
    };
    window.addEventListener('waitlist:updated', onUpdated as EventListener);
    return () => window.removeEventListener('waitlist:updated', onUpdated as EventListener);
  }, [loadCount]);

  useEffect(() => {
    if (loading) return;
    if (prefersReduced) {
      setDisplay(count);
      return;
    }
    const controls = animate(display, count, {
      duration: 0.8,
      ease: 'easeOut',
      onUpdate: (value) => setDisplay(Math.round(value)),
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count, loading, prefersReduced]);

  const statusText = error ? 'Retrying soon' : 'Growing daily';

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="rounded-2xl glass px-6 py-4 flex items-center justify-between"
    >
      <div>
        <div className="text-sm text-mutedForeground">Live Waitlist</div>
        <motion.div
          key={loading ? 'loading' : 'count'}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="text-2xl font-semibold"
        >
          {loading ? '...' : display.toLocaleString()}
        </motion.div>
      </div>
      <motion.div
        initial={{ scale: 0.9, opacity: 0.8 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ repeat: prefersReduced ? 0 : Infinity, repeatType: 'mirror', duration: 1.6 }}
        className="text-emerald-400 text-sm"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={statusText}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
          >
            {statusText}
          </motion.span>
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
