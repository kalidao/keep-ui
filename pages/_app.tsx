import type { AppProps } from 'next/app'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { DynamicContextProvider } from '@dynamic-labs/sdk-react'
import { DynamicWagmiConnector } from '@dynamic-labs/wagmi-connector'

import '@fontsource/inter/400.css'
import '@fontsource/inter/variable-full.css'
import '@fontsource/bodoni-moda/variable-full.css'

import { ThemeProvider } from '@kalidao/reality'
import { useThemeStore } from '~/hooks/useThemeStore'
import '@design/global.css'
import '@kalidao/reality/styles'
import '@design/app.css'

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
            <Component {...pageProps} />
          </DynamicWagmiConnector>
        </DynamicContextProvider>
      </QueryClientProvider>
    </ThemeProvider>
  )
}

export default MyApp
