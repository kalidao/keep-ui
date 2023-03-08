import Link from 'next/link'

import { Avatar, Box, Heading, IconDiscord, IconLink, IconTwitter, Stack, Text } from '@kalidao/reality'
import { ChainMirror } from '~/dashboard/chain-mirror'
import { EditProfile } from '~/dashboard/profile/edit'
import { useKeepStore } from '~/dashboard/useKeepStore'
import { useGetKeep } from '~/hooks/useGetKeep'
import { getExplorerLink } from '~/utils/getExplorerLink'
import { prettyDateShort } from '~/utils/prettyDate'
import { getTwitterUsername, prettyLink } from '~/utils/prettyLink'

import * as styles from './styles.css'

type Props = {
  summoned: string
  name: string
  avatar: string
  address: string
  bio?: string
  website?: string
  twitter?: string
  discord?: string
  chainId: number
}

const Profile = ({ summoned, name, avatar, bio, twitter, website, discord, address, chainId }: Props) => {
  const state = useKeepStore((state) => state)
  const { data, refetch } = useGetKeep(state.chainId || 1, state.address || '0x0')
  const avatarUrl = avatar ? avatar : avatar === '' ? '/logo.jpeg' : '/logo.jpeg'

  return (
    <Box className={styles.profileContainer}>
      <Box width="full">
        <Box padding="5" display="flex" alignItems={'flex-start'} justifyContent="space-between" gap="10">
          <Link href={`/${chainId}/${address}/`}>
            <Avatar
              shape="circle"
              size={{
                xs: '16',
                lg: '32',
              }}
              label="brand_pic"
              src={avatarUrl}
              address={address}
              noBorder
            />
          </Link>
          <Box width="full" display="flex" flexDirection={'column'} gap="1">
            <Link
              href={`/${chainId}/${address}/`}
              style={{
                textDecoration: 'none',
              }}
            >
              <Heading level="2">{name}</Heading>
            </Link>
            <Text
              size={{
                xs: 'small',
                lg: 'base',
              }}
              font="mono"
            >
              <i>{bio}</i>
            </Text>
          </Box>
          <EditProfile
            callback={async () => {
              await refetch()
            }}
          />
        </Box>
        <Box className={styles.infoBar}>
          <a
            target="_blank"
            rel="noopenner noreferrer"
            href={getExplorerLink(address, 'address', chainId)}
            className={styles.labelledLink}
          >
            <Text color="textSecondary" font="mono">
              🎂 {prettyDateShort(summoned)}
            </Text>
          </a>
          <Stack direction={'horizontal'} align="center" space="1">
            {twitter && (
              <Link href={twitter} className={styles.labelledLink}>
                <IconTwitter className={styles.socialIcon} />
                <Text color="textSecondary">{getTwitterUsername(twitter)}</Text>
              </Link>
            )}
            {website && (
              <Link href={website} className={styles.labelledLink}>
                <IconLink className={styles.socialIcon} />
                <Text color="textSecondary">{prettyLink(website)}</Text>
              </Link>
            )}
            {discord && (
              <Link href={discord}>
                <IconDiscord className={styles.socialIcon} />
              </Link>
            )}
            <ChainMirror address={address} />
          </Stack>
        </Box>
      </Box>
    </Box>
  )
}

export default Profile
