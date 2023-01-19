import { useRouter } from 'next/router'
import Link from 'next/link'
import { Box, Card, Stack, Text, Divider, Button, IconArrowRight, IconTwitter } from '@kalidao/reality'
import { useEffect } from 'react'
import * as styles from './create.css'
import { useCreateStore } from './useCreateStore'
import { useNetwork } from 'wagmi'
import { bodoni } from '../../pages/_app'
import { getExplorerLink } from '~/utils/getExplorerLink'

export const Success = () => {
  const state = useCreateStore((state) => state)
  const { chain } = useNetwork()
  const router = useRouter()

  useEffect(() => {
    if (!chain) return

    // const timer = setTimeout(() => {
    //   router.push(`/${chain?.id}/${state.address}`)
    // }, 30000)
    // return () => clearTimeout(timer)
  })

  const messages = [
    {
      emoji: '🏯',
      message: 'Enter your Keep.',
      url: `/${state.chainId}/${state.address}`,
    },
    {
      emoji: '📖',
      message: 'Read the Docs.',
      url: `https://github/kalidao/keep/README.md`,
      isExternal: true,
    },
    {
      emoji: '🌐',
      message: 'Join the Community.',
      url: `https://discord.com/invite/kpMs4gzSyV`,
      isExternal: true,
    },
    {
      emoji: '💸',
      message: 'Sending funds from your Keep.',
      url: `https://discord.com/invite/kpMs4gzSyV`,
      isExternal: true,
    },
    {
      emoji: '🗝',
      message: 'Managing signers on your Keep.',
      url: `https://discord.com/invite/kpMs4gzSyV`,
      isExternal: true,
    },
    {
      emoji: '🗳',
      message: 'Adding a DAO to your Keep.',
      url: `https://discord.com/invite/kpMs4gzSyV`,
      isExternal: true,
    },
  ]

  return (
    <Box className={styles.shell}>
      <Stack direction={'horizontal'} align={'center'} justify="center">
        <Stack>
          <Box
            fontSize="headingOne"
            textAlign={'center'}
            color="text"
            style={{
              ...bodoni.style,
              fontStyle: 'italic',
            }}
          >
            Success
          </Box>
          <Divider />
          <Box className={styles.form}>
            <Card padding="6" width="full" backgroundColor={'backgroundTertiary'} borderRadius="large">
              <Text>
                Your Keep is now enshrined on the{' '}
                <a href={getExplorerLink(state.txHash, 'tx', state.chainId)} target="_blank" rel="noopener noreferrer">
                  blockchain
                </a>
                . You may manage it by visiting the dashboard.
              </Text>
            </Card>
            <Box className={styles.successGrid}>
              {messages.map((message, index) => (
                <Message key={index} {...message} />
              ))}
            </Box>

            <Divider />
            <Button
              as="a"
              href={`https://twitter.com/intent/tweet?text=I%20just%20created%20${state.name}%20on%20Keep.%20Check%20it%20out%20at%20https%3A%2F%2Fkeep.kali.gg%2F${state.chainId}%2F${state.address}&hashtags=KeepSummoning&via=kali__gg`}
              target="_blank"
              rel="noopener noreferrer"
              prefix={<IconTwitter />}
              variant="transparent"
            >
              Share on Twitter
            </Button>
          </Box>
        </Stack>
      </Stack>
    </Box>
  )
}

const Message = ({
  emoji,
  message,
  url,
  isExternal,
}: {
  emoji: string
  message: string
  url: string
  isExternal?: boolean
}) => {
  return (
    <Link
      href={url}
      target={isExternal ? '_blank' : 'self'}
      rel={isExternal ? 'noopenner noreferrer' : ''}
      className={styles.successMessage}
    >
      <Stack direction={'horizontal'} align="center" justify={'flex-start'}>
        {/* <IconArrowRight color="foreground" /> */}
        <Text>{emoji}</Text>
        <Text>{message}</Text>
      </Stack>
    </Link>
  )
}
