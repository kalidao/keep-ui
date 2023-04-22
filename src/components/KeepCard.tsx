import Link from 'next/link'

import { Avatar, Box, Card, Stack, Tag, Text } from '@kalidao/reality'
import { getChainName } from '~/utils/network'

type KeepCardProps = {
  name: string
  keep: string
  chainId: number
  avatar: string
  txs: any[]
  bio: string
}

const KeepCard = ({ name, keep, chainId, avatar, txs, bio }: KeepCardProps) => {
  const linkHref = `/${chainId}/${keep}`
  const chainName = getChainName(chainId)
  const notExecutedTxs = txs?.filter((tx) => tx.status != 'executed')

  return (
    <Link
      href={linkHref}
      passHref
      style={{
        all: 'unset',
      }}
    >
      <Card borderRadius={'2xLarge'} hover shadow>
        <Box padding="3">
          <Stack direction={'horizontal'} justify="space-between">
            <Avatar src={avatar} label={`${name} DAO`} size="16" />
            <Box
              width="full"
              display="flex"
              flexDirection="column"
              gap="1"
              justifyContent={'flex-start'}
              alignItems="flex-start"
            >
              <Text weight="semiBold" font="mono" size="inherit">
                {name}
              </Text>
              <Text weight="light" size="label" font="mono" color="textSecondary">
                {bio}
              </Text>
            </Box>
          </Stack>
        </Box>
        <Box
          width="full"
          borderTopWidth="0.375"
          borderColor="backgroundTertiary"
          paddingX="4"
          paddingY="4"
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent={'flex-start'}
          gap="1"
        >
          {notExecutedTxs?.length > 0 ? (
            <Tag tone="orange" size="small" label={`${notExecutedTxs.length}`}>
              Transactions
            </Tag>
          ) : null}
          <Tag size="small">{chainName}</Tag>
        </Box>
      </Card>
    </Link>
  )
}

export default KeepCard
