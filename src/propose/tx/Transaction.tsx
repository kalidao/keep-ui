import Link from 'next/link'
import { highBackground } from '@design/blur.css'
import { Box, Text, Stack, Input, Textarea, Button, IconArrowLeft } from '@kalidao/reality'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useAccount, useContractRead } from 'wagmi'
import { KEEP_ABI } from '~/constants'
import { getTxHash } from '../getTxHash'
import { SendToken } from './SendToken'
import { useQuery } from 'wagmi'
import { fetcher } from '~/utils'
import { TxMenu } from './TxMenu'
import { TxStore, useTxStore } from './useTxStore'
import { AppsMenu } from './AppsMenu'
import { AppTribute } from './AppTribute'
import { SendNFT } from './SendNFT'

type Props = {
  setView: React.Dispatch<React.SetStateAction<string>>
}

const operation = (op: number) => {
  switch (op) {
    case 0:
      return 'call'
    case 1:
      return 'delegatecall'
    case 2:
      return 'create'
  }
}

const Transaction = ({}: Props) => {
  const router = useRouter()
  const { chainId, keep } = router.query
  const { address: author } = useAccount()
  const view = useTxStore((state) => state.view)
  const {
    data: meta,
    isLoading,
    isError,
  } = useQuery(['keep', chainId, keep], async () =>
    fetcher(`${process.env.NEXT_PUBLIC_KEEP_API}/keeps/${chainId}/${keep}/`),
  )
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const state = useTxStore((state) => state)

  const { refetch: refetchNonce } = useContractRead({
    address: keep as `0xstring`,
    abi: KEEP_ABI,
    functionName: 'nonce',
  })

  // console.log('parsed ether', ethers.utils.parseEther(value))

  const notSigner = meta?.signers?.find((s: string) => s === author?.toLowerCase()) == undefined ? true : false

  const handleTx = async () => {
    if (chainId && keep) {
      const { data: nonce } = await refetchNonce()
      if (!nonce) return
      const digest = await getTxHash(
        Number(chainId),
        keep as string,
        state.op,
        state.to,
        state.value,
        state.data,
        nonce.toString(),
      )
      console.log('nonce', nonce)
      console.log(
        'digest',
        Number(chainId),
        keep as string,
        state.op,
        state.to,
        state.value,
        state.data,
        nonce.toString(),
        digest,
      )

      if (digest == 'error') {
        return
      }

      if (!nonce) return
      const body = {
        op: operation(state.op),
        to: state.to,
        data: state.data,
        nonce: nonce.toString(),
        value: state.value,
        txHash: digest,
        title: title,
        content: content,
        authorAddress: author,
      }
      console.log('body', body)

      const send = await fetch(`${process.env.NEXT_PUBLIC_KEEP_API}/keeps/${chainId}/${keep}/addTx`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }).then((res) => res.json())

      console.log('send', send)
    }

    // TODO: Add success/error toast
    router.push(`/${chainId}/${keep}`)
  }

  const views: { [key in TxStore['view']]: React.ReactNode } = {
    menu: <TxMenu />,
    send_token: <SendToken />,
    send_nft: <SendNFT />,
    app: <AppsMenu />,
    app_tribute: <AppTribute />,
  }

  // TODO: Signal for Guilds
  return (
    <Box className={highBackground}>
      <Stack direction={'horizontal'} justify="space-between">
        <Link href={`/${chainId}/${keep}`} legacyBehavior passHref>
          <Button shape="circle" variant="tertiary" size="small" as="a">
            <IconArrowLeft />
          </Button>
        </Link>
        <Box width="full">
          <Stack>
            <Input label="Title" description="" placeholder="Title" onChange={(e) => setTitle(e.currentTarget.value)} />
            <Textarea
              label="Description"
              description=""
              placeholder="What is this transaction about?"
              onChange={(e) => setContent(e.currentTarget.value)}
            />
            {views[view]}
            <Text>To: {state.to}</Text>
            <Button onClick={handleTx} disabled={isLoading || isError || notSigner}>
              Submit
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Box>
  )
}

export default Transaction
