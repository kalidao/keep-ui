import { useEnsName } from 'wagmi'
import { useQuery } from '@tanstack/react-query'
import { fetcher } from '~/utils'
import { Avatar, Card, Heading, Stack, Text } from '@kalidao/reality'
import { truncAddress } from '~/utils'

export const User = ({ address, size }: { address: string; size: 'sm' | 'lg' }) => {
  const { data: ensName } = useEnsName({
    address: address as `0x${string}`,
    chainId: 1,
  })
  const { data: user, error } = useQuery(['signerDashProfile', address], () =>
    fetcher(`${process.env.NEXT_PUBLIC_KEEP_API}/users/${address}`),
  )

  if (size === 'sm') {
    return (
      <Avatar
        size="8"
        src={user?.picture?.uri ? user?.picture?.uri : user?.picture?.original?.url}
        label={address}
        address={address}
      />
    )
  }

  return (
    <Stack direction="horizontal" align="center">
      <Avatar
        size="8"
        src={user?.picture?.uri ? user?.picture?.uri : user?.picture?.original?.url}
        label={address}
        address={address}
      />
      <Text>{user?.handle != undefined ? user?.handle : ensName ? ensName : truncAddress(address)}</Text>
    </Stack>
  )
}
