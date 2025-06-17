
import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import AdUnit from '@/components/ads/ad-unit';

export const metadata: Metadata = {
  metadataBase: new URL('https://flickfetch.pages.dev'),
  title: 'FlickFetch - Find Your Movies',
  description: 'Search, discover, and get details for your favorite movies.',
  openGraph: {
    title: 'FlickFetch - Find Your Movies',
    description: 'Search, discover, and get details for your favorite movies.',
    url: 'https://flickfetch.pages.dev',
    siteName: 'FlickFetch',
    images: [
      {
        url: 'https://flickfetch.pages.dev/og-image.png', // Example, ensure you have this image in /public
        width: 1200,
        height: 630,
        alt: 'FlickFetch - Movie Discovery',
      },
    ],
    locale: 'en_US',
    type: 'website',
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
  twitter: { 
    card: 'summary_large_image',
    title: 'FlickFetch - Find Your Movies',
    description: 'Search, discover, and get details for your favorite movies.',
    // images: ['https://flickfetch.pages.dev/twitter-image.png'], // Example
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta name="google-site-verification" content="2pxjTV45j7AirwFXd2ZZDXarXGt1nZMGPG5vAkRNCjI" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased min-h-screen flex flex-col bg-background text-foreground">
        <Header />
        <AdUnit /> {/* Site-wide ad unit below header */}
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
