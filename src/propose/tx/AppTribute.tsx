import { useEffect } from 'react'

import { useRouter } from 'next/router'

import { Stack, Text } from '@kalidao/reality'

import { createPayload } from '../createPayload'
import { useSendStore } from './useSendStore'

export const AppTribute = () => {
  // check balance of mint key on tribute contract to see if its active or not
  const isActive = false

  const setData = useSendStore((state) => state.setData)
  const setTo = useSendStore((state) => state.setTo)
  const setOp = useSendStore((state) => state.setOp)
  const setValue = useSendStore((state) => state.setValue)
  const router = useRouter()
  const address = router.query.keep as `0xstring`
  const chainId = parseInt(router.query.chainId as string)

  useEffect(() => {
    if (!isActive) {
      setOp(0)
      setValue('0')
      setTo(address)

      const descriptionUrl = `https://api.kali.gg/keeps/${chainId}/${address}/tribute`

      const payload = createPayload('add_tribute', {
        description: descriptionUrl,
      })

      setData(payload as `0xstring`)
    }

    if (isActive) {
    }
  }, [isActive, address, chainId, setData, setOp, setTo, setValue])

  if (isActive) {
    return <Text>This will remove the Tribute app from your Keep.</Text>
  }

  return (
    <Stack>
      <Text>
        This will add the Tribute app to your Keep. Tribute allows others to request your Keep tokens with a gift.
      </Text>
      <select>
        <option value="0">Select a token</option>
      </select>
    </Stack>
  )
}
