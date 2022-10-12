import { ConnectButton } from '@rainbow-me/rainbowkit'
import type { NextPage } from 'next'
import Head from 'next/head'
import { Heading, Text, Stack, Box } from '@kalidao/reality'
import Layout from '~/layout'
import Create from '~/create'

const Home: NextPage = () => {
  return (
    <Layout title={'Home'} content={'Create a Keep'}>
      <Create />
    </Layout>
  )
}

export default Home
