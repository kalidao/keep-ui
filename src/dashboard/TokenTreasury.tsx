import { useMemo } from 'react'

import { Box, Stack, Text } from '@kalidao/reality'
import { useQuery } from '@tanstack/react-query'
import { ethers } from 'ethers'
import { prettyDate } from '~/utils'
import { fetcher } from '~/utils'
import { getExplorerLink } from '~/utils/getExplorerLink'

import * as styles from './treasury.css'
import { useKeepStore } from './useKeepStore'

const Treasury = () => {
  const keep = useKeepStore()

  const tokens = keep.tokens
  const synced = keep.treasuryUpdatedAt

  console.log('tokens', keep, tokens, synced)

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
    tokens
      .filter((token: any) => {
        return parseFloat(ethers.utils.formatUnits(token.balance, token.contract_decimals)) > 0
      })
      .sort((a: any, b: any) => {
        const aVal = parseFloat(ethers.utils.formatUnits(a.balance, a.contract_decimals)) * a?.quote_rate
        const bVal = parseFloat(ethers.utils.formatUnits(b.balance, b.contract_decimals)) * b?.quote_rate
        return bVal - aVal
      })
  console.log('tokens', tokens, totalValueLocked, _tokens)

  // const _nfts = nfts ? nfts?.length : 0

  return (
    <Box
      width="full"
      padding="6"
      minHeight={'viewHeight'}
      display="flex"
      flexDirection={'column'}
      justifyContent="space-between"
    >
      <Stack>
        {totalValueLocked && (
          <Box padding="3" backgroundColor={'accentSecondaryHover'} borderRadius="2xLarge">
            <Text size="extraLarge" weight="light">
              Total Value Locked
            </Text>

            <Text size="extraLarge" weight="bold">
              {totalValueLocked} USD
            </Text>
          </Box>
        )}
        <Box display="flex" flexDirection={'column'} gap="3">
          {_tokens &&
            _tokens?.slice(0, 5).map((token: any) => {
              return (
                <Box
                  key={token.contract_address}
                  padding="3"
                  as="a"
                  href={getExplorerLink(token.contract_address, 'address', keep.chainId ?? 1)}
                  target="_blank"
                  className={styles.tokenLinkCard}
                >
                  <Stack direction={'horizontal'} justify={'space-between'} space="3">
                    <Stack direction={'horizontal'}>
                      <img src={token.logo_url} alt={token.name} width="20" height="20" />
                      <Text>{token.contract_name}</Text>
                    </Stack>
                    <Text weight="semiBold">
                      {parseFloat(ethers.utils.formatUnits(token.balance, token.contract_decimals)).toFixed(1)}{' '}
                      {token.contract_ticker_symbol}
                    </Text>
                  </Stack>
                </Box>
              )
            })}
        </Box>
      </Stack>
      <Text color="foregroundSecondary">Synced {prettyDate(synced)}</Text>
    </Box>
  )
}

export default Treasury
