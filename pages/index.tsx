import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { useDynamicContext } from '@dynamic-labs/sdk-react'
import { Box, Button, Stack } from '@kalidao/reality'
import Balencer from 'react-wrap-balancer'
import { Castle } from '~/canvas/Castle'
import Footer from '~/layout/Footer'
import { header } from '~/layout/layout.css'

import Banner from '~/components/Banner'
import { ConnectButton } from '~/components/ConnectButton'

import { Menu } from '@design/Menu'
import * as styles from '@design/landing.css'

import { bodoni } from './_app'

const Home: NextPage = () => {
  const { user } = useDynamicContext()
  const router = useRouter()

  if (user) {
    // redirect to dashboard
    router.push('/dashboard')
  }

  return (
    <Box>
      <Banner label="We are only on mainnet and polygon. Switch chain to interact!" />
      <Head>
        <title>Keep - Home</title>
        <meta name="description" content={'This is the homepage of Keep.'} />
      </Head>

      <Box className={header}>
        <Stack direction={'horizontal'}>
          <ConnectButton />
          <Menu />
        </Stack>
      </Box>
      <Box className={styles.container}>
        <Box className={styles.hero}>
          <Stack align={'flex-start'} justify="stretch">
            <Link href="https://github.com/kalidao/keep" className={styles.pill}>
              Learn more about Keep on our{' '}
              <span
                style={{
                  fontWeight: 600,
                }}
              >
                GitHub <span aria-hidden="true">&rarr;</span>
              </span>
            </Link>
            <Balencer>
              <Box as="h1" style={bodoni.style} className={styles.heading}>
                Keep.
              </Box>
            </Balencer>
            <Balencer>
              <Box as="h2" style={bodoni.style} className={styles.subheading}>
                Secure and govern digital assets.
              </Box>
            </Balencer>
            <Link href="/create" legacyBehavior>
              <Button as="a" variant="secondary">
                Get Started
              </Button>
            </Link>
          </Stack>
          <Castle />
        </Box>
      </Box>
      <Footer />
    </Box>
  )
}

export default Home
