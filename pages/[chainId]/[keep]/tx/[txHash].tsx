import { useEffect } from 'react'

import type { GetServerSideProps, NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { Box, Button, Heading, IconArrowLeft, Stack, Text } from '@kalidao/reality'
import { useQuery } from '@tanstack/react-query'
import Comments from '~/comments'
import { Author, PrettyDate } from '~/components'
import { useKeepStore } from '~/dashboard/useKeepStore'
import { useTxStore } from '~/dashboard/useTxStore'
import Layout from '~/layout/DashboardLayout'
import { ViewTx } from '~/proposal'
import Execute from '~/proposal/Execute'
import Quorum from '~/proposal/Quorum'
import Vote from '~/proposal/Vote'

import { CopyURL } from '~/components/CopyURL'
import { JSONContentRenderer } from '~/components/Editor/JSONContent'
import { User } from '~/components/user'

const Tx: NextPage = () => {
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
      tx.setAuthor(data?.userId)
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
        tx.setAuthor(data?.userId)
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
              minHeight="96"
              display={'flex'}
              flexDirection="column"
              alignItems={'flex-start'}
              justifyContent="flex-start"
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
                <User address={data ? data?.userId : ''} size="sm" />
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
              <JSONContentRenderer content={data?.content} />
              <ViewTx />
            </Box>
            <Stack direction={'horizontal'} align="center">
              <Vote />
              <Execute />
            </Stack>
          </Box>
        </Stack>
        <Comments />
      </Box>
    </Layout>
  )
}

export default Tx
