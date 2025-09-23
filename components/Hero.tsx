"use client";
import { motion, useScroll, useTransform } from 'framer-motion';
import { useCallback, useRef, useState } from 'react';
import { CheckCircle2, Medal, Shield, Volume2, VolumeX } from 'lucide-react';
import WaitlistStat from './WaitlistStat';
import { Button } from './ui/button';

const HERO_VIDEO_SRC = '/videos/hero-trailer.mp4';

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [muted, setMuted] = useState(true);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 400], [0, -60]);
  const o = useTransform(scrollY, [0, 400], [1, 0.6]);

  const toggleAudio = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    const nextMuted = !muted;
    setMuted(nextMuted);
    video.muted = nextMuted;
    if (!video.paused && nextMuted) {
      video.currentTime = video.currentTime;
    }
  }, [muted]);

  return (
    <section className="relative overflow-hidden min-h-screen">
      <motion.div
        aria-hidden="true"
        role="presentation"
        className="absolute inset-0"
        style={{ opacity: o, y }}
      >
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          src={HERO_VIDEO_SRC}
          autoPlay
          loop
          muted={muted}
          playsInline
          poster="/og-image.png"
        />
        <div className="absolute inset-0 bg-slate-950/70" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-slate-950/70 to-slate-950" />
      </motion.div>
      <motion.button
        type="button"
        onClick={toggleAudio}
        aria-pressed={!muted}
        aria-label={muted ? 'Unmute background video' : 'Mute background video'}
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        className="absolute right-6 top-24 md:top-28 flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-white/80 backdrop-blur-sm focus-ring"
      >
        {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
        <span className="text-sm hidden sm:inline">{muted ? 'Sound Off' : 'Sound On'}</span>
      </motion.button>
      <div className="relative container min-h-screen pt-32 pb-20 md:pt-40 md:pb-24 flex items-center">
        <div className="grid lg:grid-cols-1 gap-12 items-start md:items-center w-full">
          <div className="max-w-2xl space-y-8">
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-6xl font-bold tracking-tight text-white"
            >
              Master the Core Foundations of Badminton
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-white/80"
            >
              Built by a Level 2 certified coach, the programme gives you the exact movement, shot, and strategy drills to accelerate from court rookie to confident competitor.
            </motion.p>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
              className="flex flex-wrap gap-4"
            >
              <motion.a
                href="#signup"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                whileHover={{ y: -4, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block"
              >
                <Button size="lg" className="focus-ring">
                  Join the Waitlist
                </Button>
              </motion.a>
              <motion.a
                href="#curriculum"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.35 }}
                whileHover={{ y: -4, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block"
              >
                <Button size="lg" variant="ghost" className="focus-ring text-white/80">
                  See What&apos;s Inside
                </Button>
              </motion.a>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-3"
            >
              <Badge icon={<Shield className="h-4 w-4" />} text="Level 2 Certified Coach" />
              <Badge icon={<Medal className="h-4 w-4" />} text="Ex-Adidas Sponsored" />
              <Badge icon={<CheckCircle2 className="h-4 w-4" />} text="8+ Years Experience" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="max-w-md"
            >
              <WaitlistStat />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Badge({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 280, damping: 20 }}
      className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-white/80 backdrop-blur-sm"
    >
      <span className="text-lime-300">{icon}</span>
      <span className="text-sm">{text}</span>
    </motion.div>
  );
}