import { useRouter } from 'next/router'
import { Card, Heading } from '@kalidao/reality'
import { useState } from 'react'
import { useQuery } from 'wagmi'
import { fetcher } from '~/utils'

type Props = {
  setView: React.Dispatch<React.SetStateAction<string>>
  setData: React.Dispatch<React.SetStateAction<string>>
  setOp: React.Dispatch<React.SetStateAction<number>>
}

export const TransferERC20 = ({ setView, setOp, setData }: Props) => {
  const router = useRouter()
  const { chainId, keep } = router.query
  const { data: treasury, error: treasuryError } = useQuery(['keep', 'treasury', chainId, keep], async () =>
    fetcher(`http://localhost:3000/keeps/${chainId}/${keep}/treasury`),
  )
  console.log('treasury', treasury.tokens)
  return (
    <Card level={'2'} padding={'6'} width={'full'}>
      <Heading level={'2'}></Heading>
    </Card>
  )
}
