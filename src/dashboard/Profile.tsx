import Link from 'next/link'
import { Stack, Heading, Avatar, Text, Card } from '@kalidao/reality'
import Image from 'next/image'
import { FaDiscord, FaTwitter, FaTelegramPlane } from 'react-icons/fa'

type Props = {
  name: string
  avatar: string
  address: string
  bio?: string
  twitter?: string
  discord?: string
}

const Profile = ({ name, avatar, bio, twitter, discord, address }: Props) => {
  return (
    <Card padding="6" width="full">
      <Stack space="4" align="center" justify={'center'}>
        <Avatar shape="circle" size="24" label="brand_pic" src={avatar} placeholder address={address} />
        <Heading>{name}</Heading>
        <Text>{bio}</Text>
        <hr
          style={{
            width: '100%',
            borderRadius: '20px',
            border: '1px solid white',
          }}
        />
        <Stack direction={'horizontal'}>
          {discord && (
            <Link href={discord}>
              <FaDiscord color="white" size="25" />
            </Link>
          )}
          {twitter && (
            <Link href={twitter}>
              <FaTwitter color="white" size="25" />
            </Link>
          )}
        </Stack>
      </Stack>
    </Card>
  )
}

export default Profile
