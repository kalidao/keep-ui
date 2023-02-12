import Link from 'next/link'
import { useRouter } from 'next/router'

import { Avatar, Box, Button, Card, Heading, IconPlus, Stack, Tag, Text } from '@kalidao/reality'
import { useQuery } from '@tanstack/react-query'
import { fetcher, prettyDate, truncAddress } from '~/utils'

import { User } from '~/components/User'

import { useKeepStore } from './useKeepStore'

const Proposals = () => {
  const state = useKeepStore((state) => state)
  const { data: transactions, error } = useQuery(['keepTxs', state.chainId, state.address], async () =>
    fetcher(`${process.env.NEXT_PUBLIC_KEEP_API}/txs/${state.chainId}/${state.address}/`),
  )

  const filteredTransactions =
    transactions &&
    transactions
      ?.filter((tx: any) => {
        if (state.txFilter === 'all') return true
        if (state.txFilter === 'pending') return tx.status === 'pending'
        if (state.txFilter === 'executed') return tx.status === 'executed'
        if (state.txFilter === 'process')
          return tx.status === 'process' || tx.status === 'process_yes' || tx.status === 'process_no'
      })
      .sort((a: any, b: any) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      })

  return (
    <Box padding="3" display="flex" flexDirection={'column'} gap="2">
      {filteredTransactions && filteredTransactions?.length != 0 ? (
        filteredTransactions?.map((transaction: any) => (
          <ProposalCard
            key={transaction.txHash}
            txHash={transaction.txHash}
            chainId={transaction.keepChainId}
            keep={transaction.keepAddress}
            proposer={transaction.userId}
            title={transaction.title}
            description={transaction.content}
            timestamp={transaction.createdAt}
            type={'Transaction'}
            status={transaction.status}
          />
        ))
      ) : (
        <Text>Nothing to see here 😴</Text>
      )}
    </Box>
  )
}

type ProposalCardProps = {
  chainId: string
  keep: string
  txHash?: string
  title: string
  proposer: string
  description: string
  timestamp: string
  type: 'Signal' | 'Transaction'
  status?: 'Pending' | 'Voting' | 'Executed' | 'Canceled' // TODO: think more about status
}

export const ProposalCard = ({
  chainId,
  keep,
  txHash,
  title,
  proposer,
  description,
  timestamp,
  type,
  status,
}: ProposalCardProps) => {
  const { data: profile } = useQuery(['proposalCard', proposer], async () => {
    return fetcher(`${process.env.NEXT_PUBLIC_KEEP_API}/users/${proposer}/`)
  })

  if (type == 'Signal') {
    return (
      <Card padding="6" backgroundColor={'backgroundSecondary'} shadow hover>
        <Link href={`/${chainId}/${keep}/tx/${txHash}`} passHref legacyBehavior>
          <Box as="a" display={'flex'} flexDirection="column" gap="5">
            <Stack direction={'horizontal'} justify="space-between" align="flex-start">
              <Stack>
                <Stack direction={'horizontal'} align="center">
                  <User address={proposer} size="sm" />
                  <Heading level="2">{title}</Heading>
                </Stack>
                <Stack direction={'horizontal'} align="center">
                  <Tag label={profile ? profile?.handle : truncAddress(proposer)}>{prettyDate(timestamp)}</Tag>
                </Stack>
              </Stack>
              <Tag tone="accent">{type}</Tag>
            </Stack>
            <Text>{description}</Text>
          </Box>
        </Link>
      </Card>
    )
  }

  return (
    <Card padding="6" backgroundColor={'backgroundSecondary'} shadow hover>
      <Link href={`/${chainId}/${keep}/${txHash}`} passHref legacyBehavior>
        <Box as="a" display={'flex'} flexDirection="column" gap="5">
          <Stack direction={'horizontal'} justify="space-between" align="flex-start">
            <Stack>
              <Stack direction={'horizontal'} align="center">
                <User address={proposer} size="sm" />
                <Heading level="2">{title}</Heading>
              </Stack>
              <Stack direction={'horizontal'} align="center">
                <Tag label={profile ? profile?.handle : truncAddress(proposer)}>{prettyDate(timestamp)}</Tag>
              </Stack>
            </Stack>
            <Tag tone={status == 'Pending' ? 'blue' : 'green'} label={type}>
              {status}
            </Tag>
          </Stack>
          <Text>{description}</Text>
        </Box>
      </Link>
    </Card>
  )
}

export default Proposals
