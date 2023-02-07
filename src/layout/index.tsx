import Head from 'next/head'

import { Box, Button, IconLightningBolt, IconUserGroupSolid } from '@kalidao/reality'

import Banner from '~/components/Banner'
import { UserMenu } from '~/components/UserMenu'

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
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Banner label="We are only on mainnet and polygon. Switch chain to interact!" />
      <Box className={styles.leftbar}>
        <Box display="flex" flexDirection={'column'} paddingTop="10" gap="10">
          <Box display="flex" flexDirection={'column'} gap="2">
            <Button variant="transparent" prefix={<IconLightningBolt />} as="a" href="/dashboard">
              Activity
            </Button>
            <Button variant="transparent" prefix={<IconUserGroupSolid />} as="a" href={`/dashboard/communities`}>
              Communities
            </Button>
          </Box>
        </Box>
        <UserMenu />
      </Box>
      <Box className={styles.container}>{children}</Box>
      <Box className={styles.rightbar}></Box>
    </Box>
  )
}

export default Layout
