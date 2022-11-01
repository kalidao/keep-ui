import Link from 'next/link'
import {
  Card,
  Heading,
  Text,
  Stack,
  Button,
  IconPlus,
  Tag,
  IconCheck,
  IconClose,
  IconArrowRight,
  Avatar,
} from '@kalidao/reality'
import { useRouter } from 'next/router'
import { useQuery } from '@tanstack/react-query'
import { chain, chainId } from 'wagmi'
import { fetcher } from '~/utils'

const Proposals = () => {
  const router = useRouter()
  const { keep, chainId } = router.query
  console.log('keep', keep, chainId)
  const { data: transactions, error } = useQuery(['keepTxs', chainId, keep], async () =>
    fetcher(`${process.env.NEXT_PUBLIC_KEEP_API}/txs/${chainId}/${keep}/`),
  )

  console.log('proposals', transactions, error)
  return (
    <Card level="1" padding="6">
      <Stack>
        <Stack direction="horizontal" justify={'space-between'} align="center">
          <Heading>Proposals</Heading>
          <Link href={`/${chainId}/${keep}/create`}>
            <Button shape="circle" as="a">
              <IconPlus />
            </Button>
          </Link>
        </Stack>
        {transactions?.map((transaction: any) => (
          <ProposalCard
            key={transaction.txHash}
            txHash={transaction.txHash}
            chainId={transaction.keepChainId}
            keep={transaction.keepAddress}
            proposer={'shivanshi.eth'}
            title={transaction.title}
            description={transaction.content}
            timestamp={transaction.createdAt}
            type={'Transaction'}
            status={transaction.status}
          />
        ))}
      </Stack>
    </Card>
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
  return (
    <Card padding="6" level="2">
      <Stack>
        <Stack direction={'horizontal'} justify="space-between" align="flex-start">
          <Stack>
            <Stack direction={'horizontal'} align="center">
              <Avatar src="" label="poster" placeholder />
              <Heading level="2">{title}</Heading>
            </Stack>
            <Tag label={proposer}>{timestamp}</Tag>
          </Stack>
          <Tag tone={status == 'Pending' ? 'blue' : 'green'} label={type}>
            {status}
          </Tag>
        </Stack>
        <Text>{description}</Text>
        <Stack direction={'horizontal'} align="center" justify={'space-between'}>
          <Stack direction={'horizontal'}>
            <Button tone="green" shape="circle" size="small" variant="secondary">
              <IconCheck />
            </Button>
            <Button tone="red" shape="circle" size="small" variant="secondary">
              <IconClose />
            </Button>
          </Stack>
          <Link href={`/${chainId}/${keep}/${txHash}`}>
            <Button tone="accent" size="medium" variant="secondary">
              <IconArrowRight />
            </Button>
          </Link>
        </Stack>
      </Stack>
    </Card>
  )
}

export default Proposals
