"use client";
import * as React from 'react';

type AccordionContext = {
  type: 'single' | 'multiple';
  openItems: Set<string>;
  toggle: (v: string) => void;
};
const AccordionCtx = React.createContext<AccordionContext | null>(null);

const ItemCtx = React.createContext<string | null>(null);

export function Accordion({
  type = 'single',
  collapsible = true,
  className,
  children,
}: {
  type?: 'single' | 'multiple';
  collapsible?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  const [openItems, setOpen] = React.useState<Set<string>>(new Set());
  const toggle = (v: string) => {
    setOpen((prev) => {
      const next = new Set(prev);
      const isOpen = next.has(v);
      if (type === 'single') next.clear();
      if (!isOpen) next.add(v);
      else if (collapsible) next.delete(v);
      return next;
    });
  };
  return (
    <div className={className}>
      <AccordionCtx.Provider value={{ type, openItems, toggle }}>{children}</AccordionCtx.Provider>
    </div>
  );
}

export function AccordionItem({ value, children }: { value: string; children: React.ReactNode }) {
  return (
    <ItemCtx.Provider value={value}>
      <div className="border-b border-white/10">{children}</div>
    </ItemCtx.Provider>
  );
}

export function AccordionTrigger({ children }: { children: React.ReactNode }) {
  const ctx = React.useContext(AccordionCtx);
  const value = React.useContext(ItemCtx) || '';
  const open = !!ctx?.openItems.has(value);
  return (
    <button
      onClick={() => ctx?.toggle(value)}
      className="w-full py-4 text-left font-medium flex items-center justify-between"
      aria-expanded={open}
    >
      {children}
      <span className={`transition-transform ${open ? 'rotate-180' : ''}`}>▾</span>
    </button>
  );
}

export function AccordionContent({ children }: { children: React.ReactNode }) {
  const ctx = React.useContext(AccordionCtx);
  const value = React.useContext(ItemCtx) || '';
  const open = !!ctx?.openItems.has(value);
  return <div className={`pb-4 text-mutedForeground ${open ? '' : 'hidden'}`}>{children}</div>;
}
