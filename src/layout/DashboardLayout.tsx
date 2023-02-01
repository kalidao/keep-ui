import { useEffect } from 'react'

import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { Box, Stack } from '@kalidao/reality'
import { useQuery } from '@tanstack/react-query'
import { Profile, Signers, Treasury, Wrappr } from '~/dashboard'
import { useKeepStore } from '~/dashboard/useKeepStore'
import { fetcher } from '~/utils'

import { ConnectButton } from '~/components/ConnectButton'

import { Menu } from '@design/Menu'

import Layout from '.'
import Footer from './Footer'
import { container, dashboardContainer, dashboardHeader, layout } from './layout.css'

type Props = {
  title: string
  content: string
  children: React.ReactNode
}

const DashboardLayout = ({ title, content, children }: Props) => {
  const router = useRouter()
  const { chainId, keep } = router.query
  const state = useKeepStore((state) => state)
  const { data } = useQuery(['keep', chainId, keep], async () => {
    const res = await fetcher(`${process.env.NEXT_PUBLIC_KEEP_API}/keeps/${chainId}/${keep}/`)
    state.setThreshold(res?.threshold)
    return res
  })
  const heading = title + data ? ((' ' + data?.name) as string) + ' ' : '' + '- Keep'
  const { data: treasury } = useQuery(['keep', 'treasury', chainId, keep], async () => {
    return fetcher(`${process.env.NEXT_PUBLIC_KEEP_API}/keeps/${chainId}/${keep}/treasury`)
  })

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
    <Layout title={title} content={content}>
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
      <Box className={dashboardContainer}>
        <Box display="flex" width="full" gap="6">
          <Profile
            name={data?.name}
            avatar={data?.avatar}
            address={data?.address}
            bio={data?.bio}
            website={data?.website_url}
            twitter={data?.twitter_url}
            discord={data?.discord_url}
          />
          <Treasury tokens={treasury?.items} synced={treasury?.updated_at} />
          <Signers signers={data?.signers} />
        </Box>
        <Box width="full">{children}</Box>
      </Box>
    </Layout>
  )
}

export default DashboardLayout
