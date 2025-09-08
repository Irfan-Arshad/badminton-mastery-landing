"use client";
import Link from 'next/link';
import { useEffect, useState } from 'react';
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

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className={`sticky top-0 z-50 transition-all ${scrolled ? 'py-2' : 'py-4'}`}>
      <div className={`container glass rounded-xl ${scrolled ? 'shadow-soft' : ''}`}>
        <nav className="flex items-center justify-between px-4 py-3">
          <Link href="#" className="flex items-center gap-2">
            <span className="inline-flex h-8 w-8 rounded-md bg-emerald-400/90 text-emerald-950 items-center justify-center font-bold">
              🏸
            </span>
            <span className="font-semibold tracking-tight">Badminton Mastery</span>
          </Link>
          <div className="hidden md:flex items-center gap-6">
            {links.map((l) => (
              <a key={l.href} href={l.href} className="text-sm text-mutedForeground hover:text-white">
                {l.label}
              </a>
            ))}
            <a href="#signup">
              <Button className="focus-ring" size="sm">Join Waitlist</Button>
            </a>
          </div>
          <button aria-label="Open menu" className="md:hidden focus-ring" onClick={() => setOpen(true)}>
            <Menu />
          </button>
        </nav>
      </div>
      <MobileMenu open={open} onOpenChange={setOpen} links={links} />
    </div>
  );
}

