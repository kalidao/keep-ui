import Link from 'next/link'

import { Avatar, Box, Card, Heading, Stack, Tag, Text } from '@kalidao/reality'
import { useAccountBalance } from 'ankr-react'
import { ethers } from 'ethers'
import { getBlockchainByChainId } from '~/utils/ankr'

import { useKeepStore } from './useKeepStore'

const Treasury = () => {
  const keep = useKeepStore()
  const { data } = useAccountBalance({
    blockchain: keep.chainId ? getBlockchainByChainId(keep.chainId) : 'polygon',
    walletAddress: keep.address ? keep.address : ethers.constants.AddressZero,
  })

  const tokens = data ? data.assets : null

  const totalValueLocked = data ? parseFloat(data?.totalBalanceUsd).toFixed(2) : 0

  // order tokens by value
  const _tokens = tokens
    ? tokens.sort((a, b) => {
        return parseFloat(b.balanceUsd) - parseFloat(a.balanceUsd)
      })
    : []

  // const _nfts = nfts ? nfts?.length : 0

  if (_tokens?.length === 0) return null

  return (
    <Link
      href={`/${keep.chainId}/${keep.address}/treasury`}
      style={{
        all: 'unset',
      }}
    >
      <Card padding="6" width="full" hover shadow>
        <Stack>
          <Stack direction={'horizontal'} align="center" justify={'space-between'}>
            <Heading>Treasury</Heading>
            {totalValueLocked && (
              <Tag tone="green" label={`$`}>
                {totalValueLocked}
              </Tag>
            )}
          </Stack>
          <Box display="flex" flexDirection={'column'} gap="3">
            {_tokens &&
              _tokens?.slice(0, 5).map((token) => {
                return (
                  <Stack key={token.contractAddress} space="3">
                    <Stack direction={'horizontal'} justify={'space-between'} space="3">
                      <Stack direction={'horizontal'}>
                        <Avatar src={token.thumbnail} label={token.tokenName} size="5" />
                        <Text>{token.tokenSymbol}</Text>
                      </Stack>
                      <Text>{parseFloat(token.balance).toFixed(2)}</Text>
                    </Stack>
                  </Stack>
                )
              })}
          </Box>
        </Stack>
      </Card>
    </Link>
  )
}

export default Treasury
