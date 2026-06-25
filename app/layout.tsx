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
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://tendersalpha.com'),
  title: {
    default: 'Tenders Alpha | Tender & Procurement Platform Nigeria',
    template: '%s | Tenders Alpha',
  },
  description:
    "Nigeria's #1 tender management and procurement platform. Submit tenders, manage bids, and streamline procurement for government, enterprises & NGOs. Founded 2009.",
  keywords: [
    'tender management system Nigeria',
    'procurement software Nigeria',
    'bid management platform Nigeria',
    'e-procurement system Africa',
    'tender portal Nigeria',
    'digital procurement solution Nigeria',
    'vendor management software Nigeria',
    'contract management Nigeria',
    'government procurement portal Nigeria',
    'online tender submission Nigeria',
    'Tenders Alpha',
    'building construction Nigeria',
    'civil engineering Lagos',
    'oil gas procurement Nigeria',
    'equipment supply Nigeria',
  ],
  authors: [{ name: 'Tenders Alpha Limited' }],
  creator: 'Tenders Alpha Limited',
  openGraph: {
    type: 'website',
    locale: 'en_NG',
    url: process.env.NEXT_PUBLIC_APP_URL || 'https://tendersalpha.com',
    siteName: 'Tenders Alpha',
    title: 'Tenders Alpha | Tender & Procurement Platform Nigeria',
    description:
      "Nigeria's #1 tender management and procurement platform. Submit tenders, manage bids, and streamline procurement for government, enterprises & NGOs across Africa.",
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Tenders Alpha — Nigeria Tender & Procurement Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tenders Alpha | Tender & Procurement Platform Nigeria',
    description: "Nigeria's trusted tender management, procurement & bid submission platform. Serving government, enterprises & NGOs across Africa.",
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
  // Favicon & app icons are served from app/icon.png and app/apple-icon.png
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
