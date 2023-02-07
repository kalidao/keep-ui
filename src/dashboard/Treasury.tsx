import { useMemo } from 'react'

import Link from 'next/link'

import { Box, Button, Card, Heading, IconArrowRight, Stack, Stat, Tag, Text } from '@kalidao/reality'
import { useQuery } from '@tanstack/react-query'
import { ethers } from 'ethers'
import { prettyDate } from '~/utils'
import { fetcher } from '~/utils'

import { useKeepStore } from './useKeepStore'

const Treasury = () => {
  const keep = useKeepStore()

  const tokens = keep.tokens

  const totalValueLocked = useMemo(() => {
    if (!tokens) {
      return 0
    }
    return tokens
      .reduce((acc: number, item: any) => {
        const price = item?.quote_rate ?? 0
        return acc + parseFloat(ethers.utils.formatUnits(item?.balance, item?.contract_decimals)) * price
      }, 0)
      .toFixed(2)
  }, [tokens])

  // order tokens by value
  const _tokens =
    tokens &&
    tokens.sort((a: any, b: any) => {
      const aVal = parseFloat(ethers.utils.formatUnits(a.balance, a.contract_decimals)) * a?.quote_rate
      const bVal = parseFloat(ethers.utils.formatUnits(b.balance, b.contract_decimals)) * b?.quote_rate
      return bVal - aVal
    })
  console.log('tokens', tokens, totalValueLocked, _tokens)

  // const _nfts = nfts ? nfts?.length : 0

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
              _tokens?.slice(0, 5).map((token: any) => {
                return (
                  <Stack key={token.contract_address} space="3">
                    <Stack direction={'horizontal'} justify={'space-between'} space="3">
                      <Stack direction={'horizontal'}>
                        <img src={token.logo_url} alt={token.name} width="20" height="20" />
                        <Text>{token.contract_ticker_symbol}</Text>
                      </Stack>
                      <Text>
                        {parseFloat(ethers.utils.formatUnits(token.balance, token.contract_decimals)).toFixed(1)}
                      </Text>
                    </Stack>
                  </Stack>
                )
              })}
          </Box>
          <Text color="foregroundSecondary">Synced {prettyDate(keep.treasuryUpdatedAt)}</Text>
        </Stack>
      </Card>
    </Link>
  )
}

export default Treasury
