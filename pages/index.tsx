import type { NextPage } from 'next'
import Image from 'next/image'
import { Stack, Button, Box } from '@kalidao/reality'
import * as styles from '@design/landing.css'
import Head from 'next/head'
import Footer from '~/layout/Footer'
import { layout, header, container } from '~/layout/layout.css'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { fetcher } from '~/utils'
import Balencer from 'react-wrap-balancer'
import { ConnectButton } from '~/components/ConnectButton'
import { Menu } from '@design/Menu'
import { Castle } from '~/canvas/Castle'

const Home: NextPage = () => {
  const {} = useQuery(['allKeeps'], () => fetcher(`${process.env.NEXT_PUBLIC_KEEP_API}/keeps/all`))

  const features = [
    {
      title: 'Keep moving.',
      description: 'Group decisions at the speed of code.',
      styledFeature: 'Backed by DAO & Multisig.',
      image: '/features/kConnected.png',
      link: 'https://github.com/kalidao/keep#empowering-collectives',
    },

    {
      title: 'Keep building.',
      description: 'Projects that automatically reward contributors.',
      styledFeature: 'Automagick incentives.',
      image: '/features/kBuilding.png',
      link: 'https://github.com/kalidao/keep#keep-cooperative',
    },

    {
      title: 'Keep company.',
      description: 'Legal that connects to the internet.',
      styledFeature: 'Robot lawyering.',
      image: '/features/kLegal.png',
      link: 'https://github.com/kalidao/keep#keep-company',
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
          <ConnectButton />
          <Menu />
        </Stack>
      </Box>

      <Box className={container}>
        <Box className={styles.hero}>
          <Box>
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
          <Castle />
        </Box>
      </Box>
      <Box className={styles.features}>
        {features.map((feature, i) => {
          return (
            <Box key={i} className={i % 2 == 0 ? styles.feature : styles.featureReverse}>
              <Stack align="flex-start">
                <Box className={styles.featureTitle}>{feature.title}</Box>
                <Box className={styles.featureDescription}>{feature.description}</Box>
                <Box as="a" href={feature.link} className={styles.featureStyled}>{feature.styledFeature}</Box>
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
