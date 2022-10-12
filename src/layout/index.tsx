import { Box } from '@kalidao/reality'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import Head from 'next/head'
import { layout, header, container } from './layout.css'

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
      <Box className={header}>
        <ConnectButton />
      </Box>
      <Box className={container}>{children}</Box>
    </Box>
  )
}

export default Layout
