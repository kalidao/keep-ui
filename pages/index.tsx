import type { NextPage } from 'next'
import Image from 'next/image'
import { Stack, Button, Box, IconGrid } from '@kalidao/reality'
import * as styles from '@design/landing.css'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import Head from 'next/head'
import Footer from '~/layout/Footer'
import { layout, header, container } from '~/layout/layout.css'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { fetcher } from '~/utils'
import Balencer from 'react-wrap-balancer'

const Home: NextPage = () => {
  const {} = useQuery(['allKeeps'], () => fetcher(`${process.env.NEXT_PUBLIC_KEEP_API}/keeps/all`))

  const features = [
    {
      title: 'Keep governing.',
      description: 'Make group decisions at the speed of code through a novel multisig and DAO design.',
      image: '/features/governance.png',
    },

    {
      title: 'Keep building.',
      description:
        'Create branded working groups that can divide and conquer using reputation and other credentials that demonstrate commitment.',
      image: '/features/building.png',
    },

    {
      title: 'Keep legal.',
      description:
        'Form internet-native companies to shield contributors with limited liability, digitize physical assets, and tap a deep bench of aligned lawyers.',
      image: '/features/legal.png',
    },
    {
      title: 'Keep earning.',
      description:
        'Continuously grow your operating capital with thoughtful defi yield strategies that can stream to contributors and reward productivity without paperwork or bank blockers.',
      image: '/features/governance.png',
    },
    {
      title: 'Keep imagining.',
      description:
        'Start small or with an existing community on a flexible codebase that enables easy course correction over what matters most — connecting the dots with people.',
      image: '/features/governance.png',
    },
  ]

  return (
    <Box className={layout}>
      <Head>
        <title>Keep - Home</title>
        <meta name="description" content={'This is the homepage of Keep.'} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box className={header}>
        <Stack direction={'horizontal'}>
          <Link href="/explore" legacyBehavior>
            <Button shape="circle" size="small" variant="secondary" as="a">
              <IconGrid />
            </Button>
          </Link>
          <ConnectButton label="login" chainStatus="icon" showBalance={false} />
        </Stack>
      </Box>
      <Box className={container}>
        <Box className={styles.hero}>
          <Box display="flex" flexDirection={'column'}>
            <Balencer>
              <Box as="h1" className={styles.heading}>
                Keep
              </Box>
            </Balencer>
            {/* marketing copy for no-code legally complian multisig + dao launcher */}
            <Balencer>
              <Box as="h2" className={styles.subheading}>
                Better organizing with cryptography.
              </Box>
            </Balencer>
          </Box>
          <Stack direction={'horizontal'}>
            <Link href="/create" legacyBehavior>
              <Button as="a" variant="secondary">
                Get Started
              </Button>
            </Link>
            <Link href="/explore" legacyBehavior>
              <Button as="a" variant="transparent">
                Explore
              </Button>
            </Link>
          </Stack>
        </Box>
      </Box>
      <Box className={styles.features}>
        {features.map((feature, i) => {
          return (
            <Box key={i} className={i % 2 == 0 ? styles.feature : styles.featureReverse}>
              <Stack align="flex-start">
                <Box className={styles.featureTitle}>{feature.title}</Box>
                <Box className={styles.featureDescription}>{feature.description}</Box>
              </Stack>
              {feature.image && (
                <Image
                  src={feature.image}
                  alt={`${feature.title} image`}
                  width={800}
                  height={500}
                  className={styles.featureImage}
                />
              )}
            </Box>
          )
        })}
      </Box>
      {/* 
        Features - 

        1. Keep governing.

          Make group decisions at the speed of code through a novel multisig and cellular DAO design.

          - The cellular DAO design means that the governance of the company can be split into many smaller groups that can govern their own areas of the company.

        2. Keep building.

          Create branded working groups that can divide and conquer using reputation and other branded credentials that demonstrate commitment. 

        3. Keep legal.

          Form internet-native companies to shield contributors with limited liability, digitize physical assets, and tap a deep bench of aligned lawyers.

        4. Keep earning.

          Continuously grow your operating capital with thoughtful defi yield strategies that can stream to contributors and reward productivity without paperwork or bank blockers.

        5. Keep imagining.

          Start small or with an existing community on a flexible codebase that enables easy course correction over what matters most — connecting the dots with people.
       */}

      <Footer />
    </Box>
  )
}

export default Home
