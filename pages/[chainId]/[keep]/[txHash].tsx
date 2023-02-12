import { useEffect } from 'react'

import type { GetServerSideProps, NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { Box, Button, Card, Heading, IconArrowLeft, Stack, Text } from '@kalidao/reality'
import { useQuery } from '@tanstack/react-query'
import { ethers } from 'ethers'
import { useContractWrite, usePrepareContractWrite } from 'wagmi'
import { Author, PrettyDate } from '~/components'
import { KEEP_ABI } from '~/constants'
import { useKeepStore } from '~/dashboard/useKeepStore'
import { useTxStore } from '~/dashboard/useTxStore'
import Layout from '~/layout/DashboardLayout'
import { ViewTx } from '~/proposal'
import Execute from '~/proposal/Execute'
import Quorum from '~/proposal/Quorum'
import Vote from '~/proposal/Vote'
import { toOp } from '~/utils/toOp'
import { CopyURL } from '~/components/CopyURL'

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

      tx.setExecutedOn(data?.executedOn)
      tx.setExecutionHash(data?.executionHash)

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
    <Layout
      title={'Dashboard'}
      content={'Manage your Keep'}
      sidebar={
        <Stack>
          <Quorum />
          <Stack>
            <CopyURL />
          </Stack>
        </Stack>
      }
    >
      <Box padding={'3'}>
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
          <Box
            height="full"
            width={'full'}
            display={'flex'}
            flexDirection="column"
            alignItems={'baseline'}
            justifyContent={'space-between'}
            gap="5"
          >
            <Box
              width="full"
              height="full"
              display={'flex'}
              flexDirection="column"
              alignItems={'baseline'}
              justifyContent="center"
              gap="5"
            >
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
                  align="center"
                  justify={'center'}
                >
                  <PrettyDate timestamp={data?.createdAt} />
                  <Author author={data ? data?.userId : ''} />
                </Stack>
              </Stack>
              <Text>{data?.content}</Text>
              <ViewTx />
            </Box>
            <Stack direction={'horizontal'} align="center">
              <Vote />
              <Execute />
            </Stack>
          </Box>
        </Stack>
      </Box>
    </Layout>
  )
}

export default Tx
