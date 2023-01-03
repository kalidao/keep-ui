import React from 'react'
import type { NextPage } from 'next'
import { Stack, Button, Box, IconGrid } from '@kalidao/reality'
import Head from 'next/head'
import { layout, header } from '~/layout/layout.css'
import Link from 'next/link'
import Create from '~/create'
import { Splash } from '~/create/Splash'
import { ConnectButton } from '~/components/ConnectButton'

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
            <Button shape="circle" size="small" variant="secondary">
              <IconGrid />
            </Button>
          </Link>
          <ConnectButton />
        </Stack>
      </Box>
      <Box>
        <Splash />
        <Create />
      </Box>
    </Box>
  )
}

export default Home
