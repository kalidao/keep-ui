import { Avatar, Stack, Text } from '@kalidao/reality'
import { useEnsName } from 'wagmi'
import { useGetUser } from '~/hooks/useGetUser'
import { truncAddress } from '~/utils'
import { convertIpfsHashToGatewayUrl } from '~/utils/upload'

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
  const avatarUrl = user
    ? user?.picture?.verified
      ? user?.picture?.uri
      : convertIpfsHashToGatewayUrl(user?.picture?.original?.url)
    : ''

  if (size === 'sm') {
    return <Avatar size="8" src={avatarUrl} label={address} address={address} />
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

  return (
    <Stack direction="horizontal" align="center">
      <Avatar size="8" src={avatarUrl ?? '/images/kali_napping.png'} label={address} address={address} />
      <Text>{name}</Text>
    </Stack>
  )
}
