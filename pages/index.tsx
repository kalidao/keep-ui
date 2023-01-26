import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { Stack, Button, Box } from '@kalidao/reality'
import * as styles from '@design/landing.css'
import Head from 'next/head'
import Footer from '~/layout/Footer'
import { link, layout, header, container } from '~/layout/layout.css'
import Link from 'next/link'
import Balencer from 'react-wrap-balancer'
import { ConnectButton } from '~/components/ConnectButton'
import { Menu } from '@design/Menu'
import { Castle } from '~/canvas/Castle'
import { Fade, Slide } from 'react-awesome-reveal'
import { bodoni } from './_app'
import { useDynamicContext } from '@dynamic-labs/sdk-react'

const Home: NextPage = () => {
  const { user } = useDynamicContext()
  const router = useRouter()

  if (user) {
    // redirect to dashboard
    router.push('/dashboard')
  }
  /*
  const features = [
    {
      header: 'Create roles, multisigs and DAOs based on ERC1155 tokens',
      headerLink: 'https://github.com/kalidao/keep#empowering-collectives',
      styledFeature: 'Multicellular organizing.',
      image: '/features/kConnected.png',
      link: 'https://github.com/kalidao/keep#empowering-collectives',
    },

    {
      header: 'Drop NFTs to gamify participation and record achievements',
      headerLink: 'https://github.com/kalidao/keep#empowering-collectives',
      styledFeature: 'Automagick incentives.',
      image: '/features/kBuilding.png',
      link: 'https://github.com/kalidao/keep#keep-cooperative',
    },

    {
      header: 'Access to the biggest DAO law library and tools',
      headerLink: 'https://github.com/kalidao/keep#empowering-collectives',
      styledFeature: 'Smart legal.',
      image: '/features/kLegal.png',
      link: 'https://github.com/kalidao/keep#keep-company',
    },
  ]
  */
  return (
    <Box className={layout}>
      <Head>
        <title>Keep - Home</title>
        <meta name="description" content={'This is the homepage of Keep.'} />
      </Head>
      <Box className={header}>
        <Stack direction={'horizontal'}>
          <ConnectButton />
          <Menu />
        </Stack>
      </Box>
      <Box className={container}>
        <Box className={styles.hero}>
          <Slide>
            <Stack align={'stretch'} justify="center">
              <Link href="https://github.com/kalidao/keep" className={styles.pill}>
                Learn more about Keep on our{' '}
                <span
                  style={{
                    fontWeight: 600,
                  }}
                >
                  GitHub <span aria-hidden="true">&rarr;</span>
                </span>
              </Link>
              <Balencer>
                <Box as="h1" style={bodoni.style} className={styles.heading}>
                  Keep.
                </Box>
              </Balencer>
              {/* marketing copy for no-code legally complian multisig + dao launcher */}
              <Balencer>
                <Box as="h2" style={bodoni.style} className={styles.subheading}>
                  Secure and govern digital assets.
                </Box>
              </Balencer>
              <Stack direction={'horizontal'}>
                <Link href="/create" legacyBehavior>
                  <Button as="a" variant="secondary">
                    Get Started
                  </Button>
                </Link>
              </Stack>
            </Stack>
          </Slide>
          <Castle />
        </Box>
      </Box>
      {/*}
      <Box className={styles.intro}>
        <Fade>
          <Box as="p" style={bodoni.style} className={styles.introBlurb}>
            Everyone wants to be a part of something bigger that also works. Digital orgs — DAOs — show better ways to
            win together, where you truly own your contributions and can trust in code. Keep builds on the promise of
            DAOs by combining world-class contracts, legal automation and usability to make this technology more
            accessible. You can start with a wallet, assign roles, grow community governance and handle real world legal
            systems all from your Keep. Learn more by reading the{' '}
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
              <Stack
                direction={{
                  xs: 'vertical',
                }}
                align="flex-start"
              >
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
                <Link href={feature.headerLink} className={styles.pill}>
                  {feature.header}
                </Link>
              </Stack>

              {feature.image && (
                <Image src={feature.image} alt={`$ image`} width={800} height={500} className={styles.featureImage} />
              )}
            </Box>
          )
        })}
      </Box>
      */}
      <Footer />
    </Box>
  )
}

export default Home
