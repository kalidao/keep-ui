import Head from 'next/head'

import { Box, Button, IconLightningBolt, IconUserGroupSolid } from '@kalidao/reality'

import Banner from '~/components/Banner'
import { UserMenu } from '~/components/UserMenu'

import { Navigation } from './Navigation'
import * as styles from './layout.css'

type Props = {
  title: string
  content: string
  children: React.ReactNode
}

const Layout = ({ title, content, children }: Props) => {
  const heading = title + '- Keep'

  return (
    <Box className={styles.layout} lang="en">
      <Head>
        <title>{heading}</title>
        <meta name="description" content={content} />
        <meta name="robots" content="noindex" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Banner label="We are only on mainnet and polygon. Switch chain to interact!" />
      <Navigation />
      <Box className={styles.container}>{children}</Box>
      <Box className={styles.rightbar}></Box>
    </Box>
  )
}

export default Layout
