import type { NextPage } from 'next'
import Link from 'next/link'
import { Heading, Text, Stack, Card, Button, Spinner, IconArrowLeft } from '@kalidao/reality'
import Layout from '~/layout/DashboardLayout'
import { useRouter } from 'next/router'
import { ViewTx } from '~/proposal'
import { fetcher } from '~/utils'
import { useQuery } from '@tanstack/react-query'
import { PrettyDate, Author, Quorum } from '~/components'
import { useAccount, useContractWrite, usePrepareContractWrite } from 'wagmi'
import { ethers } from 'ethers'
import { KEEP_ABI } from '~/constants'
import Delete from '~/components/Delete'
import { tryTypedSigningV4 } from '~/utils/sign'
import UpVote from '@design/YesVote'
import { toOp } from '~/utils/toOp'
import { useDynamicContext } from '@dynamic-labs/sdk-react'

type Sign = {
  user: `0xstring`
  v: number
  r: `0xstring`
  s: `0xstring`
}

const Tx: NextPage = () => {
  const router = useRouter()
  const { address } = useAccount()
  const { chainId, keep, txHash } = router.query
  const { data, isLoading: isLoadingTx } = useQuery(['keep', chainId, keep, txHash], async () =>
    fetcher(`${process.env.NEXT_PUBLIC_KEEP_API}/txs/${txHash}`),
  )
  const { authToken } = useDynamicContext()

  const op = toOp(data?.op) ?? 0
  const sigs = data?.sigs
    ?.map((sig: any) => (sig = [sig.signer, sig.v, sig.r, sig.s]))
    .sort((a: any[], b: any[]) => +a[0] - +b[0]) as Sign[] // TODO: Add typing

  console.log('sigs', sigs)
  console.log('tx', data?.op, Number(op), data?.to, data?.value, data?.data, sigs)
  const { config } = usePrepareContractWrite({
    address: keep as typeof address,
    abi: KEEP_ABI,
    chainId: Number(chainId),
    functionName: 'execute',
    args: [op, data?.to, data ? ethers.BigNumber.from(data?.value) : ethers.BigNumber.from(0), data?.data, sigs],
  })
  const { write } = useContractWrite(config)

  const sign = async () => {
    if (!keep && !chainId && !address && !txHash) return

    const sign = await tryTypedSigningV4(
      {
        chainId: Number(chainId),
        address: keep as string,
      },
      {
        op: data?.op,
        to: data?.to,
        value: data?.value,
        data: data?.data,
        nonce: data?.nonce,
      },
      address as string,
    )
    // const sign = await signTypedDataAsync()
    if (!sign) return
    const { v, r, s } = ethers.utils.splitSignature(sign)
    const body = {
      keep: keep,
      address: address,
      chainId: chainId,
      v: v,
      r: r,
      s: s,
    }

    const send = await fetch(`${process.env.NEXT_PUBLIC_KEEP_API}/txs/${data?.txHash}/sign`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(body),
    }).then((res) => res.json())

    console.log('post', send)

    // TODO: Add confirmation toast
  }

  return (
    <Layout title={'Dashboard'} content={'Manage your Keep'}>
      <Stack
        direction={{
          xs: 'vertical',
          md: 'horizontal',
        }}
      >
        <Link href={`/${chainId}/${keep}`} passHref legacyBehavior>
          <Button size="small" variant="transparent" as="a">
            <IconArrowLeft />
          </Button>
        </Link>
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
                {data?.status == 'pending' && <UpVote onClick={sign} />}
                {data?.status != 'executed' && write && (
                  <Button disabled={!write} onClick={() => write?.()}>
                    Execute
                  </Button>
                )}
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
      </Stack>
    </Layout>
  )
}

export default Tx
