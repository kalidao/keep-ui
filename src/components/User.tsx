import { Avatar, Stack, Text } from '@kalidao/reality'
import { useEnsName } from 'wagmi'
import { useGetUser } from '~/hooks/useGetUser'
import { truncAddress } from '~/utils'

export const User = ({
  address,
  size,
  alias,
  login,
}: {
  address: string
  size: 'sm' | 'lg'
  alias?: string
  login?: boolean
}) => {
  const { data: ensName } = useEnsName({
    address: address as `0x${string}`,
    chainId: 1,
  })
  const { data: user } = useGetUser(address)

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

  const name = alias
    ? alias
    : user?.handle != undefined
    ? user?.handle
    : ensName
    ? ensName
    : address
    ? truncAddress(address)
    : login
    ? 'login.eth'
    : 'unknown'
  const avatar = user?.picture?.uri
    ? user?.picture?.uri
    : user?.picture?.original?.url
    ? user?.picture?.original?.url
    : '/images/kali_napping.png'

  return (
    <Stack direction="horizontal" align="center">
      <Avatar size="8" src={avatar} label={address} address={address} />
      <Text>{name}</Text>
    </Stack>
  )
}
