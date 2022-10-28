import type { NextPage } from 'next'
import { Heading, Text, Stack, Card, Button, IconClose } from '@kalidao/reality'
import Layout from '~/layout/DashboardLayout'
import { useRouter } from 'next/router'
import { ViewTx } from '~/transaction'
import { fetcher } from '~/utils'
import { useQuery } from '@tanstack/react-query'
import { PrettyDate, Author, Quorum } from '~/components'
import { useAccount, useContractWrite, usePrepareContractWrite } from 'wagmi'
import { useSignMessage } from 'wagmi'
import { ethers } from 'ethers'
import { KEEP_ABI } from '~/constants'

type Sign = {
  user: string,
  v: number,
  r: string,
  s: string
}

const toOp = (op: string) => {
  switch (op) {
    case 'CALL':
      return 0
    case 'DELEGATECALL':
      return 1
    case 'CREATE':
      return 2
  }
}

const Tx: NextPage = () => {
  const router = useRouter()
  const { address } = useAccount()
  const { chainId, keep, txHash } = router.query
  const { data } = useQuery(['keep', chainId, keep, txHash], async () => fetcher(`http://localhost:3000/txs/${txHash}`))
  const {
    data: tx,
    isError,
    isLoading,
    isSuccess,
    signMessageAsync,
  } = useSignMessage({
    message: data?.txHash,
  })
  const op = toOp(data?.op)
  const sigs = data?.sigs?.map((sig: any) => sig = {
      user: sig.signer,
      v: Number(sig.v),
      r: sig.r,
      s: sig.s,
    })
  console.log('sigs', sigs)
  const { config, error } = usePrepareContractWrite({
    address: keep as string,
    abi: KEEP_ABI,
    chainId: Number(chainId),
    functionName: 'execute',
    args: [Number(op), data?.to, data?.value, data?.data, sigs],
    overrides: {
      gasLimit: ethers.BigNumber.from(108000)
    }
  })
  const { write } = useContractWrite(config)

  const sign = async () => {
    if (!address) return
    const sign = await signMessageAsync()
    console.log('sign', sign)

    const { v, r, s } = ethers.utils.splitSignature(sign)
    const body = {
      address: address,
      v: v,
      r: r,
      s: s,
    }

    console.log('body', body)

    const send = await fetch(`http://localhost:3000/txs/${data?.txHash}/sign`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }).then((res) => res.json())

    console.log('post', send)
  }

  console.log('tx', tx, error)

  const execute = () => {

  }

  const deleteTx = () => {

  }

  return (
    <Layout title={'Dashboard'} content={'Manage your Keep'}>
      <Card padding="6">
        <Stack>
          <Stack direction="horizontal" align="center" justify={"space-between"}>
          <Stack>
            <Heading>{data?.title}</Heading>
            <Stack direction={'horizontal'}>
              <PrettyDate timestamp={data?.createdAt} />
              <Author author={data ? data?.authorAddress : ''} />
            </Stack>
          </Stack>
          <Button shape="circle" variant="secondary" tone="red" size="small" onClick={deleteTx}><IconClose /></Button>
          </Stack>
          <Text>{data?.content}</Text>
          <ViewTx tx={data} />
          <Stack direction={"horizontal"}  align="center">
            <Quorum sigs={data?.sigs} />
            <Button onClick={sign}>Sign</Button>
            <Button disabled={!write} onClick={() => write?.()}>Execute</Button>
          </Stack>
        </Stack>
      </Card>
    </Layout>
  )
}

export default Tx
