import { useEffect } from 'react'

import type { AppContext, AppProps } from 'next/app'
import { useRouter } from 'next/router'

import { DynamicContextProvider } from '@dynamic-labs/sdk-react'
import { DynamicWagmiConnector } from '@dynamic-labs/wagmi-connector'
import { ThemeProvider } from '@kalidao/reality'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Provider as AnkrProvider } from 'ankr-react'
import { useThemeStore } from '~/hooks/useThemeStore'

import '@design/global.css'
import '@kalidao/reality/styles'
import '@design/app.css'

import App from 'next/app'
import Head from 'next/head'

import { Mode } from '@kalidao/reality/dist/types/tokens'
import { Inter } from '@next/font/google'
import { Bodoni_Moda } from '@next/font/google'
import { Toaster } from 'react-hot-toast'
import { useIsMounted } from '~/hooks/useIsMounted'

export const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
export const bodoni = Bodoni_Moda({ subsets: ['latin'], variable: '--font-bodoni' })

const queryClient = new QueryClient()

function MyApp({ Component, pageProps, theme }: AppProps & { theme: Mode }) {
  const setMode = useThemeStore((state) => state.setMode)

  useEffect(() => {
    setMode(theme)
  }, [theme, setMode])

  return (
    <ThemeProvider defaultMode={theme || "light"} defaultAccent="indigo">
      <AnkrProvider>
        <QueryClientProvider client={queryClient}>
          <DynamicContextProvider
            settings={{
              environmentId: process.env.NEXT_PUBLIC_DYNAMIC_ID ?? '',
              multiWallet: true,
            }}
            theme={theme}
          >
            <DynamicWagmiConnector>
              <Head>
                <meta
                  name="viewport"
                  content="width=device-width, minimum-scale=1, initial-scale=1, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
                />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
              </Head>
              <main className={inter.className}>
                <Toaster />
                <Component {...pageProps} />
              </main>
            </DynamicWagmiConnector>
          </DynamicContextProvider>
        </QueryClientProvider>
      </AnkrProvider>
    </ThemeProvider>
  )
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext)

  const themeCookie = appContext?.ctx?.req?.headers?.cookie
    ?.split(';')
    .find((c) => c.trim().startsWith('mode='))
    ?.split('=')[1]

  return { ...appProps, theme: themeCookie ?? 'light' }
}

export default MyApp
