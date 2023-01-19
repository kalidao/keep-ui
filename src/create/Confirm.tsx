import { Card, Stack, Heading, Text, Button, IconLightningBolt, Box, Divider } from '@kalidao/reality'
import { useContractRead, useContractWrite, useNetwork, usePrepareContractWrite, useEnsName } from 'wagmi'
import Back from './Back'
import { ethers } from 'ethers'
import { useRouter } from 'next/router'
import { KEEP_ABI, KEEP_FACTORY_ABI, KEEP_FACTORY_ADDRESS } from '~/constants'
import { useCreateStore } from './useCreateStore'
import * as styles from './create.css'
import { Emblem } from './Emblem'
import { PostIt } from './PostIt'
import { uploadFile } from '~/utils/upload'
import { Loading } from './Loading'
import { Success } from './Success'
import { Error } from './Error'

export const Confirm = () => {
  const state = useCreateStore((state) => state)
  const { chain } = useNetwork()
  const { data, error: isDetermineError } = useContractRead({
    address: KEEP_FACTORY_ADDRESS,
    abi: KEEP_FACTORY_ABI,
    functionName: 'determineKeep',
    chainId: chain ? chain.id : 137,
    args: [ethers.utils.formatBytes32String(state.name) as `0x${string}`],
    onSuccess: (data) => {
      state.setAddress(data)
    },
  })
  // write
  const signers = state.signers.map((signer) => signer.address).sort((a, b) => +a - +b) as `0xstring`[] // TODO: add validation on address

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
      ethers.utils.formatBytes32String(state.name) as `0x{string}`,
      calls,
      signers,
      ethers.BigNumber.from(state.threshold),
    ],
    chainId: chain ? Number(chain.id) : 137,
  })

  // TODO: Add redirect to keep dashboard
  const {
    writeAsync,
    error: writeError,
    isError: isWriteError,
    isLoading,
  } = useContractWrite({
    ...config,
  })

  const deploy = async () => {
    state.setLoading('loading')
    if (!chain || isDetermineError || prepareError || isWriteError) {
      state.setLoading('error')
      state.setLoadingMessage('Error deploying Keep')
      return
    }

    state.setChainId(chain.id)

    let img: string | Error = ''

    if (state.avatarFile !== undefined) {
      state.setLoadingMessage('Uploading avatar to IPFS')
      img = await uploadFile(state.avatarFile)

      if (img instanceof Error) {
        state.setLoading('error')
        state.setLoadingMessage('Error uploading avatar to IPFS')
        return
      }
    }

    writeAsync?.()
      .then((tx) => {
        state.setTxHash(tx.hash)
        state.setLoadingMessage('Waiting for confirmation')
        tx?.wait()
          .then((receipt) => {
            console.log('receipt', receipt)
            state.setLoadingMessage('Setting up Keep')
            const body = {
              address: state.address,
              chain: chain?.id,
              blocknumber: 0,
              name: state.name,
              signers: signers,
              threshold: state.threshold,
              avatar: img ? img : '',
              templateId: 'signer',
              bio: state.bio,
              params: {
                borderColor: state.borderColor,
                borderTextColor: state.borderTextColor,
                bgColor: state.bgColor,
                innerTextColor: state.innerTextColor,
              },
              socials: {
                twitter: state.twitter,
                discord: state.discord,
                website: state.website,
              },
            }
            fetch(`${process.env.NEXT_PUBLIC_KEEP_API}/keeps/setup`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(body),
            })
              .then((res) => {
                if (res.status === 200) {
                  state.setLoading('success')
                  state.setLoadingMessage('Keep deployed')
                } else {
                  state.setLoading('error')
                  state.setLoadingMessage('Error deploying Keep')
                }
              })
              .catch((err) => {
                console.log('err', err)
                state.setLoading('error')
                state.setLoadingMessage('Error deploying Keep')
              })
          })
          .catch((err) => {
            console.log('err', err)
            state.setLoading('error')
            state.setLoadingMessage('Error deploying Keep')
          })
      })
      .catch((err) => {
        console.log('err', err)
        state.setLoading('error')
        state.setLoadingMessage('Error deploying Keep')
      })
  }

  if (state.loading === 'loading') {
    return <Loading />
  }

  if (state.loading === 'success') {
    return <Success />
  }

  if (state.loading === 'error') {
    return <Error />
  }

  return (
    <Box className={styles.shell}>
      <Stack direction={'horizontal'}>
        <Stack>
          <Stack direction={'horizontal'} align={'center'}>
            <Back to={'nft'} setView={state.setView} />
            <Heading level="2">Review</Heading>
          </Stack>
          <Divider />
          <Box className={styles.form}>
            <Box display={'flex'} width="full" alignItems={'flex-start'} justifyContent="space-between">
              <Emblem />
              <Box width="full" display="flex" flexDirection={'column'} gap="1.5">
                <Card padding="5" borderRadius={'medium'} width="full" shadow>
                  <Stack direction={'horizontal'} align="center" justify={'space-between'}>
                    <Text size="large">Name</Text>
                    <Text size="large" weight={'bold'}>
                      {state.name}
                    </Text>
                  </Stack>
                </Card>
                <Card padding="5" borderRadius={'medium'} width="full" shadow>
                  <Stack direction={'horizontal'} align="center" justify={'space-between'}>
                    <Text size="large">Threshold</Text>
                    <Text size="large" weight={'bold'}>
                      {state.threshold}/{state.signers.length}
                    </Text>
                  </Stack>
                </Card>
                <Stack align={'center'}>
                  <Text size="extraLarge">Signers</Text>
                  {signers.map((signer, index) => (
                    <Signer key={signer} index={index + 1} address={signer} />
                  ))}
                </Stack>
              </Box>
            </Box>
            {isWriteError && <Text color="red">{writeError?.message}</Text>}
            <Button width="full" suffix={<IconLightningBolt />} disabled={!writeAsync} onClick={deploy}>
              {isLoading ? 'Summoning' : 'Summon'}
            </Button>
          </Box>
        </Stack>
        <Stack>
          <PostIt title="How to deploy a Keep?">
            <Text>
              Click on the Summon button to deploy your Keep. You will be prompted to sign the transaction with your
              wallet. Once the transaction is mined, you will be redirected to your Keep dashboard.
            </Text>
          </PostIt>
        </Stack>
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
