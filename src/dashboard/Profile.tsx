import Link from 'next/link'
import {
  Stack,
  Heading,
  Avatar,
  Text,
  Card,
  IconLink,
  IconTwitter,
  IconDiscord,
  Divider,
  Button,
  IconPlus,
} from '@kalidao/reality'
import * as styles from './styles.css'
import GiveMoney from './GiveMoney'

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
      <Stack space="10" align="center" justify={'space-between'}>
        <Stack direction="horizontal" align="center" justify={'space-between'}>
          <Avatar
            shape="circle"
            size={{
              xs: '16',
              lg: '32',
            }}
            label="brand_pic"
            src={avatar}
            address={address}
          />
          <Stack direction={'vertical'}>
            <Heading level="2">{name}</Heading>
            <Text
              size={{
                xs: 'small',
                lg: 'large',
              }}
            >
              {bio}
            </Text>
            <GiveMoney />
          </Stack>
        </Stack>
        <Divider />
        <Stack direction={'horizontal'} align="center" justify={'center'}>
          {twitter && (
            <Link href={twitter} className={styles.socialIcon}>
              <IconTwitter color="foreground" />
            </Link>
          )}

          {discord && (
            <Link href={discord} className={styles.socialIcon}>
              <IconDiscord color="foreground" />
            </Link>
          )}
          {website && (
            <Link href={website} className={styles.socialIcon}>
              <IconLink color="foreground" />
            </Link>
          )}
        </Stack>
      </Stack>
    </Card>
  )
}

export default Profile
