import type { AppProps } from 'next/app'
import { configureChains, createClient, WagmiConfig } from 'wagmi'
import { mainnet, polygon } from 'wagmi/chains'
import { infuraProvider } from 'wagmi/providers/infura'
import { publicProvider } from 'wagmi/providers/public'
import { ThemeProvider } from '@kalidao/reality'
import '@kalidao/reality/styles'
import '@design/app.css'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import '@fontsource/inter/400.css'
import '@fontsource/inter/variable-full.css'
import '@fontsource/bodoni-moda/variable-full.css'
import { DynamicContextProvider } from '@dynamic-labs/sdk-react'
import { DynamicWagmiConnector } from '@dynamic-labs/wagmi-connector'

import '@design/global.css'
import { useThemeStore } from '~/hooks/useThemeStore'

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppProps) {
  const mode = useThemeStore((state) => state.mode)

  return (
    <ThemeProvider defaultMode={mode} defaultAccent="indigo">
      <QueryClientProvider client={queryClient}>
        <DynamicContextProvider
          settings={{
            environmentId: process.env.NEXT_PUBLIC_DYNAMIC_ID ?? '',
            multiWallet: true,
          }}
          theme={mode}
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
