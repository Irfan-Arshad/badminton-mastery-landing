"use client";
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from './ui/button';

export default function MobileMenu({
  open,
  onOpenChange,
  links,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  links: { href: string; label: string }[];
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => onOpenChange(false)}
        >
          <motion.div
            className="absolute top-0 right-0 bottom-0 w-80 glass p-6"
            initial={{ x: 200 }}
            animate={{ x: 0 }}
            exit={{ x: 200 }}
            transition={{ type: 'spring', stiffness: 260, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-8 w-8 rounded-md bg-emerald-400/90 text-emerald-950 items-center justify-center font-bold">
                  🏸
                </span>
                <span className="font-semibold">Menu</span>
              </div>
              <button className="focus-ring" onClick={() => onOpenChange(false)} aria-label="Close menu">
                <X />
              </button>
            </div>
            <div className="flex flex-col gap-3">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="py-2 text-lg text-mutedForeground hover:text-white"
                  onClick={() => onOpenChange(false)}
                >
                  {l.label}
                </a>
              ))}
              <a href="#signup" onClick={() => onOpenChange(false)}>
                <Button className="w-full">Join Waitlist</Button>
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

