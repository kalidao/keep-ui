import { Metadata } from 'next'

import RootProvider from '@/components/root-provider'
import { mono, sans } from '@/lib/fonts'
import { siteConfig } from '@/lib/site-config'

import './globals.css'

import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={cn(sans.className, mono.className)}>
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  )
}
