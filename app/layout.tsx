import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import AnimatedBackground from '@/components/AnimatedBackground'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Combat Vault — Premium MMA Gear',
  description: 'Fight-grade MMA equipment engineered for champions.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-body">
        <AnimatedBackground />
        <Navbar />
        <main className="pt-24">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
