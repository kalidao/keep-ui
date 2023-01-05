import { Card, Stack, Text, Button, IconLightningBolt, Box } from '@kalidao/reality'
import { useContractRead, useContractWrite, useNetwork, usePrepareContractWrite, useEnsName } from 'wagmi'
import Back from './Back'
import { CreateProps } from './types'
import { ethers } from 'ethers'
import { useRouter } from 'next/router'
import { KEEP_ABI, KEEP_FACTORY_ABI, KEEP_FACTORY_ADDRESS } from '~/constants'

export const Confirm = ({ store, setView }: CreateProps) => {
  const router = useRouter()
  const { chain } = useNetwork()
  const { data, error: isDetermineError } = useContractRead({
    address: KEEP_FACTORY_ADDRESS,
    abi: KEEP_FACTORY_ABI,
    functionName: 'determineKeep',
    chainId: chain ? chain.id : 137,
    args: [ethers.utils.formatBytes32String(store.name) as `0x${string}`],
  })
  // write
  const signers = store.signers.map((signer) => signer.address).sort((a, b) => +a - +b) as `0xstring`[] // TODO: add validation on address

  // prepare deployment
  let calls = []

  // URI
  const SIGN_KEY = 1816876358
  const iface = new ethers.utils.Interface(KEEP_ABI)
  const payload = iface.encodeFunctionData('setURI', [
    SIGN_KEY,
    `https://api.kali.gg/keeps/${chain?.id}/${data}/${SIGN_KEY}`,
  ]) as `0x${string}`
  calls.push({
    op: 0,
    to: data ? data : ethers.constants.AddressZero,
    value: ethers.BigNumber.from(0),
    data: payload,
  })

  const { config, error: prepareError } = usePrepareContractWrite({
    address: KEEP_FACTORY_ADDRESS,
    abi: KEEP_FACTORY_ABI,
    functionName: 'deployKeep',
    args: [
      ethers.utils.formatBytes32String(store.name) as `0x{string}`,
      calls,
      signers,
      ethers.BigNumber.from(store.threshold),
    ],
  })
  // TODO: Add redirect to keep dashboard
  const {
    write,
    error: writeError,
    isError: isWriteError,
    isLoading,
  } = useContractWrite({
    ...config,
    onSuccess: () => {
      if (chain) {
        setTimeout(() => 3000)
        router.push(`/${chain.id}/${data}`)
      }
    },
  })

  console.log('errors', prepareError, writeError)

  console.log(
    'data',
    ethers.utils.formatBytes32String(store.name) as `0x{string}`,
    [],
    signers,
    ethers.BigNumber.from(store.threshold),
  )
  console.log('isDetermineError', isDetermineError)
  return (
    <Box height="full">
      <Stack>
        <Back to={2} setView={setView} />
        <Text>
          Your multisig will be deployed on {chain ? chain?.name + ' at' : ''}{' '}
          <Text variant="label">{data ? (data as string) : null}</Text>
        </Text>
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
    </Box>
  )
}

const Signer = ({ index, address }: { index: number; address: string }) => {
  const { data } = useEnsName({
    address: address as `0xstring`,
    chainId: 1,
  })

  console.log('signer address', address)
  return (
    <Card padding="5" borderRadius={'medium'} width="full" shadow>
      <Text weight="bold">
        {index}. {data ? data : address}
      </Text>
    </Card>
  )
}
