'use client'

import { FC, PropsWithChildren } from 'react'

import '@rainbow-me/rainbowkit/styles.css'

import { siteConfig } from '@/lib/site-config'
import { RainbowKitProvider, getDefaultConfig } from '@rainbow-me/rainbowkit'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'sonner'
import { WagmiProvider, fallback, http, unstable_connector } from 'wagmi'
import { arbitrum, base, mainnet, optimism, polygon } from 'wagmi/chains'
import { injected } from 'wagmi/connectors'

if (!process.env.NEXT_PUBLIC_WC_ID) {
  throw new Error('NEXT_PUBLIC_WC_ID is required')
}

const queryClient = new QueryClient()

const config = getDefaultConfig({
  appName: siteConfig.title,
  projectId: process.env.NEXT_PUBLIC_WC_ID,
  chains: [mainnet, polygon, optimism, arbitrum, base],
  ssr: true, // If your dApp uses server side rendering (SSR)
  transports: {
    [mainnet.id]: fallback([unstable_connector(injected), http()]),
    [polygon.id]: fallback([unstable_connector(injected), http()]),
    [optimism.id]: fallback([unstable_connector(injected), http()]),
    [arbitrum.id]: fallback([unstable_connector(injected), http()]),
    [base.id]: fallback([unstable_connector(injected), http()]),
  },
})

const RootProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          {children}
          <Toaster />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}

export default RootProvider
