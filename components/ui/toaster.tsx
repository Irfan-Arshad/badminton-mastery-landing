"use client";
import { ToastProvider, Toaster } from './toast';

export function ToasterProvider({ children }: { children: React.ReactNode }) {
  return <ToastProvider>{children}</ToastProvider>;
}

export { Toaster } from './toast';

