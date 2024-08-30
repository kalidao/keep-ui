import { Metadata } from 'next'
import { Inter } from 'next/font/google'

import RootProvider from '@/components/root-provider'
import { siteConfig } from '@/lib/site-config'

import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  )
}
