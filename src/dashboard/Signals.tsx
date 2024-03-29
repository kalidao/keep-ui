import Link from 'next/link'
import { useRouter } from 'next/router'

import { Box, Heading, Stack, Tag, Text } from '@kalidao/reality'
import { useQuery } from '@tanstack/react-query'
import { JSONContent } from '@tiptap/react'
import { ethers } from 'ethers'
import { useGetUser } from '~/hooks/useGetUser'
import { fetcher, prettyDate, truncAddress } from '~/utils'

import { JSONContentRenderer } from '~/components/Editor/JSONContent'
import Empty from '~/components/Empty'
import { User } from '~/components/user'

import * as styles from './activity.css'

const Signals = () => {
  const router = useRouter()
  const { keep, chainId } = router.query
  const { data: signals } = useQuery(['keepSignals', chainId, keep], async () => {
    if (!keep) return
    if (!chainId) return
    if (!ethers.utils.isAddress(keep.toString())) return

    const res = await fetcher(`${process.env.NEXT_PUBLIC_KEEP_API}/signals?chainId=${chainId}&address=${keep}`)
    if (res.status !== 'success') {
      throw new Error('')
    }
    const signals = res.data.signals

    return signals.sort((a: any, b: any) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    })
  })

  return (
    <>
      {signals && signals?.length != 0 ? (
        signals?.map((signal: any) => (
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
        ))
      ) : (
        <Empty />
      )}
    </>
  )
}

type SignalCardProps = {
  chainId: string
  keep: string
  id: string
  title: string
  proposer: string
  description: JSONContent
  timestamp: string
  type: 'Signal'
}

export const SignalCard = ({
  chainId,
  keep,
  id,
  title,
  proposer,
  description,
  timestamp,
  type = 'Signal',
}: SignalCardProps) => {
  const { data: profile } = useGetUser(proposer)

  return (
    <Box className={styles.cardRoot}>
      <Stack>
        <Link href={`/${chainId}/${keep}/signal/${id}`} passHref legacyBehavior>
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
              <Tag tone="secondary">{type}</Tag>
            </Stack>
            <JSONContentRenderer content={description} />
          </Box>
        </Link>
      </Stack>
    </Box>
  )
}

export default Signals
