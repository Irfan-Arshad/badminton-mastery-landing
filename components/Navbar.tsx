"use client";
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Menu } from 'lucide-react';
import MobileMenu from './MobileMenu';
import { Button } from './ui/button';

const links = [
  { href: '#curriculum', label: 'Curriculum' },
  { href: '#coach', label: 'Coach' },
  { href: '#testimonials', label: 'Testimonials' },
  { href: '#faq', label: 'FAQ' },
  { href: '#contact', label: 'Contact' },
];

const navItemVariants = {
  rest: { opacity: 0.8, y: 0 },
  hover: { opacity: 1, y: -2 },
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const baseBg = scrolled
    ? 'bg-white/20 border border-white/20 shadow-soft backdrop-blur-2xl'
    : 'bg-white/10 border border-white/10 shadow-soft/0 backdrop-blur-xl';

  return (
    <div className={`fixed inset-x-0 top-0 z-50 transition-all ${scrolled ? 'py-2' : 'py-4'}`}>
      <div className="container">
        <div className={`rounded-xl transition-all duration-300 ${baseBg}`}>
          <nav className="flex items-center justify-between px-4 py-3">
            <Link href="#" className="flex items-center gap-2">
              <span className="inline-flex h-8 w-8 rounded-md bg-lime-400/90 text-slate-900 items-center justify-center font-bold">
                B
              </span>
              <span className="font-semibold tracking-tight text-white">Badminton Mastery</span>
            </Link>
            <div className="hidden md:flex items-center gap-6">
              {links.map((l) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  variants={navItemVariants}
                  initial="rest"
                  whileHover="hover"
                  className="text-sm text-white/80"
                >
                  {l.label}
                </motion.a>
              ))}
              <motion.a
                href="#signup"
                variants={navItemVariants}
                initial="rest"
                whileHover="hover"
                className="inline-flex"
              >
                <Button className="focus-ring" size="sm">
                  Join Waitlist
                </Button>
              </motion.a>
            </div>
            <motion.button
              aria-label="Open menu"
              className="md:hidden focus-ring text-white"
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.08 }}
              onClick={() => setOpen(true)}
            >
              <Menu />
            </motion.button>
          </nav>
        </div>
      </div>
      <MobileMenu open={open} onOpenChange={setOpen} links={links} />
    </div>
  );
}


