import type { NextPage } from 'next'
import { useRouter } from 'next/router'

import { useDynamicContext } from '@dynamic-labs/sdk-react'
import { Avatar, Box, Card, Divider, Heading, Skeleton, Spinner, Stack, Text } from '@kalidao/reality'
import * as Tabs from '@radix-ui/react-tabs'
import { useQuery } from '@tanstack/react-query'
import { ProposalCard } from '~/dashboard/Proposals'
import { SignalCard } from '~/dashboard/Signals'
import * as styles from '~/dashboard/styles.css'
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

const parseSignals = (keeps: any) => {
  if (!keeps) {
    return []
  }

  const signals: any[] = []

  keeps.forEach((keep: any) => {
    keep?.signals?.forEach((signal: any) => {
      signals.push(signal)
    })
  })

  //  order by date created
  signals.sort((a: any, b: any) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  })

  return signals
}

const Dashboard: NextPage = () => {
  const { user } = useDynamicContext()
  const router = useRouter()

  const { data: keeps, isLoading } = useQuery(['userKeeps', user?.walletPublicKey], async () => {
    const data = await fetcher(`${process.env.NEXT_PUBLIC_KEEP_API}/keeps?signer=${user?.walletPublicKey}`)
    return data
  })

  // only return the 'pending' transactions from the keeps
  const pendingTransactions = parsePendingTransactions(keeps)
  const signals = parseSignals(keeps)

  console.log('pendingTransactions', keeps)

  if (!user) {
    router.push('/login')
  }

  return (
    <Layout title={'Home'} content={'Create a Keep'}>
      <Tabs.Root className={styles.tabRoot} defaultValue="txs">
        <Tabs.List className={styles.tabList} aria-label="Review and Sign Transactions">
          <Tabs.Trigger className={styles.tabTrigger} value="txs">
            Transactions
          </Tabs.Trigger>
          <Tabs.Trigger className={styles.tabTrigger} value="signals">
            Signals
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content className="TabsContent" value="txs">
          <Box padding="3" display="flex" flexDirection={'column'} gap="3">
            {pendingTransactions ? (
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
              })
            ) : (
              <Spinner />
            )}
          </Box>
        </Tabs.Content>
        <Tabs.Content className="TabsContent" value="signals">
          <Box padding={'3'} display="flex" flexDirection={'column'} gap="3">
            {signals ? (
              signals.map((signal: any) => {
                return (
                  <SignalCard
                    key={signal.id}
                    id={signal.id}
                    chainId={signal.keepChainId}
                    keep={signal.keepAddress}
                    proposer={signal.authorAddress}
                    title={signal.title}
                    description={signal.content}
                    timestamp={signal.createdAt}
                    type={'Signal'}
                  />
                )
              })
            ) : (
              <Spinner />
            )}
          </Box>
        </Tabs.Content>
      </Tabs.Root>
    </Layout>
  )
}

export default Dashboard
