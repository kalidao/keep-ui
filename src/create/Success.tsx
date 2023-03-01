import { useEffect } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/router'

import { Box, Button, Card, Divider, IconTwitter, Stack, Text } from '@kalidao/reality'
import { useNetwork } from 'wagmi'
import { discordUrl, docsUrl } from '~/constants/socials'
import { getExplorerLink } from '~/utils/getExplorerLink'

import { bodoni } from '../../pages/_app'
import * as styles from './create.css'
import { useCreateStore } from './useCreateStore'

export const Success = () => {
  const state = useCreateStore((state) => state)
  const { chain } = useNetwork()
  const router = useRouter()

  useEffect(() => {
    if (!chain) return

    const timer = setTimeout(() => {
      router.push(`/${chain?.id}/${state.address}`)
    }, 30000)
    return () => clearTimeout(timer)
  })

  const keepUrl = `/${state.chainId}/${state.address}`

  const messages = [
    {
      emoji: '🏯',
      message: 'Enter your Keep.',
      url: keepUrl,
    },
    {
      emoji: '📖',
      message: 'Read the Docs.',
      url: docsUrl,
      isExternal: true,
    },
    {
      emoji: '🌐',
      message: 'Join the Community.',
      url: discordUrl,
      isExternal: true,
    },
    {
      emoji: '💸',
      message: 'Sending funds from your Keep.',
      url: 'https://www.notion.so/keepdao/Send-and-Receive-Funds-b993ead69c6e4447ad6b793d8ace771a',
      isExternal: true,
    },
    {
      emoji: '🗝',
      message: 'Managing signers on your Keep.',
      url: 'https://www.notion.so/keepdao/Manage-Signers-0dd19ceb852a41d380ebdd706e266559',
      isExternal: true,
    },
    {
      emoji: '🗳',
      message: 'Adding a DAO to your Keep.',
      url: 'https://www.notion.so/keepdao/Add-DAOs-9c01d95b25fd428aaa5808282533d71e',
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
                . You may manage it by visiting the <Link href={keepUrl}>dashboard</Link>.
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
