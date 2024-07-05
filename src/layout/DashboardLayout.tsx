import { useEffect } from 'react'

import Head from 'next/head'
import { useRouter } from 'next/router'

import { Box, Divider } from '@kalidao/reality'
import { Profile } from '~/dashboard'
import { useKeepStore } from '~/dashboard/useKeepStore'
import { useGetKeep } from '~/hooks/useGetKeep'

import Footer from './DashboardFooter'
import { Navigation } from './Navigation'
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
  const { data } = useGetKeep(Number(chainId), keep as string)

  const heading = title + data ? ((' ' + data?.name) as string) + ' ' : '' + '- Keep'

  useEffect(() => {
    if (chainId && state.chainId !== parseInt(chainId as string)) {
      state.setChainId(parseInt(chainId as string))
    }
  }, [state, chainId])

  useEffect(() => {
    if (keep && state.address !== keep) {
      state.setAddress(keep as `0xstring`)
    }
  }, [state, keep])

  console.log('useGetKeep', data)

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
      <Navigation />
      <Box className={styles.container}>
        <Profile
          summoned={data?.createdAt}
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
      <Box className={styles.rightbar}>
        <Box width="full" display="flex" flexDirection={'column'} gap="1">
          {sidebar}
        </Box>
        <Footer />
      </Box>
    </Box>
  )
}

export default DashboardLayout
