'use client'

import { FC, PropsWithChildren } from 'react'

import '@rainbow-me/rainbowkit/styles.css'

import { siteConfig } from '@/lib/site-config'
import { RainbowKitProvider, getDefaultConfig } from '@rainbow-me/rainbowkit'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'sonner'
import { WagmiProvider } from 'wagmi'
import { arbitrum, base, mainnet, optimism, polygon } from 'wagmi/chains'

if (!process.env.NEXT_PUBLIC_WC_ID) {
  throw new Error('NEXT_PUBLIC_WC_ID is required')
}

const queryClient = new QueryClient()

const config = getDefaultConfig({
  appName: siteConfig.title,
  projectId: process.env.NEXT_PUBLIC_WC_ID,
  chains: [mainnet, polygon, optimism, arbitrum, base],
  ssr: true, // If your dApp uses server side rendering (SSR)
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
