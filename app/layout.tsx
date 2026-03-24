import type { Metadata } from 'next';
import { Inter, Montserrat } from 'next/font/google';
import './globals.css';
import { Toaster } from 'react-hot-toast';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Tenders Alpha | Construction, Engineering & Procurement',
    template: '%s | Tenders Alpha',
  },
  description:
    "Nigeria's trusted partner in building construction, civil engineering, oil & gas procurement, equipment supply, cargo handling, beauty/cosmetics, and vocational skills. Founded 2009.",
  keywords: [
    'Tenders Alpha',
    'building construction Nigeria',
    'civil engineering Lagos',
    'oil gas procurement',
    'equipment supply Nigeria',
    'cargo handling Port Harcourt',
  ],
  authors: [{ name: 'Tenders Alpha' }],
  creator: 'Tenders Alpha',
  openGraph: {
    type: 'website',
    locale: 'en_NG',
    url: process.env.NEXT_PUBLIC_APP_URL,
    siteName: 'Tenders Alpha',
    title: 'Tenders Alpha | Construction, Engineering & Procurement',
    description:
      "Nigeria's trusted partner in building construction, civil engineering, oil & gas procurement, beauty/cosmetics, and vocational skills.",
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Tenders Alpha',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tenders Alpha',
    description: "Nigeria's trusted construction, engineering & procurement company.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${montserrat.variable}`}>
      <body className="font-sans antialiased">
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              style: {
                background: '#042656',
              },
            },
            error: {
              style: {
                background: '#ac1f23',
              },
            },
          }}
        />
      </body>
    </html>
  );
}
