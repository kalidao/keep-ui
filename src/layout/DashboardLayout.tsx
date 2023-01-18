import { useRouter } from 'next/router'
import Link from 'next/link'
import { Box, Stack } from '@kalidao/reality'
import Head from 'next/head'
import { layout, dashboardHeader, container } from './layout.css'
import { useQuery } from '@tanstack/react-query'
import { fetcher } from '~/utils'
import Footer from './Footer'
import { Signers, Profile, Wrappr, Treasury } from '~/dashboard'
import { ConnectButton } from '~/components/ConnectButton'
import { Menu } from '@design/Menu'

type Props = {
  title: string
  content: string
  children: React.ReactNode
}

const DashboardLayout = ({ title, content, children }: Props) => {
  const router = useRouter()
  const { chainId, keep } = router.query
  const { data } = useQuery(['keep', chainId, keep], async () =>
    fetcher(`${process.env.NEXT_PUBLIC_KEEP_API}/keeps/${chainId}/${keep}/`),
  )
  const heading = title + data ? ((' ' + data?.name) as string) + ' ' : '' + '- Keep'
  const { data: treasury } = useQuery(['keep', 'treasury', chainId, keep], async () =>
    fetcher(`${process.env.NEXT_PUBLIC_KEEP_API}/keeps/${chainId}/${keep}/treasury`),
  )

  console.log('treasury', treasury)

  return (
    <Box className={layout} lang="en">
      <Head>
        <title>{heading}</title>
        {/* add og tags */}
        <meta name="og:title" content={heading} />
        <meta name="og:description" content={content} />
        <meta name="og:image" content={'https://keep.kali.gg/api/og?title=' + heading} />
        <meta name="og:url" content={'https://keep.kali.gg/keeps/' + chainId + '/' + keep} />
        <meta name="og:type" content="website" />
        <meta name="og:site_name" content="Keep" />
        <meta name="og:locale" content="en_US" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@kalidao" />
        <meta name="twitter:creator" content="@kalidao" />
        <meta name="twitter:title" content={heading} />
        <meta name="twitter:description" content={content} />
        <meta name="twitter:image" content={'https://keep.kali.gg/api/og?title=' + heading} />
        <meta name="twitter:url" content={'https://keep.kali.gg/keeps/' + chainId + '/' + keep} />
        <meta name="twitter:label1" content="Created" />
        <meta name="twitter:data1" content={data?.created_at} />
        <meta name="twitter:label2" content="Signers" />
        <meta name="twitter:data2" content={data?.signers.length} />
        <meta name="twitter:label3" content="Treasury" />
        <meta name="twitter:data3" content={treasury?.items.length} />
        <meta name="twitter:label4" content="NFTs" />
        <meta name="twitter:data4" content={treasury?.nft.length} />
        <meta name="twitter:label5" content="Native" />
        <meta
          name="twitter:data5"
          content={treasury?.items.filter((item: any) => item.native_token == true)[0]?.amount}
        />
        <meta name="twitter:label7" content="Website" />
        <meta name="twitter:data7" content={data?.website_url} />
        <meta name="twitter:label9" content="Discord" />
        <meta name="twitter:data9" content={data?.discord_url} />
        <meta name="twitter:label10" content="Address" />
        <meta name="twitter:data10" content={data?.address} />
        <meta name="twitter:label11" content="Description" />
        <meta name="twitter:data11" content={data?.description} />
        <meta name="description" content={content} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box className={dashboardHeader} as="header">
        <Link href="/" passHref legacyBehavior>
          <Box fontSize="headingTwo" as="a">
            🏯
          </Box>
          {/* <Image alt="brand-logo and back button" src="/favicon-32x32.png" height="25" width="25" /> */}
        </Link>
        <Stack direction={'horizontal'}>
          <ConnectButton />
          <Menu />
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
            <Treasury
              native={treasury?.items.filter((item: any) => item.native_token == true)[0]}
              nfts={treasury?.nft ?? []}
              tokens={treasury?.items.filter((item: any) => item.native_token == false)}
              synced={treasury?.updated_at}
            />
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
