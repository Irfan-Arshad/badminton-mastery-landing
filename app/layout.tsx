import type { Metadata } from 'next';
import '../styles/globals.css';
import { ToastProvider } from '../components/ui/toast';
import { Toaster } from '../components/ui/toaster';

export const metadata: Metadata = {
  metadataBase: new URL('https://badmintonmastery.example.com'),
  title: 'Badminton Mastery: Core Foundations',
  description:
    'Master the core foundations of badminton with structured lessons, drills, and expert guidance.',
  openGraph: {
    title: 'Badminton Mastery: Core Foundations',
    description:
      'Master the core foundations of badminton with structured lessons, drills, and expert guidance.',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Badminton Mastery: Core Foundations',
    description:
      'Master the core foundations of badminton with structured lessons, drills, and expert guidance.',
    images: ['/og-image.png'],
  },
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const orgJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Badminton Mastery',
    url: 'https://badmintonmastery.example.com',
  };
  const siteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Badminton Mastery: Core Foundations',
    url: 'https://badmintonmastery.example.com',
  };
  return (
    <html lang="en">
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }} />
      </head>
      <body>
        <ToastProvider>
          {children}
          <Toaster />
        </ToastProvider>
      </body>
    </html>
  );
}
