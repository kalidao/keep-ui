import type { NextPage } from 'next'
import { useRouter } from 'next/router'

import { useDynamicContext } from '@dynamic-labs/sdk-react'
import { Box, Spinner } from '@kalidao/reality'
import * as Tabs from '@radix-ui/react-tabs'
import { useQuery } from '@tanstack/react-query'
import { TxCard } from '~/dashboard/Proposals'
import { SignalCard } from '~/dashboard/Signals'
import * as styles from '~/dashboard/styles.css'
import Layout from '~/layout'
import { fetcher } from '~/utils'

import Empty from '~/components/Empty'

const parsePendingTransactions = (keeps: any) => {
  if (!keeps) {
    return []
  }
  const pendingTransactions: any[] = []

  keeps.forEach((keep: any) => {
    keep.transactions.forEach((tx: any) => {
      if (tx.status != 'executed') {
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

const curateFeed = (pendingTransactions: any, signals: any) => {
  const feed: any[] = []

  pendingTransactions.forEach((tx: any) => {
    feed.push({ type: 'tx', data: tx })
  })

  signals.forEach((signal: any) => {
    feed.push({ type: 'signal', data: signal })
  })

  //  order by date created

  feed.sort((a: any, b: any) => {
    return new Date(b.data.createdAt).getTime() - new Date(a.data.createdAt).getTime()
  })

  return feed
}

const Dashboard: NextPage = () => {
  const { user, isAuthenticated } = useDynamicContext()
  const router = useRouter()
  const { data: keeps } = useQuery(['userKeeps', user?.blockchainAccounts?.[0]?.address], async () => {
    const data = await fetcher(
      `${process.env.NEXT_PUBLIC_KEEP_API}/keeps?signer=${user?.blockchainAccounts?.[0]?.address}`,
    )

    if (data.status !== 'success') {
      throw new Error('Failed to fetch')
    }
    return data.data.keeps
  })

  const pendingTransactions = parsePendingTransactions(keeps)
  const signals = parseSignals(keeps)

  const feed = curateFeed(pendingTransactions, signals)

  if (!isAuthenticated) {
    router.push('/login')
  }

  return (
    <Layout title={'Home'} content={'Create a Keep'}>
      <Tabs.Root className={styles.tabRoot} defaultValue="feed">
        <Tabs.List className={styles.tabList} aria-label="Review and Sign Transactions">
          <Tabs.Trigger className={styles.tabTrigger} value="feed">
            Feed
          </Tabs.Trigger>
          <Tabs.Trigger className={styles.tabTrigger} value="txs">
            Transactions
          </Tabs.Trigger>
          <Tabs.Trigger className={styles.tabTrigger} value="signals">
            Signals
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content className="TabsContent" value="feed">
          <Box position={'relative'} minHeight="viewHeight" display="flex" flexDirection={'column'} gap="3">
            {feed ? (
              feed.length === 0 ? (
                <Empty />
              ) : (
                feed.map((item: any) => {
                  if (item.type === 'tx') {
                    return (
                      <TxCard
                        key={item.data.txHash}
                        txHash={item.data.txHash}
                        chainId={item.data.keepChainId}
                        keep={item.data.keepAddress}
                        proposer={item.data.userId}
                        title={item.data.title}
                        description={item.data.content}
                        timestamp={item.data.createdAt}
                        status={item.data.status}
                      />
                    )
                  } else {
                    return (
                      <SignalCard
                        key={item.data.id}
                        id={item.data.id}
                        chainId={item.data.keepChainId}
                        keep={item.data.keepAddress}
                        proposer={item.data.userId}
                        title={item.data.title}
                        description={item.data.content}
                        timestamp={item.data.createdAt}
                        type={'Signal'}
                      />
                    )
                  }
                })
              )
            ) : (
              <Spinner />
            )}
          </Box>
        </Tabs.Content>
        <Tabs.Content className="TabsContent" value="txs">
          <Box position={'relative'} minHeight="viewHeight" display="flex" flexDirection={'column'} gap="3">
            {pendingTransactions ? (
              pendingTransactions.length === 0 ? (
                <Empty />
              ) : (
                pendingTransactions.map((tx: any) => {
                  return (
                    <TxCard
                      key={tx.txHash}
                      txHash={tx.txHash}
                      chainId={tx.keepChainId}
                      keep={tx.keepAddress}
                      proposer={tx.userId}
                      title={tx.title}
                      description={tx.content}
                      timestamp={tx.createdAt}
                      status={tx.status}
                    />
                  )
                })
              )
            ) : (
              <Spinner />
            )}
          </Box>
        </Tabs.Content>
        <Tabs.Content className="TabsContent" value="signals">
          <Box position={'relative'} minHeight="viewHeight" display="flex" flexDirection={'column'} gap="3">
            {signals ? (
              signals.length === 0 ? (
                <Empty />
              ) : (
                signals.map((signal: any) => {
                  return (
                    <SignalCard
                      key={signal.id}
                      id={signal.id}
                      chainId={signal.keepChainId}
                      keep={signal.keepAddress}
                      proposer={signal.userId}
                      title={signal.title}
                      description={signal.content}
                      timestamp={signal.createdAt}
                      type={'Signal'}
                    />
                  )
                })
              )
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
