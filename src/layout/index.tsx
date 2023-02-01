import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import { useDynamicContext } from '@dynamic-labs/sdk-react'
import { Box, Button, IconCheck, IconCog, IconUserGroupSolid, IconWallet, Stack, Text } from '@kalidao/reality'

import Banner from '~/components/Banner'
import { User } from '~/components/User'

import { Menu } from '@design/Menu'

import * as styles from './layout.css'

type Props = {
  title: string
  content: string
  children: React.ReactNode
}

const Layout = ({ title, content, children }: Props) => {
  const heading = title + '- Keep'
  const { user } = useDynamicContext()

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
            <Button variant="transparent" prefix={<IconWallet />} as="a" href="/dashboard">
              Home
            </Button>
            <Button variant="transparent" prefix={<IconUserGroupSolid />} as="a" href={`/dashboard/communities`}>
              Communities
            </Button>
            {/* <Button variant="secondary" tone="green" prefix={<IconCog />} as="a" href="/create">
              Create
            </Button> */}
          </Box>
        </Box>
        <Box display="flex" alignItems={'center'}>
          <Box backgroundColor={'backgroundSecondary'} padding="3" borderRadius={'4xLarge'}>
            <User address={user?.walletPublicKey} size="lg" />
          </Box>
          <Menu />
        </Box>
      </Box>
      <Box className={styles.container}>{children}</Box>
      <Box className={styles.rightbar}></Box>
    </Box>
  )
}

export default Layout
