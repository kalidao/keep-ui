import type { GetServerSideProps, NextPage } from 'next'
import Link from 'next/link'
import { Heading, Text, Stack, Card, Button, IconArrowLeft } from '@kalidao/reality'
import Layout from '~/layout/DashboardLayout'
import { useRouter } from 'next/router'
import { ViewTx } from '~/proposal'
import { PrettyDate, Author, Quorum } from '~/components'
import { useAccount, useContractWrite, usePrepareContractWrite } from 'wagmi'
import { ethers } from 'ethers'
import { KEEP_ABI } from '~/constants'
import Delete from '~/components/Delete'
import { tryTypedSigningV4 } from '~/utils/sign'
import UpVote from '@design/YesVote'
import { toOp } from '~/utils/toOp'
import { useDynamicContext } from '@dynamic-labs/sdk-react'
import { useEffect } from 'react'
import { useKeepStore } from '~/dashboard/useKeepStore'

type Sign = {
  user: `0xstring`
  v: number
  r: `0xstring`
  s: `0xstring`
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const chainId = params?.chainId as string
  const keep = params?.keep as string
  const txHash = params?.txHash as string

  const res = await fetch(`${process.env.NEXT_PUBLIC_KEEP_API}/txs/${txHash}`)
  const data = await res.json()

  console.log('data', data)

  if (data?.error || !data) {
    return {
      redirect: {
        destination: `/${chainId}/${keep}`,
        permanent: false,
      },
    }
  }

  return {
    props: {
      data,
    },
  }
}

const Tx: NextPage = (props: any) => {
  const data = props?.data
  const router = useRouter()
  const { chainId, keep, txHash } = router.query
  const { address } = useAccount()
  const { authToken } = useDynamicContext()
  const state = useKeepStore((state) => state)

  useEffect(() => {
    if (txHash) {
      if (state.txHash !== txHash) {
        state.setTxHash(txHash as string)
      }
    }
  }, [txHash, state])

  const op = toOp(data?.op) ?? 0
  const sigs = data?.sigs
    ?.map((sig: any) => (sig = [sig.signer, sig.v, sig.r, sig.s]))
    .sort((a: any[], b: any[]) => +a[0] - +b[0]) as Sign[] // TODO: Add typing
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
        <Card
          padding="6"
          width={{
            xs: 'full',
            md: '1/2',
            lg: '3/4',
          }}
        >
          {data ? (
            <Stack>
              <Stack direction="horizontal" align="center" justify={'space-between'}>
                <Stack>
                  <Heading>{data?.title}</Heading>
                  <Stack
                    direction={{
                      xs: 'vertical',
                      md: 'horizontal',
                    }}
                  >
                    <PrettyDate timestamp={data?.createdAt} />
                    <Author author={data ? data?.authorAddress : ''} />
                  </Stack>
                </Stack>
              </Stack>
              <Text>{data?.content}</Text>
              <ViewTx tx={data} />

              <Stack direction={'horizontal'} align="center">
                {data?.status == 'pending' && (
                  <>
                    <UpVote onClick={sign} />{' '}
                    <Delete
                      txHash={data?.txHash}
                      chainId={chainId ? (chainId as string) : '137'}
                      keep={keep ? (keep as string) : ''}
                      router={router}
                    />
                  </>
                )}
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
        <Quorum />
      </Stack>
    </Layout>
  )
}

export default Tx
