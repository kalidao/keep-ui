import Link from 'next/link'
import { Stack, Heading, Avatar, Text, Card, IconLink } from '@kalidao/reality'
import Image from 'next/image'
import { FaDiscord, FaTwitter, FaTelegramPlane } from 'react-icons/fa'

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
        <Stack direction="horizontal" align="center" justify={"space-between"}>
        <Avatar shape="circle" size="32" label="brand_pic" src={avatar} address={address} />
        <Stack direction={"vertical"}>
        <Heading>{name}</Heading>
        <Text>{bio}</Text>
        </Stack>
        </Stack>
        <hr
          style={{
            marginTop: '30px',
            marginBottom: '30px', 
            width: '100%',
            borderRadius: '20px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        />
        <Stack direction={'horizontal'}>
          {twitter && (
            <Link href={twitter}>
              <FaTwitter color="white" size="25" />
            </Link>
          )}
          {website && (
            <Link href={website}>
              <IconLink color="white" />
            </Link>
          )}
          {discord && (
            <Link href={discord}>
              <FaDiscord color="white" size="25" />
            </Link>
          )}
        </Stack>
      </Stack>
    </Card>
  )
}

export default Profile
