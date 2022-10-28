import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { Stack, Card, Heading, Text, Input } from '@kalidao/reality'
import { useState } from 'react'
import { useQuery } from 'wagmi'
import { fetcher } from '~/utils'
import { ethers } from 'ethers'

type Props = {
  setValue: React.Dispatch<React.SetStateAction<string>>
  setView: React.Dispatch<React.SetStateAction<string>>
  setData: React.Dispatch<React.SetStateAction<string>>
  setOp: React.Dispatch<React.SetStateAction<number>>
}

export const TransferNative = ({ setView, setValue, setOp, setData }: Props) => {
  const [amount, setAmount] = useState<string>('')

  const router = useRouter()
  const { chainId, keep } = router.query
  const { data: treasury, error: treasuryError } = useQuery(['keep', 'treasury', 'native', chainId, keep], async () =>
    fetcher(`http://localhost:3000/keeps/${chainId}/${keep}/treasury`),
  )
  const max = treasury ? parseInt(ethers.utils.formatEther(treasury?.native?.balance)) : 0
  console.log('treasury', ethers.utils.parseEther(treasury ? treasury.native.balance : '0'))

  useEffect(() => {
    setValue(amount)
    setData(ethers.constants.HashZero)
  }, [amount, setValue])

  return (
    <Card level={'1'} padding={'6'} width={'full'}>
      <Stack direction={'vertical'}>
        <Heading level={'2'}>Transfer Native Token</Heading>
        <Text>Your current balance is: {treasury && ethers.utils.formatEther(treasury.native.balance)} ETH/MATIC.</Text>
        <Input
          label={'Amount'}
          type="number"
          max={max}
          placeholder={'0x0000000000000000000000000000000000000000'}
          onChange={(e) => setAmount(e.currentTarget.value)}
        />
      </Stack>
    </Card>
  )
}
