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

export const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
export const bodoni = Bodoni_Moda({ subsets: ['latin'], variable: '--font-bodoni' })

const queryClient = new QueryClient()

function MyApp({ Component, pageProps, theme }: AppProps & { theme: Mode }) {
  const setMode = useThemeStore((state) => state.setMode)
  const router = useRouter()

  useEffect(() => {
    setMode(theme)
  }, [theme, setMode])

  return (
    <ThemeProvider defaultMode={theme} defaultAccent="indigo">
      <AnkrProvider>
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
              <Head>
                <meta
                  name="viewport"
                  content="width=device-width, minimum-scale=1, initial-scale=1, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
                />
                <meta name="application-name" content="PWA App" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-status-bar-style" content="default" />
                <meta name="apple-mobile-web-app-title" content="PWA App" />
                <meta name="description" content="Keep" />
                <meta name="format-detection" content="telephone=no" />
                <meta name="mobile-web-app-capable" content="yes" />
                <meta name="msapplication-config" content="/icons/browserconfig.xml" />
                <meta name="msapplication-TileColor" content="#2B5797" />
                <meta name="msapplication-tap-highlight" content="no" />
                <meta name="theme-color" content="#000000" />

                <link rel="apple-touch-icon" href="/icons/touch-icon-iphone.png" />
                <link rel="apple-touch-icon" sizes="152x152" href="/icons/touch-icon-ipad.png" />
                <link rel="apple-touch-icon" sizes="180x180" href="/icons/touch-icon-iphone-retina.png" />
                <link rel="apple-touch-icon" sizes="167x167" href="/icons/touch-icon-ipad-retina.png" />

                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                <link rel="manifest" href="/manifest.json" />
                <link rel="mask-icon" href="/icons/safari-pinned-tab.svg" color="#5bbad5" />
                <link rel="shortcut icon" href="/favicon.ico" />

                <meta name="twitter:card" content="summary" />
                <meta name="twitter:url" content="https://twitter.com/kali__gg" />
                <meta name="twitter:title" content="Keep" />
                <meta name="twitter:description" content="" />
                <meta name="twitter:image" content="https://yourdomain.com/icons/android-chrome-192x192.png" />
                <meta name="twitter:creator" content="@kali__gg" />

                <link rel="apple-touch-startup-image" href="/images/apple_splash_2048.png" sizes="2048x2732" />
                <link rel="apple-touch-startup-image" href="/images/apple_splash_1668.png" sizes="1668x2224" />
                <link rel="apple-touch-startup-image" href="/images/apple_splash_1536.png" sizes="1536x2048" />
                <link rel="apple-touch-startup-image" href="/images/apple_splash_1125.png" sizes="1125x2436" />
                <link rel="apple-touch-startup-image" href="/images/apple_splash_1242.png" sizes="1242x2208" />
                <link rel="apple-touch-startup-image" href="/images/apple_splash_750.png" sizes="750x1334" />
                <link rel="apple-touch-startup-image" href="/images/apple_splash_640.png" sizes="640x1136" />
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
