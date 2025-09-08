"use client";
import * as React from 'react';

export type Toast = {
  id: number;
  title?: string;
  description?: string;
  variant?: 'default' | 'destructive';
};

type ToastContext = {
  toasts: Toast[];
  add: (t: Omit<Toast, 'id'>) => void;
  remove: (id: number) => void;
};

const Ctx = React.createContext<ToastContext | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<Toast[]>([]);
  const add = (t: Omit<Toast, 'id'>) => setToasts((s) => [...s, { id: Date.now() + Math.random(), ...t }]);
  const remove = (id: number) => setToasts((s) => s.filter((t) => t.id !== id));
  return <Ctx.Provider value={{ toasts, add, remove }}>{children}</Ctx.Provider>;
}

export function useToast() {
  const ctx = React.useContext(Ctx);
  if (!ctx) throw new Error('useToast must be used within Toaster');
  return {
    toast: ({ title, description, variant }: Omit<Toast, 'id'>) => ctx.add({ title, description, variant }),
    dismiss: (id: number) => ctx.remove(id),
  };
}

export function Toaster() {
  const ctx = React.useContext(Ctx);
  if (!ctx) return null;
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {ctx.toasts.map((t) => (
        <div
          key={t.id}
          role="status"
          className={`rounded-lg px-4 py-3 shadow-soft ${
            t.variant === 'destructive' ? 'bg-red-500 text-white' : 'glass'
          }`}
          onClick={() => ctx.remove(t.id)}
        >
          {t.title && <div className="font-medium">{t.title}</div>}
          {t.description && <div className="text-sm opacity-90">{t.description}</div>}
        </div>
      ))}
    </div>
  );
}

