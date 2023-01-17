import React from 'react'
import type { NextPage } from 'next'
import { Stack, Box } from '@kalidao/reality'
import Head from 'next/head'
import { layout, header } from '~/layout/layout.css'
import Create from '~/create'
import { ConnectButton } from '~/components/ConnectButton'
import { Menu } from '@design/Menu'

const Home: NextPage = () => {
  return (
    <Box className={layout} position={'relative'}>
      <Head>
        <title>Keep - Home</title>
        <meta name="description" content={'This is the homepage of Keep.'} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box className={header}>
        <Stack direction={'horizontal'}>
          <ConnectButton />
          <Menu />
        </Stack>
      </Box>
      <Create />
    </Box>
  )
}

export default Home
