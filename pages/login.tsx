import React from 'react'

import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { useDynamicContext } from '@dynamic-labs/sdk-react'
import { Box, Stack } from '@kalidao/reality'
import { header, layout } from '~/layout/layout.css'
import { Login } from '~/login'

import { Menu } from '@design/Menu'

const Home: NextPage = () => {
  const { user } = useDynamicContext()
  const router = useRouter()

  if (user) {
    router.push('/dashboard')
  }
  return (
    <Box className={layout} position={'relative'}>
      <Head>
        <title>Keep - Home</title>
        <meta name="description" content={'This is the homepage of Keep.'} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box className={header}>
        <Stack direction={'horizontal'}>
          <Menu />
        </Stack>
      </Box>
      <Login />
    </Box>
  )
}

export default Home
