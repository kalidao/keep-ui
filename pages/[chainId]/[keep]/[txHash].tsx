import type { NextPage } from 'next'
import Link from 'next/link'
import { Heading, Text, Stack, Card, Button, IconClose, Spinner } from '@kalidao/reality'
import Layout from '~/layout/DashboardLayout'
import { useRouter } from 'next/router'
import { ViewTx } from '~/proposal'
import { fetcher } from '~/utils'
import { useQuery } from '@tanstack/react-query'
import { PrettyDate, Author, Quorum } from '~/components'
import { useAccount, useContractWrite, usePrepareContractWrite, useSignTypedData } from 'wagmi'
import { useSignMessage } from 'wagmi'
import { ethers } from 'ethers'
import { KEEP_ABI } from '~/constants'
import Delete from '~/components/Delete'
import { trySigning } from '~/utils/sign'

type Sign = {
  user: `0xstring`
  v: number
  r: `0xstring`
  s: `0xstring`
}

const toOp = (op: string) => {
  switch (op) {
    case 'call':
      return 0
    case 'delegatecall':
      return 1
    case 'create':
      return 2
  }
}

const Tx: NextPage = () => {
  const router = useRouter()
  const { address } = useAccount()
  const { chainId, keep, txHash } = router.query
  const { data, isLoading: isLoadingTx } = useQuery(['keep', chainId, keep, txHash], async () =>
    fetcher(`http://localhost:3000/txs/${txHash}`),
  )
  // const {
  //   data: tx,
  //   isError,
  //   isLoading,
  //   isSuccess,
  //   signMessageAsync,
  // } = useSignMessage({
  //   message: data?.txHash,
  // })
  // const {
  //   data: typedTx,
  //   signTypedDataAsync
  // } = useSignTypedData({
  //   domain: {
  //     name: 'Keep',
  //     version: '1',
  //     chainId: Number(chainId),
  //     verifyingContract: keep as `0xstring`,
  //   },
  //   types: {
  //     Execute: [
  //       { name: 'op', type: 'uint8' },
  //       { name: 'to', type: 'address' },
  //       { name: 'value', type: 'uint256' },
  //       { name: 'data', type: 'bytes' },
  //       { name: 'nonce', type: 'uint120' },
  //     ]
  //   },
  //   value: {
  //     op: data?.op,
  //     to: data?.to,
  //     value: ethers.BigNumber.from(0),
  //     data: data?.data,
  //     nonce: data?.nonce,
  //   },
  // })
  const op = toOp(data?.op)
  const sigs = data?.sigs
    ?.map((sig: any) => (sig = [sig.signer, sig.v, sig.r, sig.s]))
    .sort((a: any[], b: any[]) => +a[0] - +b[0]) as Sign[] // TODO: Add typing

  console.log('sigs', sigs)
  console.log('tx', Number(op), data?.to, data?.value, data?.data, sigs)

  const { config, error } = usePrepareContractWrite({
    address: keep as string,
    abi: KEEP_ABI,
    chainId: Number(chainId),
    functionName: 'execute',
    args: [
      Number(op),
      data?.to,
      data ? ethers.BigNumber.from(data?.value) : ethers.BigNumber.from(0),
      data?.data,
      sigs,
    ],
    overrides: {
      gasLimit: ethers.BigNumber.from(3000000),
    },
  })
  console.log('tx', ethers.BigNumber.from('0'), error)

  const { write } = useContractWrite(config)

  const sign = async () => {
    if (!address && !txHash) return
    const sign = await trySigning(txHash as string, address as `0xstring`)
    console.log('sign', sign)

    if (!sign) return
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

    // TODO: Add confirmation toast
  }

  const execute = () => {}

  return (
    <Layout title={'Dashboard'} content={'Manage your Keep'}>
      <Card padding="6">
        {isLoadingTx ? (
          <Spinner />
        ) : data ? (
          <Stack>
            <Stack direction="horizontal" align="center" justify={'space-between'}>
              <Stack>
                <Heading>{data?.title}</Heading>
                <Stack direction={'horizontal'}>
                  <PrettyDate timestamp={data?.createdAt} />
                  <Author author={data ? data?.authorAddress : ''} />
                </Stack>
              </Stack>
              <Delete
                txHash={data?.txHash}
                chainId={chainId ? (chainId as string) : '137'}
                keep={keep ? (keep as string) : ''}
                router={router}
              />
            </Stack>
            <Stack direction={'horizontal'}>
              <Stack>
                <Text>{data?.content}</Text>
                <ViewTx tx={data} />
              </Stack>
              <Quorum sigs={data?.sigs} />
            </Stack>
            <Stack direction={'horizontal'} align="center">
              <Button onClick={sign}>Sign</Button>
              <Button disabled={!write} onClick={() => write?.()}>
                Execute
              </Button>
            </Stack>
          </Stack>
        ) : (
          <Stack>
            <Text>Not found.</Text>
            <Link href={`/${chainId}/${keep}`}>
              <Text>Take me back home!</Text>
            </Link>
          </Stack>
        )}
      </Card>
    </Layout>
  )
}

export default Tx
