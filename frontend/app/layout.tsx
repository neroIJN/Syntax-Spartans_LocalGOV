import type { Metadata } from 'next'
import { Inter, Roboto } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-roboto',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NODE_ENV === 'production' ? 'https://localgov.gov.lk' : 'http://localhost:3001'),
  title: {
    default: 'LocalGov | Sri Lankan Government Services',
    template: '%s | LocalGov'
  },
  description: 'LocalGov - Centralized appointment booking system for Sri Lankan government services including Grama Niladhari and Divisional Secretariat services.',
  keywords: [
    'LocalGov',
    'Sri Lanka',
    'Government Services',
    'Appointment Booking',
    'Grama Niladhari',
    'Divisional Secretariat',
    'e-Services',
    'Digital Government'
  ],
  authors: [{ name: 'LocalGov Development Team' }],
  creator: 'LocalGov',
  publisher: 'Government of Sri Lanka',
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'LocalGov Sri Lanka',
    title: 'LocalGov | Sri Lankan Government Services',
    description: 'LocalGov - Centralized appointment booking system for Sri Lankan government services',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'LocalGov Sri Lanka',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LocalGov | Sri Lankan Government Services',
    description: 'LocalGov - Centralized appointment booking system for Sri Lankan government services',
    images: ['/og-image.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${roboto.variable} scroll-smooth`}>
      <body className="min-h-screen bg-neutral-50 antialiased transition-smooth">
        <div id="root" className="min-h-screen flex flex-col scroll-container">
          {children}
        </div>
      </body>
    </html>
  )
}