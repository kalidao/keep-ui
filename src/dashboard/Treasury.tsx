import { useMemo } from 'react'

import { Box, Button, Card, Heading, IconArrowRight, Stack, Stat, Tag, Text } from '@kalidao/reality'
import { ethers } from 'ethers'
import { prettyDate } from '~/utils'

type Props = {
  tokens: any
  synced: string
}

const Treasury = ({ tokens, synced }: Props) => {
  const totalValueLocked = useMemo(() => {
    if (!tokens) {
      return 0
    }
    tokens.reduce((acc: number, item: any) => {
      console.log('acc total balance', acc, item)
      const price = item?.quote_rate ?? 0
      return acc + parseFloat(ethers.utils.formatUnits(item?.balance, item?.contract_decimals)) * price
    }, 0)
  }, [tokens])
  // order tokens by value
  const _tokens =
    tokens &&
    tokens
      // .filter((token: any) => {
      //   // filter out tokens with no value

      //   const value = parseFloat(ethers.utils.formatUnits(token.balance, token.contract_decimals)) * token?.quote_rate
      //   return value > 0
      // })
      .sort((a: any, b: any) => {
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
