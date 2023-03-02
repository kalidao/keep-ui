import Link from 'next/link'

import { Avatar, Box, Stack, Tag, Text } from '@kalidao/reality'

import * as styles from './styles.css'

type Props = {
  name: string
  chainId: number
  keep: string
  avatar: string | undefined
  bio: string | undefined
  txs: any
}

const KeepCard = ({ name, chainId, keep, avatar, txs }: Props) => {
  // check if keep has pending transactions
  const pendingTxs = txs.filter((tx: any) => tx.status === 'pending')
  const isPending = pendingTxs.length > 0 ? true : false
  const avatarUrl = avatar ? avatar : avatar === '' ? '/logo.jpeg' : '/logo.jpeg'

  return (
    <Link
      href={`/${chainId}/${keep}`}
      style={{
        textDecoration: 'none',
      }}
    >
      <Box className={styles.keepCard}>
        <Stack direction={'vertical'} align="center">
          <Avatar shape="circle" src={avatarUrl} size="8" label={name + ' avatar'} address={keep} noBorder />
          <Text align="center">{name}</Text>
        </Stack>
        {isPending && (
          <Tag tone="green" size="small">
            {pendingTxs.length}
          </Tag>
        )}
      </Box>
    </Link>
  )
}

export default KeepCard
