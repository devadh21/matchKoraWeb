import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'matchKora - FIFA World Cup 2026',
    icons: {
    icon: "/icon.png",
  },
  description:
    'Follow all 104 matches of the FIFA World Cup 2026 tournament across 16 stadiums in United States, Canada, and Mexico.',
  openGraph: {
    title: 'matchKora - FIFA World Cup 2026',
    description:
      'Follow all 104 matches of the FIFA World Cup 2026 tournament across 16 stadiums in United States, Canada, and Mexico.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-darkly text-whitely min-h-screen flex flex-col`}>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
