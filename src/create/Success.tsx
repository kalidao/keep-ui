import { useRouter } from 'next/router'
import { Box, Stack, Heading, Divider } from '@kalidao/reality'
import { useEffect } from 'react'
import * as styles from './create.css'
import { useCreateStore } from './useCreateStore'
import { useNetwork } from 'wagmi'

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

  return (
    <Box className={styles.shell}>
      <Stack direction={'horizontal'}>
        <Stack>
          <Stack direction={'horizontal'} align={'flex-start'}>
            <Heading level="2">🎉</Heading>
            <Heading level="2">You have succcesfully deployed!</Heading>
          </Stack>
          <Divider />
          <Box className={styles.form}>
            <Stack direction={'horizontal'} align={'center'} justify={'space-between'}>
              <Heading level="3">You will be redirected to the dashboard in 30 seconds.</Heading>
            </Stack>
          </Box>
        </Stack>
      </Stack>
    </Box>
  )
}
