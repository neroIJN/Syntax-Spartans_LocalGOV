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
  title: {
    default: 'Officer Dashboard | e-Services',
    template: '%s | Officer Dashboard'
  },
  description: 'Government officer dashboard for managing citizen appointments and service delivery.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${roboto.variable}`}>
      <body className="min-h-screen bg-neutral-50 antialiased">
        <div id="root" className="min-h-screen flex flex-col">
          {children}
        </div>
      </body>
    </html>
  )
}
