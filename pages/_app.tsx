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

const { provider } = configureChains(
  [mainnet, polygon],
  [
    infuraProvider({ apiKey: process.env.NEXT_PUBLIC_INFURA_ID ?? '' }),
    jsonRpcProvider({
      rpc: (chain) => {
        if (chain.id !== 5) return null
        return { http: process.env.NEXT_PUBLIC_QUICKNODE_HTTP!, webSocket: process.env.NEXT_PUBLIC_QUICKNODE }
      },
    }),
    publicProvider(),
  ],
)

const wagmiClient = createClient({
  autoConnect: true,
  provider: provider,
})

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppProps) {
  const mode = useThemeStore((state) => state.mode)

  return (
    <ThemeProvider defaultMode={mode} defaultAccent="indigo">
      <QueryClientProvider client={queryClient}>
        <WagmiConfig client={wagmiClient}>
          <DynamicContextProvider
            settings={{
              appLogoUrl: '/kali-logo.png',
              appName: 'Keep',
              environmentId: process.env.NEXT_PUBLIC_DYNAMIC_ID ?? '',
              multiWallet: true,
              privacyPolicyUrl: '/privacy',
              termsOfServiceUrl: '/tos',
              onAuthSuccess: async ({ authToken, user }) => {
                console.log('auth success', authToken, user)
                await fetch(`${process.env.NEXT_PUBLIC_KEEP_API ?? 'https://api.kali.gg'}/auth/user`, {
                  headers: {
                    Authorization: `Bearer ${authToken}`,
                  },
                })
                  .then((response) => response.json())
                  .then((data) => console.log('verified', data))
              },
            }}
          >
            <Component {...pageProps} />
          </DynamicContextProvider>
        </WagmiConfig>
      </QueryClientProvider>
    </ThemeProvider>
  )
}

export default MyApp
