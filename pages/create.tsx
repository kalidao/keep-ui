import React, { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import { Stack, Button, Box, IconGrid } from '@kalidao/reality'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import Head from 'next/head'
import Footer from '~/layout/Footer'
import { layout, header, container, splashContainer, dashboardHeader } from '~/layout/layout.css'
import Link from 'next/link'
import Create from '~/create'
import Image from 'next/image'
import { Splash } from '~/create/Splash'

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
        <Splash />
        <Create />
      </Box>
    </Box>
  )
}

export default Home
