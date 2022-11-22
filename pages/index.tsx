import type { NextPage } from 'next'
import { Stack, Button, Box, IconGrid, Text, Heading } from '@kalidao/reality'
import { heading, subheading, hero } from '@design/landing.css'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import Head from 'next/head'
import Footer from '~/layout/Footer'
import { layout, header, container } from '~/layout/layout.css'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { fetcher } from '~/utils'
import { KeepCard } from './explore'

const Home: NextPage = () => {
  const { data: keeps, error } = useQuery(['allKeeps'], () => fetcher(`${process.env.NEXT_PUBLIC_KEEP_API}/keeps/all`))

  return (
    <Box className={layout}>
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
          <ConnectButton label="login" chainStatus="icon" showBalance={false} accountStatus="avatar" />
        </Stack>
      </Box>
      <Box className={container}>
        <Box className={hero}>
          <Box>
            <h1 className={heading}>C</h1>
            <h1 className={heading}>r</h1>
            <h1 className={heading}>e</h1>
            <h1 className={heading}>a</h1>
            <h1 className={heading}>t</h1>
            <h1 className={heading}>e</h1>
            <h1 className={heading}>. </h1>
            <h1 className={heading}>K</h1>
            <h1 className={heading}>e</h1>
            <h1 className={heading}>e</h1>
            <h1 className={heading}>p</h1>
            <h1 className={heading}>. </h1>
            <h1 className={heading}>N</h1>
            <h1 className={heading}>o</h1>
            <h1 className={heading}>w</h1>
            <h1 className={heading}>.</h1>
          </Box>
          {/* marketing copy for no-code legally complian multisig + dao launcher */}
          <Box>
            <h2 className={subheading}>Create a legally compliant on-chain company in seconds.</h2>
          </Box>
          <Link href="/create">
            <Button as="a" variant="secondary">
              Get Started
            </Button>
          </Link>
        </Box>
      </Box>
      <Box>
        <Stack direction={'horizontal'} align="center" justify={'space-between'}>
          <Heading>Recently Created</Heading>
          <Link href="/explore">
            <Button tone="accent" as="a">
              Explore
            </Button>
          </Link>
        </Stack>
        <Stack direction={'horizontal'} wrap>
          {keeps &&
            keeps?.slice(0, 3).map((keep: any) => {
              return (
                <KeepCard
                  key={keep?.address}
                  name={keep?.name}
                  avatar={keep?.avatar}
                  chainId={keep?.chainId}
                  keep={keep?.address}
                  bio={keep?.bio}
                />
              )
            })}
        </Stack>
      </Box>
      <Footer />
    </Box>
  )
}

export default Home
