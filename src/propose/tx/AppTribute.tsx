import { Box, Button, Checkbox, Text, Stack } from '@kalidao/reality'
import { ethers } from 'ethers'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useContractRead } from 'wagmi'
import { KEEP_ABI, TRIBUTE_ROUTER_ADDRESS } from '~/constants'
import { createPayload } from '../createPayload'
import { useTxStore } from './useTxStore'

export const AppTribute = () => {
  // check balance of mint key on tribute contract to see if its active or not
  const isActive = false

  const setData = useTxStore((state) => state.setData)
  const setTo = useTxStore((state) => state.setTo)
  const setOp = useTxStore((state) => state.setOp)
  const setValue = useTxStore((state) => state.setValue)
  const router = useRouter()
  const address = router.query.keep as `0xstring`

  useEffect(() => {
    if (!isActive) {
      setOp(0)
      setValue('0')
      setTo(address)

      const payload = createPayload('add_tribute', {})

      console.log('payload', payload)

      setData(payload as `0xstring`)
    }

    if (isActive) {
    }
  }, [isActive])

  if (isActive) {
    return <Text>This will remove the Tribute app from your Keep.</Text>
  }

  return (
    <Text>
      This will add the Tribute app to your Keep. Tribute allows others to request your Keep for tokens with a gift.
    </Text>
  )
}
