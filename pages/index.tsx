import type { NextPage } from 'next'
import Image from 'next/image'
import { Stack, Button, Box, IconGrid } from '@kalidao/reality'
import * as styles from '@design/landing.css'
import Head from 'next/head'
import Footer from '~/layout/Footer'
import { layout, header, container } from '~/layout/layout.css'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { fetcher } from '~/utils'
import Balencer from 'react-wrap-balancer'
import { ConnectButton } from '~/components/ConnectButton'

const Home: NextPage = () => {
  const {} = useQuery(['allKeeps'], () => fetcher(`${process.env.NEXT_PUBLIC_KEEP_API}/keeps/all`))

  const features = [
    {
      title: 'Keep connected.',
      description: 'Group decisions at the speed of code.',
      styledFeature: 'Backed by DAO & Multisig.',
      image: '/features/kConnected.png',
    },

    {
      title: 'Keep building.',
      description: 'Projects that automatically reward contributors.',
      styledFeature: 'Automagick incentives.',
      image: '/features/kBuilding.png',
    },

    {
      title: 'Keep legal.',
      description: 'Companies that connect to the internet.',
      styledFeature: 'Robot lawyering.',
      image: '/features/kLegal.png',
    },
  ]

  return (
    <Box className={layout} lang="en">
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
          <ConnectButton />
        </Stack>
      </Box>
      <Box className={container}>
        <Box className={styles.hero}>
          <Box display="flex" flexDirection={'column'}>
            <Balencer>
              <Box as="h1" className={styles.heading}>
                Keep.
              </Box>
            </Balencer>
            {/* marketing copy for no-code legally complian multisig + dao launcher */}
            <Balencer>
              <Box as="h2" className={styles.subheading}>
                Secure your digital assets.
              </Box>
              <Box as="h2" className={styles.subheading}>
                Grow a community.
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
                <Box className={styles.featureStyled}>{feature.styledFeature}</Box>
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
      <Footer />
    </Box>
  )
}

export default Home
