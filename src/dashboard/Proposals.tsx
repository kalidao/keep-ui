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

const Proposals = () => {
  const proposals = [
    {
      id: 1,
      title: 'Ad time error checking',
      proposer: '0xCB0592589602B841BE035e1e64C2A5b1Ef006aa2',
      ens: 'shivanshi.eth',
      description:
        'Given enough time for checking and reporting, Mista Khalid will make use of ad tracking to check for errors after the actual time has passed. Clients are charged for billable amounts upwards of 3 seconds. However, ad at times error and results in freebie ads. Currently, no way to check or clean up are available. This change allows ad maker to clean up at scale given enough time, only paying for ad within half or full tolerance time. Half or full time will always be provided by network starting from the actual ad end. i.e. 5/5/5 ratio or 5/5/10 respectively. Note: Ads maybe extended by certain percent depending on minutes left. Extend duration can be considered upon airdrop distance.',
      timestamp: '20th October, 2022',
      type: 'Transaction',
      status: 'Voting',
    },
    {
      id: 2,
      title: 'Zoom ad length',
      proposer: '0x429Da5D385F5cef5D50413Bb7525933D9C65355B',
      ens: 'ross.eth',
      description:
        'Zoom Ad length, i.e. increase of tolerance time for full script ads to 5/5/5 ratio or 5/5/15 respectively. A network wide upgrade will make advertising a more liberating affair as ads could be extended by certain percentage on either side depending on minutes left. Clients can specify a time range first, later auto extend mode to discover a tiny amount of value. Default 3 seconds ad becomes 5-6 seconds instead, depending on the time left. Extended duration will be reflected in their credit amount too. All calculators must be updated to accommodate latest changes into their algorithms to calculate total credits available on their side. Also, they will add latest block value too into their calculations to determine rerun condition. Current limit is check or report till ads talk at least 50% of their duration for reruns. While New defaults to check or report till ads talk till they are finished executing for rerun conditions.',
      timestamp: '17th December, 2021',
      type: 'Signal',
      status: 'Pending',
    },
  ]
  return (
    <Card level="1" padding="6">
      <Stack>
        <Stack direction="horizontal" justify={'space-between'} align="center">
          <Heading>Proposals</Heading>
          <Button shape="circle">
            <IconPlus />
          </Button>
        </Stack>
        {proposals.map((proposal) => (
          <ProposalCard
            key={proposal.id}
            proposer={proposal.proposer}
            ens={proposal.ens}
            title={proposal.title}
            description={proposal.description}
            timestamp={proposal.timestamp}
            type={proposal.type}
            status={proposal.status}
          />
        ))}
      </Stack>
    </Card>
  )
}

type ProposalCardProps = {
  title: string
  proposer: string
  ens: string
  description: string
  timestamp: string
  type: 'Signal' | 'Transaction'
  status: 'Pending' | 'Voting' | 'Executed' | 'Canceled' // TODO: think more about status
}

const ProposalCard = ({ title, proposer, ens, description, timestamp, type, status }: ProposalCardProps) => {
  return (
    <Card padding="6" level="2">
      <Stack>
        <Stack direction={'horizontal'} justify="space-between" align="flex-start">
          <Stack>
            <Stack direction={'horizontal'} align="center">
              <Avatar src="" label="poster" placeholder address={proposer} />
              <Heading level="2">{title}</Heading>
            </Stack>
            <Tag label={ens}>{timestamp}</Tag>
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
          <Button tone="accent" size="medium" variant="secondary">
            <IconArrowRight />
          </Button>
        </Stack>
      </Stack>
    </Card>
  )
}

export default Proposals
