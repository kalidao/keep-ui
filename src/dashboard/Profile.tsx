import Link from 'next/link'
import { Stack, Heading, Avatar, Text, Card, IconLink, IconTwitter, IconDiscord, Divider } from '@kalidao/reality'

type Props = {
  name: string
  avatar: string
  address: string
  bio?: string
  website?: string
  twitter?: string
  discord?: string
}

const Profile = ({ name, avatar, bio, twitter, website, discord, address }: Props) => {
  return (
    <Card padding="6" width="full">
      <Stack space="4" align="center" justify={'center'}>
        <Stack direction="horizontal" align="center" justify={'space-between'}>
          <Avatar shape="circle" size="32" label="brand_pic" src={avatar} address={address} />
          <Stack direction={'vertical'}>
            <Heading>{name}</Heading>
            <Text>{bio}</Text>
          </Stack>
        </Stack>
        <Divider />
        <Stack direction={'horizontal'}>
          {twitter && (
            <Link href={twitter}>
              <IconTwitter />
            </Link>
          )}
          {website && (
            <Link href={website}>
              <IconLink />
            </Link>
          )}
          {discord && (
            <Link href={discord}>
              <IconDiscord />
            </Link>
          )}
        </Stack>
      </Stack>
    </Card>
  )
}

export default Profile
