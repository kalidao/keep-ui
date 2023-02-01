import Link from 'next/link'

import {
  Avatar,
  Box,
  Button,
  Card,
  Divider,
  Heading,
  IconDiscord,
  IconLink,
  IconPlus,
  IconTwitter,
  Stack,
  Text,
} from '@kalidao/reality'

import GiveMoney from './GiveMoney'
import * as styles from './styles.css'

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
      <Box display="flex" flexDirection={'column'} alignItems="center" justifyContent={'center'}>
        <Box>
          <Box display="flex" alignItems={'center'} justifyContent="center" gap="10">
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
          </Box>
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
        </Box>
      </Box>
    </Card>
  )
}

export default Profile
