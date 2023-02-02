import { useMemo } from 'react'

import { Box, Button, Card, Heading, IconArrowRight, Stack, Stat, Tag, Text } from '@kalidao/reality'
import { useQuery } from '@tanstack/react-query'
import { ethers } from 'ethers'
import { prettyDate } from '~/utils'
import { fetcher } from '~/utils'

import { useKeepStore } from './useKeepStore'

const Treasury = () => {
  const keep = useKeepStore()
  const { data: treasury } = useQuery(
    ['keep', 'treasury', keep.chainId, keep.address],
    async () => {
      return fetcher(`${process.env.NEXT_PUBLIC_KEEP_API}/keeps/${keep.chainId}/${keep.address}/treasury`)
    },
    {
      enabled: !!keep.chainId && !!keep.address,
    },
  )

  const tokens = treasury?.items
  const synced = treasury?.updated_at

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
    <Card padding="6" width="full">
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
        <Text color="foregroundSecondary">Synced {prettyDate(synced)}</Text>
      </Stack>
    </Card>
  )
}

export default Treasury
