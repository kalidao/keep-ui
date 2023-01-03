import Head from 'next/head'
import Footer from './Footer'
import ToggleMode from './ToggleMode'
import { layout, container, dashboardHeader } from './layout.css'
import { Box, Button, IconGrid, Stack } from '@kalidao/reality'
import Link from 'next/link'
import Image from 'next/image'
import { ConnectButton } from '~/components/ConnectButton'

type Props = {
  title: string
  content: string
  children: React.ReactNode
}

const Layout = ({ title, content, children }: Props) => {
  const heading = title + '- Keep'

  return (
    <Box className={layout}>
      <Head>
        <title>{heading}</title>
        <meta name="description" content={content} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box className={dashboardHeader}>
        <Link href="/">
          <Image alt="brand logo and back button" src="/favicon-32x32.png" height="25" width="25" />
        </Link>
        <Stack direction={'horizontal'}>
          <ToggleMode />
          <Link href="/explore">
            <Button shape="circle" size="small" variant="secondary">
              <IconGrid />
            </Button>
          </Link>
          <ConnectButton />
        </Stack>
      </Box>
      <Box className={container}>{children}</Box>
      <Footer />
    </Box>
  )
}

export default Layout
