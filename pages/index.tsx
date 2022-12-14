import type { NextPage } from 'next'
import Image from 'next/image'
import { Stack, Button, Box } from '@kalidao/reality'
import * as styles from '@design/landing.css'
import Head from 'next/head'
import Footer from '~/layout/Footer'
import { link, layout, header, container } from '~/layout/layout.css'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { fetcher } from '~/utils'
import Balencer from 'react-wrap-balancer'
import { ConnectButton } from '~/components/ConnectButton'
import { Menu } from '@design/Menu'
import { Castle } from '~/canvas/Castle'
import { Fade, Slide } from 'react-awesome-reveal'
import { bodoni } from './_app'

const Home: NextPage = () => {
  const {} = useQuery(['allKeeps'], () => fetcher(`${process.env.NEXT_PUBLIC_KEEP_API}/keeps/all`))

  const features = [
    {
      title: 'moving',
      description: 'Group decisions at the speed of code.',
      styledFeature: 'Backed by DAO & Multisig.',
      image: '/features/kConnected.png',
      link: 'https://github.com/kalidao/keep#empowering-collectives',
    },

    {
      title: 'building',
      description: 'Projects that automatically reward contributors.',
      styledFeature: 'Automagick incentives.',
      image: '/features/kBuilding.png',
      link: 'https://github.com/kalidao/keep#keep-cooperative',
    },

    {
      title: 'company',
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
            <Stack>
              <Slide>
                <Balencer>
                  <Box as="h1" style={bodoni.style} className={styles.heading}>
                    Keep.
                  </Box>
                </Balencer>
                {/* marketing copy for no-code legally complian multisig + dao launcher */}
                <Balencer>
                  <Box as="h2" style={bodoni.style} className={styles.subheading}>
                    Secure and manage digital assets.
                  </Box>
                </Balencer>
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
              </Slide>
            </Stack>
          </Box>
          <Castle />
        </Box>
      </Box>
      <Box className={styles.intro}>
        <Fade>
          <Box as="h3" style={bodoni.style} className={styles.introHeading}>
            What is this?
          </Box>
          <Box as="p" style={bodoni.style} className={styles.introBlurb}>
            You may wonder how apps are owned. Corporations, contributors, users? Digital orgs ??? DAOs ??? show better ways
            to own together online. Where group power, such as finance, is handled by apps and code. Keep builds on this
            idea by using code and corporate tools where they really count. Start with a wallet, assign roles, add
            community governance and work with companies. Learn more by reading the{' '}
            <a href="https://docs.kali.gg/" className={link}>
              docs
            </a>
            .
          </Box>
        </Fade>
      </Box>
      <Box className={styles.features}>
        {features.map((feature, i) => {
          return (
            <Box key={i} className={i % 2 == 0 ? styles.feature : styles.featureReverse}>
              <Slide>
                <Stack align="flex-start">
                  <Box>
                    <Box
                      style={{
                        ...bodoni.style,
                      }}
                      className={styles.keep}
                    >
                      keep
                    </Box>
                    <Box
                      style={{
                        ...bodoni.style,
                      }}
                      className={styles.featureTitle}
                    >
                      {feature.title}
                    </Box>
                  </Box>
                  <Box
                    style={{
                      ...bodoni.style,
                    }}
                    className={styles.featureDescription}
                  >
                    {feature.description}
                  </Box>
                  <i>
                    <Box
                      as="a"
                      href={feature.link}
                      style={{
                        ...bodoni.style,
                        fontStyle: 'italic',
                      }}
                      className={styles.featureStyled}
                    >
                      {feature.styledFeature}
                    </Box>
                  </i>
                </Stack>
              </Slide>
              {feature.image && (
                <Slide direction="right">
                  <Image
                    src={feature.image}
                    alt={`${feature.title} image`}
                    width={800}
                    height={500}
                    className={styles.featureImage}
                  />
                </Slide>
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
