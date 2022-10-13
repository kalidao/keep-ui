import { Card, Stack, Heading, Text, Button, IconArrowRight, IconLightningBolt, Box } from '@kalidao/reality'
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
  const { data: address, error: isDetermineError } = useContractRead({
    addressOrName: '0x843D08081A10b408bAe2cf21b5dB61F1cF297028',
    contractInterface: KEEP_FACTORY,
    functionName: 'determineKeep',
    chainId: chain ? chain.id : 5,
    args: [ethers.utils.formatBytes32String(store.name)],
  })

  // write
  const signers = store.signers.map((signer) => signer.address).sort((a, b) => +a - +b)
  const { config } = usePrepareContractWrite({
    addressOrName: '0x843D08081A10b408bAe2cf21b5dB61F1cF297028',
    contractInterface: KEEP_FACTORY,
    functionName: 'deployKeep',
    args: [ethers.utils.formatBytes32String(store.name), [], signers, store.threshold],
  })
  const {
    write,
    error: writeError,
    isError: isWriteError,
    isLoading,
    isSuccess,
    data,
  } = useContractWrite({
    ...config,
    onSuccess(data) {
      data.wait(1)
      if (chain) {
        router.push(`/${chain.id}/${store.name}`)
      }
    },
  })

  console.log('name', address, isDetermineError)

  return (
    <Stack>
      <Back to={2} setView={setView} />
      {address && (
        <Text>
          Your multisig will be deployed on {chain ? chain?.name + ' at' : ''} <Text variant="label">{address}</Text>
        </Text>
      )}
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
        {signers.map((signer, index) => (
          <Signer key={signer} index={index + 1} address={signer} />
        ))}
      </Stack>
      {isWriteError && <Text color="red">{writeError?.message}</Text>}
      <Button width="full" suffix={<IconLightningBolt />} disabled={!write} onClick={() => write?.()}>
        {isLoading ? 'Summoning' : 'Summon'}
      </Button>
    </Stack>
  )
}

const Signer = ({ index, address }: { index: number; address: string }) => {
  const { data, isError, isLoading } = useEnsName({
    address: address,
    chainId: 1,
  })
  console.log('ens', data, isError, isLoading)
  return (
    <Card padding="5" borderRadius={'medium'} width="full" shadow>
      <Text weight="bold">
        {index}. {data ? data : address}
      </Text>
    </Card>
  )
}
