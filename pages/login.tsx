import React from 'react'

import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { useDynamicContext } from '@dynamic-labs/sdk-react'
import { Box } from '@kalidao/reality'
import { layout } from '~/layout/layout.css'
import { Login } from '~/login'

const Home: NextPage = () => {
  const { isAuthenticated } = useDynamicContext()
  const router = useRouter()
  const { redirect } = router.query

  if (isAuthenticated) {
    router.push(redirect ? (redirect as string) : '/dashboard')
  }

  return (
    <Box className={layout} position={'relative'}>
      <Head>
        <title>Keep - Home</title>
        <meta name="description" content={'This is the homepage of Keep.'} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Login />
    </Box>
  )
}

export default Home
