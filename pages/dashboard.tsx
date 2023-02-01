import type { NextPage } from 'next'
import { useRouter } from 'next/router'

import { useDynamicContext } from '@dynamic-labs/sdk-react'
import { Avatar, Box, Card, Divider, Heading, Skeleton, Stack, Text } from '@kalidao/reality'
import { useQuery } from '@tanstack/react-query'
import { ProposalCard } from '~/dashboard/Proposals'
import Layout from '~/layout'
import { fetcher } from '~/utils'

import { KeepCard } from '~/components/'

const parsePendingTransactions = (keeps: any) => {
  if (!keeps) {
    return []
  }
  const pendingTransactions: any[] = []

  keeps.forEach((keep: any) => {
    keep.transactions.forEach((tx: any) => {
      if (tx.status === 'pending') {
        pendingTransactions.push(tx)
      }
    })
  })

  return pendingTransactions
}

const Dashboard: NextPage = () => {
  const { user } = useDynamicContext()
  const router = useRouter()

  if (!user) {
    router.push('/login')
  }

  const { data: keeps, isLoading } = useQuery(['userKeeps', user?.walletPublicKey], async () => {
    const data = await fetcher(`${process.env.NEXT_PUBLIC_KEEP_API}/keeps?signer=${user?.walletPublicKey}`)
    return data
  })

  // only return the 'pending' transactions from the keeps
  const pendingTransactions = parsePendingTransactions(keeps)

  console.log('pendingTransactions', pendingTransactions)

  if (!user) {
    router.push('/')
  }

  return (
    <Layout title={'Home'} content={'Create a Keep'}>
      <Box
        width={{
          xs: 'screenSm',
          md: 'screenMd',
          lg: 'screenLg',
          xl: 'screenXl',
        }}
        display="flex"
        flexDirection={'column'}
        gap="3"
      >
        {pendingTransactions &&
          pendingTransactions.map((tx: any) => {
            return (
              <ProposalCard
                key={tx.txHash}
                txHash={tx.txHash}
                chainId={tx.keepChainId}
                keep={tx.keepAddress}
                proposer={tx.authorAddress}
                title={tx.title}
                description={tx.content}
                timestamp={tx.createdAt}
                type={'Transaction'}
                status={tx.status}
              />
            )
          })}
      </Box>
    </Layout>
  )
}

export default Dashboard
