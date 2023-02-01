import { Box, Avatar, Text, Stack, Tag } from '@kalidao/reality'
import Link from 'next/link'
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
  console.log('name', name, avatar)
  // check if keep has pending transactions
  const pendingTxs = txs.filter((tx: any) => tx.status === 'pending')
  const isPending = pendingTxs.length > 0 ? true : false

  return (
    <Link
      href={`/${chainId}/${keep}`}
      style={{
        textDecoration: 'none',
      }}
    >
      <Box className={styles.keepCard}>
        <Stack direction={'vertical'} align="center">
          <Avatar
            shape="circle"
            src={avatar ? avatar : ''}
            placeholder={avatar ? false : true}
            size="8"
            label={name + ' avatar'}
            address={keep}
            noBorder
          />
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
