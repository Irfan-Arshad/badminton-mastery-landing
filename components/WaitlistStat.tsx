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
    setLoading(true);
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

  const handleRealtimeUpdate = useCallback(
    (event: Event) => {
      const detail = (event as CustomEvent<number | null | undefined>).detail;
      if (typeof detail === 'number' && Number.isFinite(detail)) {
        setCount(detail);
        setError(null);
        setLoading(false);
        return;
      }
      loadCount();
    },
    [loadCount],
  );

  useEffect(() => {
    loadCount();
    window.addEventListener('waitlist:updated', handleRealtimeUpdate as EventListener);
    return () => window.removeEventListener('waitlist:updated', handleRealtimeUpdate as EventListener);
  }, [loadCount, handleRealtimeUpdate]);

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

  const statusText = error ? 'Retrying soon' : 'and growing';

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex flex-col sm:flex-row sm:items-end gap-3 sm:gap-6 text-white"
    >
      <div className="space-y-2">
        <motion.div
          key={loading ? 'loading' : 'count'}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="text-4xl sm:text-5xl font-semibold tracking-tight"
        >
          {loading ? '...' : display.toLocaleString()}
        </motion.div>
        <div className="flex items-center gap-2 text-sm uppercase tracking-[0.25em] text-white/70">
          <span className="inline-flex h-2 w-2 rounded-full bg-lime-300 animate-pulse" aria-hidden />
          <span>Live Waitlist</span>
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.1 }}
        className="text-sm sm:text-base text-white/80 max-w-xs"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={statusText}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
          >
            {error ? statusText : `${statusText} every day.`}
          </motion.span>
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
