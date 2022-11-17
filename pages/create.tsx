import type { NextPage } from 'next'
import { Heading, Text, Stack, Button, Box, IconGrid } from '@kalidao/reality'
import { heading, subheading } from '@design/landing.css'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import Head from 'next/head'
import Footer from '~/layout/Footer'
import { layout, header, container, splashContainer, dashboardHeader } from '~/layout/layout.css'
import Link from 'next/link'
import Create from '~/create'
import Image from 'next/image'

const Home: NextPage = () => {
  return (
    <Box className={layout} backgroundColor="black" position={'relative'}>
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
      <Box>
        <Box className={splashContainer}>
          <Image src="/splash.webp" alt="splash" layout="fill" objectFit="cover" />
          {/* <h1 className={heading}>Keep</h1>
          <p className={subheading}>Company.</p> */}
        </Box>
        <Create />
      </Box>
      <Footer />
    </Box>
  )
}

export default Home
