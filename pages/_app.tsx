import type { AppProps } from 'next/app'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { DynamicContextProvider } from '@dynamic-labs/sdk-react'
import { DynamicWagmiConnector } from '@dynamic-labs/wagmi-connector'

import { ThemeProvider } from '@kalidao/reality'
import { useThemeStore } from '~/hooks/useThemeStore'
import '@design/global.css'
import '@kalidao/reality/styles'
import '@design/app.css'

import { Inter } from '@next/font/google'
import { Bodoni_Moda } from '@next/font/google'

export const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
export const bodoni = Bodoni_Moda({ subsets: ['latin'], variable: '--font-bodoni' })

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppProps) {
  const mode = useThemeStore((state) => state.mode)

  console.log('mode', mode)

  return (
    <ThemeProvider defaultMode={mode} defaultAccent="indigo">
      <QueryClientProvider client={queryClient}>
        <DynamicContextProvider
          settings={{
            environmentId: process.env.NEXT_PUBLIC_DYNAMIC_ID ?? '',
            multiWallet: true,
          }}
          theme={mode === 'dark' ? 'dark' : 'light'}
        >
          <DynamicWagmiConnector>
            <main className={inter.className}>
              <Component {...pageProps} />
            </main>
          </DynamicWagmiConnector>
        </DynamicContextProvider>
      </QueryClientProvider>
    </ThemeProvider>
  )
}

export default MyApp
