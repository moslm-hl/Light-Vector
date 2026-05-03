import type { Metadata } from 'next'
import { DM_Serif_Display, Outfit, DM_Mono } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'

const dmSerifDisplay = DM_Serif_Display({
  weight: ['400'],
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-dm-serif',
})

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
})

const dmMono = DM_Mono({
  weight: ['400', '500'],
  subsets: ['latin'],
  variable: '--font-dm-mono',
})

export const metadata: Metadata = {
  title: 'Light Vector',
  description: "Apprenez l'économie en simulant",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={`${dmSerifDisplay.variable} ${outfit.variable} ${dmMono.variable}`}>
      <body className="font-sans bg-[var(--color-background-tertiary)] text-[var(--color-text-primary)] antialiased">
        <Navbar />
        <main className="max-w-[900px] mx-auto px-6 py-8">
          {children}
        </main>
      </body>
    </html>
  )
}
