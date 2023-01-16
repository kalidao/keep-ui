import { Avatar, Text, Stack } from '@kalidao/reality'
import Link from 'next/link'

type Props = {
  name: string
  chainId: number
  keep: string
  avatar: string | undefined
  bio: string | undefined
}

const KeepCard = ({ name, chainId, keep, avatar }: Props) => {
  console.log('name', name, avatar)
  return (
    <Link
      href={`/${chainId}/${keep}`}
      style={{
        textDecoration: 'none',
      }}
    >
      <Stack direction={'horizontal'} align="center">
        <Avatar
          shape="square"
          src={avatar ? avatar : ''}
          placeholder={avatar ? false : true}
          size="10"
          label={name + ' avatar'}
          address={keep}
        />
        <Text align="center" weight="bold">
          {name}
        </Text>
      </Stack>
    </Link>
  )
}

export default KeepCard
