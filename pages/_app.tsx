import type { AppContext, AppProps } from 'next/app'
import { useEffect } from 'react'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { DynamicContextProvider } from '@dynamic-labs/sdk-react'
import { DynamicWagmiConnector } from '@dynamic-labs/wagmi-connector'
import { useRouter } from 'next/router'
import { ThemeProvider } from '@kalidao/reality'
import { useThemeStore } from '~/hooks/useThemeStore'
import '@design/global.css'
import '@kalidao/reality/styles'
import '@design/app.css'

import { Inter } from '@next/font/google'
import { Bodoni_Moda } from '@next/font/google'
import App from 'next/app'
import { Mode } from '@kalidao/reality/dist/types/tokens'

export const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
export const bodoni = Bodoni_Moda({ subsets: ['latin'], variable: '--font-bodoni' })

const queryClient = new QueryClient()

function MyApp({ Component, pageProps, theme }: AppProps & { theme: Mode }) {
  const setMode = useThemeStore((state) => state.setMode)
  const router = useRouter()

  useEffect(() => {
    setMode(theme)
  }, [theme])

  return (
    <ThemeProvider defaultMode={theme} defaultAccent="indigo">
      <QueryClientProvider client={queryClient}>
        <DynamicContextProvider
          settings={{
            environmentId: process.env.NEXT_PUBLIC_DYNAMIC_ID ?? '',
            multiWallet: true,
            onAuthSuccess: (args) => {
              if (router.pathname === '/' || router.pathname === '/login') {
                router.push('/dashboard')
              }
            },
          }}
          theme={theme}
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

MyApp.getInitialProps = async (appContext: AppContext) => {
  // Stuff you want to do BEFORE loading props from the individual page

  const appProps = await App.getInitialProps(appContext)

  // Stuff you want to do AFTER loading props from the individual page
  const themeCookie = appContext?.ctx?.req?.headers?.cookie
    ?.split(';')
    .find((c) => c.trim().startsWith('mode='))
    ?.split('=')[1]
  console.log('themeCookie', themeCookie)
  console.log('appProps', appProps)
  return { ...appProps, theme: themeCookie ?? 'light' }
}

export default MyApp
