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

type Sig = {
  signer: string
  type: 'yes' | 'no'
  v: string
  r: string
  s: string
}

const Quorum = () => {
  const keep = useKeepStore((state) => state)
  const tx = useTxStore((state) => state)
  const { data } = useQuery(['keep', keep.chainId, keep.address], async () => {
    const result = await fetcher(`${process.env.NEXT_PUBLIC_KEEP_API}/keeps/${keep.chainId}/${keep.address}/`)
    return result
  })

  const quorum = data ? ethers.utils.formatUnits(data?.threshold, 0) : 0

  const yesSigs = tx?.sigs?.filter((sig: Sig) => sig.type === 'yes')
  const noSigs = tx?.sigs?.filter((sig: Sig) => sig.type === 'no')

  const yesPercentage = tx && (yesSigs?.length / Number(quorum)) * 100
  const noPercentage = tx && (noSigs?.length / Number(quorum)) * 100

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

        <ProgressBar
          percent={yesPercentage}
          filledBackground="linear-gradient(to right, rgb(48, 209, 88), rgb(52, 199, 89))"
        />

        <Stack direction={'horizontal'} align="center" justify={'space-between'}>
          <Text weight="semiBold">Yes</Text>
          <Text weight="semiBold">
            {yesSigs?.length}/{data?.threshold}
          </Text>
        </Stack>
        <ProgressBar
          percent={noPercentage}
          filledBackground="linear-gradient(to right, rgb(255, 69, 58), rgb(255, 59, 48))"
        />
        <Stack direction={'horizontal'} align="center" justify={'space-between'}>
          <Text weight="semiBold">No</Text>
          <Text weight="semiBold">
            {noSigs?.length}/{data?.threshold}
          </Text>
        </Stack>
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
          <Signer key={sig.signer} signer={sig.signer} type={sig.type} />
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
