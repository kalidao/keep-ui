import type { AppProps } from 'next/app'
import '@rainbow-me/rainbowkit/styles.css'
import React, { useRef, useState, useMemo, useEffect } from 'react'
import merge from 'lodash.merge'
import {
  AuthenticationStatus,
  createAuthenticationAdapter,
  RainbowKitAuthenticationProvider,
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
  Theme,
} from '@rainbow-me/rainbowkit'
import { SiweMessage } from 'siwe'
import { chain, configureChains, createClient, useAccount, WagmiConfig } from 'wagmi'
import { infuraProvider } from 'wagmi/providers/infura'
import { publicProvider } from 'wagmi/providers/public'
import { ThemeProvider } from '@kalidao/reality'
import '@kalidao/reality/styles'
import '@design/app.css'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const { chains, provider } = configureChains(
  [chain.goerli, chain.mainnet, chain.polygon],
  [
    infuraProvider({ apiKey: process.env.NEXT_PUBLIC_INFURA_ID }),
    jsonRpcProvider({
      rpc: (chain) => {
        if (chain.id !== 5) return null
        return { http: process.env.NEXT_PUBLIC_QUICKNODE_HTTP!, webSocket: process.env.NEXT_PUBLIC_QUICKNODE }
      },
    }),
    publicProvider(),
  ],
)

const { connectors } = getDefaultWallets({
  appName: 'Keep',
  chains,
})

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
})

const queryClient = new QueryClient()

const theme = merge(darkTheme(), {
  blurs: {
    modalOverlay: 'blur(10px)',
  },
  colors: {
    accentColor: 'rgba(76, 29, 149, 0.66)',
    modalBackground: 'rgba(0, 0, 0, 0.66)',
    profileAction: 'rgba(76, 29, 149, 1)',
    profileActionHover: 'rgba(76, 29, 149, 0.66)',
    connectButtonBackground: '#000',
  },
} as Theme)

function MyApp({ Component, pageProps }: AppProps) {
  const fetchingStatusRef = useRef(false)
  const verifyingRef = useRef(false)
  const [status, setStatus] = useState<AuthenticationStatus>('loading')

  useEffect(() => {
    const fetchStatus = async () => {
      if (fetchingStatusRef.current || verifyingRef.current) return
      fetchingStatusRef.current = true
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_KEEP_API}/auth/user`, {
          method: 'GET',
          credentials: 'include',
        }).then((res) => res.json())
        setStatus(res ? 'authenticated' : 'unauthenticated')
      } catch (e) {
        setStatus('unauthenticated')
      } finally {
        fetchingStatusRef.current = false
      }
    }
    // 1. page loads
    fetchStatus()

    // 2. window is focused (in case user logs out of another window)
    window.addEventListener('focus', fetchStatus)
    return () => window.removeEventListener('focus', fetchStatus)
  }, [])

  const adapter = useMemo(
    () =>
      createAuthenticationAdapter({
        getNonce: async () => {
          const response = await fetch(`${process.env.NEXT_PUBLIC_KEEP_API}/auth/nonce`, {
            method: 'GET',
            credentials: 'include',
          })
          return await response.text()
        },
        createMessage: ({ nonce, address, chainId }) => {
          return new SiweMessage({
            domain: window.location.host,
            address,
            statement:
              'Keep wants you to sign in with your Ethereum account. You agree to our Terms of Service and Privacy Policy by doing this.',
            uri: window.location.origin,
            version: '1',
            chainId,
            nonce,
          })
        },
        getMessageBody: ({ message }) => {
          return message.prepareMessage()
        },
        verify: async ({ message, signature }) => {
          verifyingRef.current = true

          try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_KEEP_API}/auth/verify`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ message, signature }),
              credentials: 'include',
            })

            console.log('res', res)
            const authenticated = Boolean(res.ok)

            setStatus(authenticated ? 'authenticated' : 'unauthenticated')

            return authenticated
          } catch (error) {
            return false
          } finally {
            verifyingRef.current = false
          }
        },
        signOut: async () => {
          const res = await fetch(`${process.env.NEXT_PUBLIC_KEEP_API}/auth/logout`, {
            method: 'DELETE',
            credentials: 'include',
          })
          console.log('res', res)
          if (res) {
            setStatus(Boolean(res.ok) ? 'unauthenticated' : 'authenticated')
          }
        },
      }),
    [],
  )

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitAuthenticationProvider adapter={adapter} enabled={true} status={status}>
        <RainbowKitProvider chains={chains} theme={theme}>
          <ThemeProvider defaultMode="dark">
            <QueryClientProvider client={queryClient}>
              <Component {...pageProps} />
            </QueryClientProvider>
          </ThemeProvider>
        </RainbowKitProvider>
      </RainbowKitAuthenticationProvider>
    </WagmiConfig>
  )
}

export default MyApp
