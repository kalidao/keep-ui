import { Card, Stack, Heading, Text, Button, IconArrowRight, IconLightningBolt } from '@kalidao/reality'
import { useContractRead, useContractWrite, useNetwork, usePrepareContractWrite, useEnsName } from 'wagmi'
import Back from './Back'
import { CreateProps } from './types'
import { ethers } from 'ethers'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const KEEP_FACTORY = require('~/constants/abis/KeepFactory.json')

export const Confirm = ({ store, setStore, setView }: CreateProps) => {
  const router = useRouter()
  const { chain } = useNetwork()
  const { data: name } = useContractRead({
    addressOrName: '0x843D08081A10b408bAe2cf21b5dB61F1cF297028',
    contractInterface: KEEP_FACTORY,
    functionName: 'deployKeep',
  })
  const signers = store.signers.map((signer) => signer.address).sort((a, b) => +a - +b)
  console.log('values', ethers.utils.formatBytes32String(store.name), signers, [], store.threshold)
  const { config, error } = usePrepareContractWrite({
    addressOrName: '0x843D08081A10b408bAe2cf21b5dB61F1cF297028',
    contractInterface: KEEP_FACTORY,
    functionName: 'deployKeep',
    args: [ethers.utils.formatBytes32String(store.name), [], signers, store.threshold],
  })
  const { write, isError, isLoading, isSuccess, data } = useContractWrite({
    ...config,
    onSuccess(data) {
      data.wait(1)
    },
  })

  useEffect(() => {}, [])

  return (
    <Stack>
      <Back to={2} setView={setView} />
      <Card padding="5" borderRadius={'medium'} shadow>
        <Stack direction={'horizontal'} align="center" justify={'space-between'}>
          <Text size="large">Name</Text>
          <Text size="large" weight={'bold'}>
            {store.name}
          </Text>
        </Stack>
      </Card>
      <Card padding="5" borderRadius={'medium'} shadow>
        <Stack direction={'horizontal'} align="center" justify={'space-between'}>
          <Text size="large">Threshold</Text>
          <Text size="large" weight={'bold'}>
            {store.threshold}/{store.signers.length}
          </Text>
        </Stack>
      </Card>
      <Stack align={'center'}>
        <Text size="extraLarge">Signers</Text>
        {signers.map((signer) => (
          <Signer key={signer} address={signer} />
        ))}
      </Stack>
      <Button width="full" suffix={<IconLightningBolt />} disabled={!write} onClick={() => write?.()}>
        Summon
      </Button>
    </Stack>
  )
}

const Signer = ({ address }: { address: string }) => {
  const { data, isError, isLoading } = useEnsName({
    address: address,
    chainId: 1,
  })
  console.log('ens', data, isError, isLoading)
  return (
    <Card padding="5" borderRadius={'medium'} shadow>
      <Text weight="bold">{data ? data : address}</Text>
    </Card>
  )
}
