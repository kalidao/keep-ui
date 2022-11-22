import { Heading, Avatar, Text, Stack, Box, Card, Button, IconArrowRight } from '@kalidao/reality'
import Link from 'next/link'
import Image from 'next/image'

type Props = {
  name: string
  chainId: number
  keep: string
  avatar: string | undefined
  bio: string | undefined
}

const KeepCard = ({ name, chainId, keep, avatar, bio }: Props) => {
  console.log('name', name, avatar)
  return (
    <Link href={`/${chainId}/${keep}`}>
      <a
        style={{
          all: 'unset',
        }}
      >
        <Stack direction={'vertical'}>
          <Avatar
            noBorder
            shape="square"
            src={avatar ? avatar : ''}
            placeholder={avatar ? false : true}
            size="64"
            label={name + ' avatar'}
            address={keep}
          />
          <Text align="center" weight="bold">
            {name}
          </Text>
        </Stack>
      </a>
    </Link>
  )
}

export default KeepCard
