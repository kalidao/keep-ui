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

  if (size === 'sm') {
    return <Avatar size="8" src={user?.avatar} label={address} address={address} />
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
      <Avatar size="8" src={user?.avatar ?? '/images/kali_napping.png'} label={address} address={address} />
      <Text>{name}</Text>
    </Stack>
  )
}
export const UserName = ({
  address,
  alias,
  login,
}: {
  address: string
  alias?: string
  login?: boolean
}) => {
  const { data: ensName } = useEnsName({
    address: address as `0x${string}`,
    chainId: 1,
  })
  const { data: user } = useGetUser(address)


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
  console.log("name", name)
  return (
    <Stack direction="horizontal" align="center">
      <Text>{name}</Text>
    </Stack>
  )
}
