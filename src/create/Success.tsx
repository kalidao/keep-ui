import { useRouter } from 'next/router'
import { Box, Card, Stack, Text, Divider, Button, IconArrowRight } from '@kalidao/reality'
import { useEffect } from 'react'
import * as styles from './create.css'
import { useCreateStore } from './useCreateStore'
import { useNetwork } from 'wagmi'
import { bodoni } from '../../pages/_app'
import { Splash } from './Splash'

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
      message: 'View your Keep.',
    },
    {
      emoji: '🏯',
      message: 'View your Keep.',
    },
  ]

  return (
    <Box className={styles.shell}>
      <Stack direction={'horizontal'} align={'center'} justify="center">
        <Stack>
          <Stack direction={'horizontal'} align="center">
            <Box fontSize="headingOne">✨</Box>
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
          </Stack>
          <Divider />
          <Box className={styles.form}>
            <Card padding="6" width="full" backgroundColor={'backgroundTertiary'} borderRadius="large">
              <Text>Your Keep has been created. You can view it on the blockchain explorer.</Text>
            </Card>
            {messages.map((message, index) => (
              <Message key={index} {...message} />
            ))}
            <Button
              onClick={
                // share to twitter
                () => {
                  // add image to tweet (https://twitter.com/intent/tweet?text=I%20just%20created%20${state.name}%20on%20Keep%20🏯.%20Check%20it%20out%20at%20https%3A%2F%2Fkeep.kali.gg%2F${state.chainId}%2F${state.address})
                  const url = `https://twitter.com/intent/tweet?text=I%20just%20created%20${state.name}%20on%20Keep%20🏯.%20Check%20it%20out%20at%20https%3A%2F%2Fkeep.kali.gg%2F${state.chainId}%2F${state.address}&?image=${state.avatar}`

                  window.open(url, '_blank', 'noopener,noreferrer')
                }
              }
            >
              Share on Twitter
            </Button>
          </Box>
        </Stack>
      </Stack>
    </Box>
  )
}

const Message = ({ emoji, message }: { emoji: string; message: string }) => {
  return (
    <Stack direction={'horizontal'} align="center" justify={'center'}>
      <IconArrowRight color="foreground" />
      {/* <Text>🏯</Text> */}
      <Text>View your Keep.</Text>
    </Stack>
  )
}
