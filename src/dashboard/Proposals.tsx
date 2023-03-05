import Link from 'next/link'

import { Box, Heading, Stack, Tag, Text } from '@kalidao/reality'
import { useQuery } from '@tanstack/react-query'
import { JSONContent } from '@tiptap/react'
import { useGetTxs } from '~/hooks/useGetTxs'
import { useGetUser } from '~/hooks/useGetUser'
import { prettierStatus, prettierStatusColor } from '~/proposal/utils'
import { fetcher, prettyDate, truncAddress } from '~/utils'

import { JSONContentRenderer } from '~/components/Editor/JSONContent'
import Empty from '~/components/Empty'
import { User } from '~/components/User'

import * as styles from './activity.css'
import { useKeepStore } from './useKeepStore'

const Proposals = () => {
  const state = useKeepStore((state) => state)
  const { data: transactions, isError } = useGetTxs(Number(state.chainId), state.address ? state.address : '0x0')

  const filteredTransactions =
    !isError &&
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
    <>
      {filteredTransactions && filteredTransactions?.length != 0 ? (
        filteredTransactions?.map((transaction: any) => (
          <TxCard
            key={transaction.txHash}
            txHash={transaction.txHash}
            chainId={transaction.keepChainId}
            keep={transaction.keepAddress}
            proposer={transaction.userId}
            title={transaction.title}
            description={transaction.content}
            timestamp={transaction.createdAt}
            status={transaction.status}
          />
        ))
      ) : (
        <Empty />
      )}
    </>
  )
}

type TxCardProps = {
  chainId: string
  keep: string
  txHash?: string
  title: string
  proposer: string
  description: JSONContent
  timestamp: string
  status: 'pending' | 'process' | 'process_yes' | 'process_no' | 'executed'
}

export const TxCard = ({ chainId, keep, txHash, title, proposer, description, timestamp, status }: TxCardProps) => {
  const { data: profile } = useGetUser(proposer)

  return (
    <Box className={styles.cardRoot}>
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
            <Tag tone={prettierStatusColor(status)} label={'Tx'}>
              {prettierStatus(status)}
            </Tag>
          </Stack>
          <JSONContentRenderer content={description} />
        </Box>
      </Link>
    </Box>
  )
}

export default Proposals
