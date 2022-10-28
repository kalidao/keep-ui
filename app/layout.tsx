// app/layout.tsx
import { Bitter } from '@next/font/google'

// If loading a variable font, you don't need to specify the font weight
const bitter = Bitter()

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={bitter.className}>
      <body>{children}</body>
    </html>
  )
}
