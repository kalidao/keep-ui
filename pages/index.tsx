import type { NextPage } from 'next'
import { Stack, Button, Box, Text, IconGrid } from '@kalidao/reality'
import { heading, subheading } from '@design/landing.css'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import Head from 'next/head'
import Footer from '~/layout/Footer'
import { layout, header, container } from '~/layout/layout.css'
import Link from 'next/link'

const Home: NextPage = () => {
  return (
    <Box className={layout} backgroundColor="black">
      <Head>
        <title>Keep - Home</title>
        <meta name="description" content={'This is the homepage of Keep.'} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box className={header}>
        <Stack direction={'horizontal'}>
          <Link href="/explore">
            <Button shape="circle" size="small" variant="secondary" as="a">
              <IconGrid />
            </Button>
          </Link>
          <ConnectButton />
        </Stack>
      </Box>
      <Box className={container}>
        <Box backgroundColor={'black'}>
          <h1 className={heading}>Keep</h1>
          <p className={subheading}>Company.</p>
          <Link href="/create">
            <Button tone="violet" as="a">
              Get Started
            </Button>
          </Link>
        </Box>
      </Box>
      <Footer />
    </Box>
  )
}

export default Home
