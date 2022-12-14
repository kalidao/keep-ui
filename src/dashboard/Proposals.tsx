import Link from 'next/link'
import { Card, Heading, Text, Stack, Button, IconPlus, Tag, Avatar, Box } from '@kalidao/reality'
import { useRouter } from 'next/router'
import { useQuery } from '@tanstack/react-query'
import { fetcher, prettyDate, truncAddress } from '~/utils'

const Proposals = () => {
  const router = useRouter()
  const { keep, chainId } = router.query
  console.log('keep', keep, chainId)
  const { data: transactions, error } = useQuery(['keepTxs', chainId, keep], async () =>
    fetcher(`${process.env.NEXT_PUBLIC_KEEP_API}/txs/${chainId}/${keep}/`),
  )

  console.log('proposals', transactions, error)
  return (
    <Box>
      <Stack>
        <Stack direction="horizontal" justify={'space-between'} align="center">
          <Heading>Proposals</Heading>
          <Link href={`/${chainId}/${keep}/create`} legacyBehavior>
            <Button shape="circle" as="a">
              <IconPlus />
            </Button>
          </Link>
        </Stack>
        {transactions &&
          transactions.length != 0 &&
          transactions?.map((transaction: any) => (
            <ProposalCard
              key={transaction.txHash}
              txHash={transaction.txHash}
              chainId={transaction.keepChainId}
              keep={transaction.keepAddress}
              proposer={transaction.authorAddress}
              title={transaction.title}
              description={transaction.content}
              timestamp={transaction.createdAt}
              type={'Transaction'}
              status={transaction.status}
            />
          ))}
      </Stack>
    </Box>
  )
}

type ProposalCardProps = {
  chainId: string
  keep: string
  txHash: string
  title: string
  proposer: string
  description: string
  timestamp: string
  type: 'Signal' | 'Transaction'
  status: 'Pending' | 'Voting' | 'Executed' | 'Canceled' // TODO: think more about status
}

const ProposalCard = ({
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

  return (
    <Card padding="6" backgroundColor={'backgroundSecondary'} shadow hover>
      <Stack>
        <Link href={`/${chainId}/${keep}/${txHash}`} passHref legacyBehavior>
          <Box as="a" display={'flex'} flexDirection="column" gap="5">
            <Stack direction={'horizontal'} justify="space-between" align="flex-start">
              <Stack>
                <Stack direction={'horizontal'} align="center">
                  <Avatar src={profile?.picture?.original?.url} label={`profile picture ${proposer}`} size="8" />
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

export default Proposals
