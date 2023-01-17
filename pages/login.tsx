import React from 'react'
import type { NextPage } from 'next'
import { Stack, Box } from '@kalidao/reality'
import Head from 'next/head'
import { layout, header } from '~/layout/layout.css'

import { Menu } from '@design/Menu'
import { Login } from '~/login'
import { useDynamicContext } from '@dynamic-labs/sdk-react'
import { useRouter } from 'next/router'

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
