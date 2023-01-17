import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { Box, Card, Text, Divider, Heading, Stack, Skeleton } from '@kalidao/reality'
import Layout from '~/layout'
import { fetcher } from '~/utils'
import { useQuery } from '@tanstack/react-query'
import { KeepCard } from '~/components/'
import { useDynamicContext } from '@dynamic-labs/sdk-react'
import { ProposalCard } from '~/dashboard/Proposals'

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
      <Stack align="center" justify={'stretch'}>
        <Heading>
          {user?.ens?.name}
          {user?.ens?.name && "'s"} dashboard
        </Heading>
        <Divider />
        <Stack
          direction={{
            xs: 'vertical',
            md: 'horizontal',
          }}
          justify="center"
          align="flex-start"
        >
          <Skeleton height={'80'} width="32" loading={isLoading}>
            <Box>
              {keeps ? (
                keeps.map((keep: any) => {
                  return (
                    <KeepCard
                      key={`${keep?.address}-${keep?.chainId}`}
                      name={keep?.name}
                      avatar={keep?.avatar}
                      chainId={keep?.chainId}
                      keep={keep?.address}
                      txs={keep?.transactions}
                      bio={keep?.bio}
                    />
                  )
                })
              ) : (
                <Card>
                  <Stack>
                    <Heading>Get started</Heading>
                    <Divider />
                    <Text>
                      No Keeps yet? Create one to get started. You can create a Keep for yourself or for your
                      organization.
                    </Text>
                  </Stack>
                </Card>
              )}
            </Box>
          </Skeleton>
          <Divider orientation="vertical" />
          <Skeleton height={'36'} width="256" loading={isLoading}>
            <Box
              width={{
                xs: 'screenSm',
                md: 'screenLg',
              }}
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
          </Skeleton>
        </Stack>
      </Stack>
    </Layout>
  )
}

export default Dashboard
