import { Card, Box, Stack, Heading, Text, Button, IconArrowRight, Stat, Tag } from '@kalidao/reality'
import { ethers } from 'ethers'
import { prettyDate } from '~/utils'
import { capitalize } from '~/utils/capitalize'

type Props = {
  tokens: any
  synced: string
}

const Treasury = ({ tokens, synced }: Props) => {
  const totalValueLocked =
    tokens &&
    tokens
      .reduce((acc: any, token: any) => {
        return acc + parseFloat(ethers.utils.formatUnits(token.balance, token.contract_decimals)) * token?.quote_rate
      }, 0)
      .toFixed(2)
  // order tokens by value
  const _tokens =
    tokens &&
    tokens
      .filter((token: any) => {
        // filter out tokens with no value

        const value = parseFloat(ethers.utils.formatUnits(token.balance, token.contract_decimals)) * token?.quote_rate
        return value > 0
      })
      .sort((a: any, b: any) => {
        const aVal = parseFloat(ethers.utils.formatUnits(a.balance, a.contract_decimals)) * a?.quote_rate
        const bVal = parseFloat(ethers.utils.formatUnits(b.balance, b.contract_decimals)) * b?.quote_rate
        return bVal - aVal
      })
  console.log('tokens', tokens)

  // const _nfts = nfts ? nfts?.length : 0

  return (
    <Card
      padding="6"
      width={{
        sm: 'full',
        md: 'full',
        lg: '96',
      }}
    >
      <Stack>
        <Stack direction={'horizontal'} align="center" justify={'space-between'}>
          <Heading>Treasury</Heading>
          <Tag tone="green" label={`$`}>
            {totalValueLocked}
          </Tag>
        </Stack>
        <Box height="40" display="flex" flexDirection={'column'} gap="3">
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
