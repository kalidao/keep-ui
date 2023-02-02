import { useEffect } from 'react'

import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'

import { useDynamicContext } from '@dynamic-labs/sdk-react'
import { Box, Button, Divider, IconUserGroupSolid, IconWallet, Stack, Text } from '@kalidao/reality'
import { useQuery } from '@tanstack/react-query'
import { bodoni } from 'pages/_app'
import { Profile, Signers, Treasury } from '~/dashboard'
import { useKeepStore } from '~/dashboard/useKeepStore'
import { fetcher } from '~/utils'

import { ConnectButton } from '~/components/ConnectButton'
import { User } from '~/components/User'

import { Menu } from '@design/Menu'

import Layout from '.'
import * as styles from './layout.css'

type Props = {
  title: string
  content: string
  sidebar: React.ReactNode
  children: React.ReactNode
}

const DashboardLayout = ({ title, content, sidebar, children }: Props) => {
  const router = useRouter()
  const { chainId, keep } = router.query
  const state = useKeepStore((state) => state)

  const { data } = useQuery(['keep', chainId, keep], async () => {
    const res = await fetcher(`${process.env.NEXT_PUBLIC_KEEP_API}/keeps/${chainId}/${keep}/`)
    state.setThreshold(res?.threshold)
    state.setSigners(res?.signers)
    return res
  })
  const heading = title + data ? ((' ' + data?.name) as string) + ' ' : '' + '- Keep'

  const { user } = useDynamicContext()

  useEffect(() => {
    if (chainId && state.chainId !== parseInt(chainId as string)) {
      state.setChainId(parseInt(chainId as string))
    }
  }, [chainId])

  useEffect(() => {
    if (keep && state.address !== keep) {
      state.setAddress(keep as `0xstring`)
    }
  }, [keep])

  return (
    <Box className={styles.layout} lang="en">
      <Head>
        <title>{heading}</title>
        {/* add og tags */}
        <meta property="og:title" content={heading} />
        <meta property="og:description" content={content} />
        <meta property="og:image" content={`https://keep.kali.gg/api/og?title=${data?.name}`} />
        <meta property="og:url" content={'https://keep.kali.gg/keeps/' + chainId + '/' + keep} />
        <meta property="og:site_name" content="Keep" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@kali__gg" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={content} />
        <meta name="twitter:image" content={`https://keep.kali.gg/api/og?title=${data?.name}`} />
        <meta name="twitter:url" content={'https://keep.kali.gg/keeps/' + chainId + '/' + keep} />
        <meta name="description" content={content} />

        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box className={styles.leftbar}>
        <Box display="flex" flexDirection={'column'} paddingTop="10" gap="10">
          <Box display="flex" flexDirection={'column'} gap="2">
            <Button variant="transparent" prefix={<IconWallet />} as="a" href={`/dashboard`}>
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
            {user ? <User address={user.walletPublicKey as string} size="lg" /> : <ConnectButton />}
          </Box>
          <Menu />
        </Box>
      </Box>
      <Box className={styles.container}>
        <Profile
          name={data?.name}
          avatar={data?.avatar}
          address={data?.address}
          bio={data?.bio}
          chainId={data?.chainId}
          website={data?.website_url}
          twitter={data?.twitter_url}
          discord={data?.discord_url}
        />
        <Divider />
        <Box className={styles.dashboardContainer}>{children}</Box>
      </Box>
      <Box className={styles.rightbar}>{sidebar}</Box>
    </Box>
  )
}

export default DashboardLayout
