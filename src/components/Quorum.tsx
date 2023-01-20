import { ethers } from 'ethers'
import 'react-step-progress-bar/styles.css'
import { ProgressBar } from 'react-step-progress-bar'
import { Card, Divider, Heading, Stack, Stat, Tag, Text } from '@kalidao/reality'
import { Signer } from '~/dashboard/Signers'
import { useKeepStore } from '~/dashboard/useKeepStore'
import { fetcher } from '~/utils'
import { useQuery } from '@tanstack/react-query'
import { Key } from 'react'

type Sig = {
  signer: string
  v: string
  r: string
  s: string
}

const Quorum = () => {
  const state = useKeepStore((state) => state)
  const { data: tx } = useQuery(
    ['keep', state.txHash],
    () => fetcher(`${process.env.NEXT_PUBLIC_KEEP_API}/txs/${state.txHash}`),
    {
      enabled: !!state.txHash,
      refetchInterval: 1000,
    },
  )
  const { data: keep } = useQuery(['keep', state.chainId, state.address], async () => {
    const result = await fetcher(`${process.env.NEXT_PUBLIC_KEEP_API}/keeps/${state.chainId}/${state.address}/`)
    return result
  })
  console.log('tx', tx)
  console.log('keep', keep)
  const quorum = keep ? ethers.utils.formatUnits(keep?.threshold, 0) : 0
  const percentage = tx && (tx.sigs.length / Number(quorum)) * 100

  return (
    <Card
      padding="6"
      width={{
        xs: 'full',
        lg: '1/4',
      }}
    >
      <Stack>
        <Stack direction={'horizontal'} align="center" justify={'space-between'}>
          <Heading>Status</Heading>
          <Tag size="medium" tone="green">
            Passing
          </Tag>
        </Stack>
        <Divider />
        {percentage == 100 && <Text>The quorum has been met. Ready to execute!</Text>}
        <ProgressBar percent={percentage} filledBackground="linear-gradient(to right, #fefb72, #f0bb31)"></ProgressBar>
        <Stack direction={'horizontal'} align="center" justify={'space-between'}>
          <Text>Yes</Text>
          <Text>{tx?.sigs?.length}</Text>
        </Stack>
        <Divider />
        <Heading>
          Signed by {tx?.sigs?.length} of {quorum}
        </Heading>
        {tx?.sigs?.length > 0 && <Divider />}
        {tx?.sigs?.map((sig: Sig) => (
          <Signer key={sig.signer} signer={sig.signer} />
        ))}
      </Stack>
    </Card>
  )
}

export default Quorum
