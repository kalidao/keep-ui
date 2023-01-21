import type { GetServerSideProps, NextPage } from 'next'
import Link from 'next/link'
import { Heading, Box, Text, Stack, Card, Button, IconArrowLeft } from '@kalidao/reality'
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
import { useTxStore } from '~/dashboard/useTxStore'
import { useQuery } from '@tanstack/react-query'

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
  const { txHash } = useRouter().query

  const tx = useTxStore((state) => state)
  const keep = useKeepStore((state) => state)

  const { data } = useQuery(
    ['tx', txHash],
    async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_KEEP_API}/txs/${txHash}`)
      const data = await res.json()

      tx.setTo(data?.to)
      tx.setOp(data?.op)
      tx.setValue(data?.value)
      tx.setData(data?.data)
      tx.setNonce(data?.nonce)
      tx.setStatus(data?.status)

      tx.setTitle(data?.title)
      tx.setContent(data?.content)
      tx.setAuthor(data?.author)
      tx.setCreatedAt(data?.createdAt)

      tx.setSigs(data?.sigs)

      return data
    },
    {
      enabled: !!txHash,
      refetchInterval: 1000,
      onSuccess: (data) => {
        tx.setTo(data?.to)
        tx.setOp(data?.op)
        tx.setValue(data?.value)
        tx.setData(data?.data)
        tx.setNonce(data?.nonce)
        tx.setStatus(data?.status)

        tx.setTitle(data?.title)
        tx.setContent(data?.content)
        tx.setAuthor(data?.author)
        tx.setCreatedAt(data?.createdAt)

        tx.setSigs(data?.sigs)
      },
    },
  )

  useEffect(() => {
    if (txHash) {
      if (tx.txHash !== txHash) {
        tx.setTxHash(txHash as string)
      }
    }
  }, [txHash, tx])

  const op = toOp(data?.op) ?? 0
  const sigs = data?.sigs
    ?.map((sig: any) => (sig = [sig.signer, sig.v, sig.r, sig.s]))
    .sort((a: any[], b: any[]) => +a[0] - +b[0]) as Sign[] // TODO: Add typing
  const { config } = usePrepareContractWrite({
    address: keep.address ? keep.address : ethers.constants.AddressZero,
    abi: KEEP_ABI,
    chainId: keep.chainId,
    functionName: 'execute',
    args: [op, data?.to, data ? ethers.BigNumber.from(data?.value) : ethers.BigNumber.from(0), data?.data, sigs],
  })
  const { write } = useContractWrite(config)

  return (
    <Layout title={'Dashboard'} content={'Manage your Keep'}>
      <Stack
        direction={{
          xs: 'vertical',
          md: 'horizontal',
        }}
      >
        <Link href={`/${keep.chainId}/${keep.address}`} passHref legacyBehavior>
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
          <Box
            height="full"
            width={'full'}
            display={'flex'}
            flexDirection="column"
            alignItems={'baseline'}
            justifyContent={'space-between'}
            gap="5"
          >
            <Box width="full" height="full" display={'flex'} flexDirection="column" alignItems={'baseline'} gap="5">
              <Stack
                direction={{
                  xs: 'vertical',
                  md: 'horizontal',
                }}
                align={{
                  xs: 'flex-start',
                  md: 'center',
                }}
                justify={'space-between'}
              >
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
              <Text>{data?.content}</Text>
              <ViewTx />
            </Box>
            <Stack direction={'horizontal'} align="center">
              {data?.status == 'pending' && (
                <>
                  <UpVote /> <Delete />
                </>
              )}
              {data?.status == 'process' && write && (
                <Button disabled={!write} onClick={() => write?.()}>
                  Execute
                </Button>
              )}
            </Stack>
          </Box>
        </Card>
        <Quorum />
      </Stack>
    </Layout>
  )
}

export default Tx
