import { Box, Heading } from '@kalidao/reality'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { layout, dashboardHeader, container } from './layout.css'

type Props = {
  title: string
  content: string
  children: React.ReactNode
}

const DashboardLayout = ({ title, content, children }: Props) => {
  const router = useRouter()
  const { name } = router.query
  const heading = title + name ? ((' ' + name) as string) + ' ' : '' + '- Keep'

  return (
    <Box className={layout}>
      <Head>
        <title>{heading}</title>
        <meta name="description" content={content} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box className={dashboardHeader}>
        <Heading>{name ? name : ''}</Heading>
        <ConnectButton />
      </Box>
      <Box className={container}>{children}</Box>
    </Box>
  )
}

export default DashboardLayout
