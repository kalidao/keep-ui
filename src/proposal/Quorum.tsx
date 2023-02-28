import 'react-step-progress-bar/styles.css'

import { Avatar, Box, Card, Divider, Heading, Stack, Tag, Text } from '@kalidao/reality'
import { useQuery } from '@tanstack/react-query'
import { bodoni } from 'pages/_app'
import { useEnsName } from 'wagmi'
import { Sig } from '~/dashboard/types'
import { useTxStore } from '~/dashboard/useTxStore'
import { fetcher } from '~/utils'
import { truncAddress } from '~/utils'
import { capitalize } from '~/utils/capitalize'

import { Result } from './Result'
import { VoteProgress } from './VoteProgress'

const Quorum = () => {
  const tx = useTxStore((state) => state)

  return (
    <Card padding="6" width="full">
      <Stack>
        <Stack direction={'horizontal'} align="center" justify={'space-between'}>
          <Heading>Status</Heading>
          <Tag size="medium" tone="green">
            {capitalize(tx?.status ? tx?.status : '')}
          </Tag>
        </Stack>
        <Divider />
        {tx.status === 'executed' ? <Result /> : <VoteProgress />}
        <Divider />
        <Box
          style={{
            fontFamily: bodoni.style.fontFamily,
            fontStyle: 'italic',
            fontWeight: bodoni.style.fontWeight,
            fontSize: 24,
          }}
        >
          Signed
        </Box>
        {tx?.sigs?.map((sig: Sig) => (
          <Signer key={sig.userId + sig.type} signer={sig.userId} type={sig.type} />
        ))}
      </Stack>
    </Card>
  )
}

export const Signer = ({ signer, type }: { signer: string; type: 'yes' | 'no' }) => {
  const { data: ensName } = useEnsName({
    address: signer as `0x${string}`,
    chainId: 1,
  })
  const { data: user } = useQuery(['signerDashProfile', signer], () =>
    fetcher(`${process.env.NEXT_PUBLIC_KEEP_API}/users/${signer}`),
  )

  return (
    <Stack direction={'horizontal'} align="center" justify={'space-between'}>
      <Stack direction="horizontal" align="center">
        <Avatar
          size="8"
          src={user?.picture?.uri ? user?.picture?.uri : user?.picture?.original?.url}
          label={signer}
          address={signer}
        />
        <Text>{user?.handle != undefined ? user?.handle : ensName ? ensName : truncAddress(signer)}</Text>
      </Stack>
      <Tag tone={type === 'yes' ? 'green' : 'red'}>{type === 'yes' ? 'Approved' : 'Rejected'}</Tag>
    </Stack>
  )
}

export default Quorum
