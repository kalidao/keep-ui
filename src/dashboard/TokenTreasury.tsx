import { Avatar, Box, Stack, Text } from '@kalidao/reality'
import { useAccountBalance } from 'ankr-react'
import { ethers } from 'ethers'
import { getBlockchainByChainId } from '~/utils/ankr'
import { getExplorerLink } from '~/utils/getExplorerLink'

import * as styles from './treasury.css'
import { useKeepStore } from './useKeepStore'

const Treasury = () => {
  const keep = useKeepStore()
  const { data } = useAccountBalance({
    blockchain: keep.chainId ? getBlockchainByChainId(keep.chainId) : 'polygon',
    walletAddress: keep.address ? keep.address : ethers.constants.AddressZero,
  })

  const tokens = data ? data.assets : null

  const totalValueLocked = data ? parseFloat(data?.totalBalanceUsd).toFixed(2) : 0

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
          {tokens ? (
            tokens.map((token) => {
              if (token.tokenType === 'NATIVE') {
                return (
                  <Box key={token.contractAddress} className={styles.tokenCard}>
                    <Stack direction={'horizontal'} justify={'space-between'} space="3">
                      <Stack direction={'horizontal'}>
                        <Avatar shape="circle" src={token.thumbnail} label={token.tokenName} size="5" />
                        <Text>{token.tokenName}</Text>
                      </Stack>
                      <Text weight="semiBold">
                        {parseFloat(ethers.utils.formatUnits(token.balanceRawInteger, token.tokenDecimals)).toFixed(1)}{' '}
                        {token.tokenSymbol}
                      </Text>
                    </Stack>
                  </Box>
                )
              }

              return (
                <Box
                  key={token.contractAddress}
                  padding="3"
                  as="a"
                  href={
                    token?.contractAddress ? getExplorerLink(token.contractAddress, 'address', keep.chainId ?? 1) : ''
                  }
                  target="_blank"
                  className={styles.tokenLinkCard}
                >
                  <Stack direction={'horizontal'} justify={'space-between'} space="3">
                    <Stack direction={'horizontal'}>
                      <Avatar shape="circle" src={token.thumbnail} label={token.tokenName} size="5" />
                      <Text>{token.tokenName}</Text>
                    </Stack>
                    <Text weight="semiBold">
                      {parseFloat(ethers.utils.formatUnits(token.balanceRawInteger, token.tokenDecimals)).toFixed(1)}{' '}
                      {token.tokenSymbol}
                    </Text>
                  </Stack>
                </Box>
              )
            })
          ) : (
            <Text>Nothing to see here 😴</Text>
          )}
        </Box>
      </Stack>
    </Box>
  )
}

export default Treasury
