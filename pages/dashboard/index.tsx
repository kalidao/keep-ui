import type { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType, NextPage } from 'next'
import { useRouter } from 'next/router'

import { useDynamicContext } from '@dynamic-labs/sdk-react'
import { Box, Spinner, Text } from '@kalidao/reality'
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
  console.log('pendingTransactions', pendingTransactions)
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = context.req.headers.cookie
  // get 'next-auth.session-token' cookie
  const sessionToken = cookies
    ?.split(';')
    .find((c) => c.trim().startsWith('next-auth.session-token='))
    ?.split('=')[1]

  if (!sessionToken) {
    // redirect to /login
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}

const Dashboard: NextPage = ({ data }: InferGetServerSidePropsType<GetServerSideProps>) => {
  const { user } = useDynamicContext()

  const { data: keeps, isLoading } = useQuery(['userKeeps', user?.walletPublicKey], async () => {
    const data = await fetcher(`${process.env.NEXT_PUBLIC_KEEP_API}/keeps?signer=${user?.walletPublicKey}`)
    return data
  })

  const pendingTransactions = parsePendingTransactions(keeps)
  const signals = parseSignals(keeps)

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
