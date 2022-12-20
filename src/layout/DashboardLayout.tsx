import { useRouter } from 'next/router'
import Link from 'next/link'
import { Box, Button, Text, IconGrid, Stack } from '@kalidao/reality'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import Head from 'next/head'
import { layout, dashboardHeader, container } from './layout.css'
import { useQuery } from '@tanstack/react-query'
import { fetcher } from '~/utils'
import Footer from './Footer'
import ToggleMode from './ToggleMode'
import { Signers, Profile, Wrappr, Treasury } from '~/dashboard'

type Props = {
  title: string
  content: string
  children: React.ReactNode
}

const DashboardLayout = ({ title, content, children }: Props) => {
  const router = useRouter()
  const { chainId, keep } = router.query
  const { data, error } = useQuery(['keep', chainId, keep], async () =>
    fetcher(`${process.env.NEXT_PUBLIC_KEEP_API}/keeps/${chainId}/${keep}/`),
  )
  const heading = title + data ? ((' ' + data?.name) as string) + ' ' : '' + '- Keep'
  const { data: treasury, error: treasuryError } = useQuery(['keep', 'treasury', chainId, keep], async () =>
    fetcher(`${process.env.NEXT_PUBLIC_KEEP_API}/keeps/${chainId}/${keep}/treasury`),
  )

  return (
    <Box className={layout}>
      <Head>
        <title>{heading}</title>
        <meta name="description" content={content} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box className={dashboardHeader} as="header">
        <Link href="/" passHref>
          <Box fontSize="headingTwo" as="a">
            🏯
          </Box>
          {/* <Image alt="brand-logo and back button" src="/favicon-32x32.png" height="25" width="25" /> */}
        </Link>
        <Stack direction={'horizontal'}>
          <ToggleMode />
          <Link href="/explore">
            <Button shape="circle" size="small" variant="secondary" as="a">
              <IconGrid />
            </Button>
          </Link>
          <ConnectButton label="login" chainStatus="icon" showBalance={false} />
        </Stack>
      </Box>
      <Box className={container}>
        <Stack>
          <Stack direction={'horizontal'} justify="space-between">
            <Profile
              name={data?.name}
              avatar={data?.avatar}
              address={data?.address}
              bio={data?.bio}
              website={data?.website_url}
              twitter={data?.twitter_url}
              discord={data?.discord_url}
            />
            <Treasury native={treasury?.native} nfts={treasury?.nft} tokens={treasury?.tokens} />
            <Wrappr />
            <Signers signers={data?.signers} />
          </Stack>
          {children}
        </Stack>
      </Box>
      <Footer />
    </Box>
  )
}

export default DashboardLayout
