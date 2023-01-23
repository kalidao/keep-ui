import { ethers } from 'ethers'
import 'react-step-progress-bar/styles.css'
import { ProgressBar } from 'react-step-progress-bar'
import { Avatar, Card, Divider, Heading, Stack, Box, Tag, Text } from '@kalidao/reality'
import { useKeepStore } from '~/dashboard/useKeepStore'
import { fetcher } from '~/utils'
import { useQuery } from '@tanstack/react-query'
import { bodoni } from 'pages/_app'
import { capitalize } from '~/utils/capitalize'
import { useEnsName } from 'wagmi'
import { truncAddress } from '~/utils'
import { useTxStore } from '~/dashboard/useTxStore'
import { VoteProgress } from './VoteProgress'
import { Sig } from '~/dashboard/types'
import { Result } from './Result'

const Quorum = () => {
  const tx = useTxStore((state) => state)

  return (
    <Card
      padding="6"
      width={{
        xs: 'full',
        lg: '1/4',
      }}
    >
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
          <Signer key={sig.signer + sig.type} signer={sig.signer} type={sig.type} />
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
  const { data: user, error } = useQuery(['signerDashProfile', signer], () =>
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
