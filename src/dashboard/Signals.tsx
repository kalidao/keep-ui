import Link from 'next/link'
import { useRouter } from 'next/router'

import { Avatar, Box, Button, Card, Heading, IconPlus, Stack, Tag, Text } from '@kalidao/reality'
import { useQuery } from '@tanstack/react-query'
import { fetcher, prettyDate, truncAddress } from '~/utils'

import { User } from '~/components/User'

const Signals = () => {
  const router = useRouter()
  const { keep, chainId } = router.query
  const { data: signals, error } = useQuery(['keepSignals', chainId, keep], async () => {
    const signals = fetcher(`${process.env.NEXT_PUBLIC_KEEP_API}/keeps/${chainId}/${keep}/signals`).then(
      (signals: any) => {
        // order by date created
        return signals.sort((a: any, b: any) => {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        })
      },
    )

    return signals
  })
  console.log('txs', signals)

  return (
    <Box padding="3" display="flex" flexDirection={'column'} gap="2">
      {signals &&
        signals?.length != 0 &&
        signals?.map((signal: any) => (
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
        ))}
    </Box>
  )
}

type SignalCardProps = {
  chainId: string
  keep: string
  id: string
  title: string
  proposer: string
  description: string
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
  const { data: profile } = useQuery(['proposalCard', proposer], async () => {
    return fetcher(`${process.env.NEXT_PUBLIC_KEEP_API}/users/${proposer}/`)
  })

  return (
    <Card padding="6" backgroundColor={'backgroundSecondary'} shadow hover>
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
              <Tag tone={status == 'Pending' ? 'blue' : 'green'} label={type}>
                {status}
              </Tag>
            </Stack>
            <Text>{description}</Text>
          </Box>
        </Link>
        <Stack direction={'horizontal'} align="center" justify={'space-between'}>
          {/* <Stack direction={'horizontal'}>
            <Button tone="green" shape="circle" size="small" variant="secondary">
              <IconCheck />
            </Button>
            <Button tone="red" shape="circle" size="small" variant="secondary">
              <IconClose />
            </Button>
          </Stack> */}
        </Stack>
      </Stack>
    </Card>
  )
}

export default Signals
