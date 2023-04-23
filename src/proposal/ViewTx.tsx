import React from 'react'

import { Box, IconChevronDown, Stack, Text } from '@kalidao/reality'
import { useQuery } from '@tanstack/react-query'
import { ethers } from 'ethers'
import { useKeepStore } from '~/dashboard/useKeepStore'
import { useTxStore } from '~/dashboard/useTxStore'
import { truncAddress } from '~/utils'

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@design/Collapsible'

import * as styles from './styles.css'

const ViewTx = () => {
  const [open, setOpen] = React.useState(false)
  const tx = useTxStore((state) => state)
  const keep = useKeepStore((state) => state)
  const { data } = useQuery(
    ['decodeTx', tx.data],
    async () => {
      const data = await fetch(
        `${process.env.NEXT_PUBLIC_KEEP_API}/about/tx?chainId=${keep.chainId}&data=${tx.data}&value=${tx.value}&to=${tx.to}`,
      )
      const json = await data.json()

      return json
    },
    {
      enabled: !!tx.data && !!tx.value && !!tx.to && !!keep.chainId,
    },
  )

  const renderDecodedFunctions = (decodedFunctions: any[]) => {
    console.log('decodedFunctions', decodedFunctions)
    return decodedFunctions.map((decodedFunction, index) => (
      <Box key={index} className={styles.viewTxBox}>
        {decodedFunction?.decoded_data?.decoded && (
          <>
            <Text>{decodedFunction?.decoded_data?.message || 'No message'}</Text>
            {decodedFunction?.decoded_data?.decoded && (
              <Box>
                {decodedFunction?.decoded_data?.decoded?.types?.map((type: string, i: number) => (
                  <Stack key={i} direction={'horizontal'} justify="space-between" align="center">
                    <Text>{type}</Text>
                    <Text weight="bold">{decodedFunction?.decoded_data?.decoded?.values[i]}</Text>
                  </Stack>
                ))}
              </Box>
            )}
          </>
        )}
      </Box>
    ))
  }

  return (
    <Collapsible className={styles.viewTxRoot} open={open} onOpenChange={setOpen}>
      <Box display="flex" flexDirection={'column'} gap="3">
        <CollapsibleTrigger asChild>
          <Box className={styles.viewTxTrigger}>
            <Text>
              {data
                ? data?.ok === true
                  ? data?.message || 'No message'
                  : 'Unknown Transaction Summary'
                : 'Transaction Summary'}
            </Text>
            <IconChevronDown />
          </Box>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <Stack direction="vertical" space="1">
            <Box className={styles.viewTxBox}>
              <Stack direction={'horizontal'} justify="space-between" align="center">
                <Text>Type</Text>
                <Text weight="bold">{tx?.op?.toUpperCase()}</Text>
              </Stack>
              <Stack direction={'horizontal'} justify="space-between" align="center">
                <Text>Nonce</Text>
                <Text weight="bold">{tx?.nonce}</Text>
              </Stack>
              <Stack direction={'horizontal'} justify="space-between" align="center">
                <Text>To</Text>
                <Text weight="bold">{truncAddress(tx?.to ? tx.to : '')}</Text>
              </Stack>
              <Stack direction={'horizontal'} justify="space-between" align="center">
                <Text>Value</Text>
                <Text weight="bold">{ethers.utils.formatEther(tx?.value ? tx?.value : '0')}</Text>
              </Stack>
            </Box>

            {data && data.ok && data.decoded ? (
              <Collapsible>
                <CollapsibleTrigger asChild>
                  <Box className={styles.viewTxTrigger}>
                    <Text>Transactions</Text>
                    <IconChevronDown />
                  </Box>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <Stack direction="vertical" space="1">
                    {renderDecodedFunctions(data.decoded.values)}
                  </Stack>
                </CollapsibleContent>
              </Collapsible>
            ) : null}
            <Collapsible>
              <CollapsibleTrigger asChild>
                <Box className={styles.viewTxTrigger}>
                  <Text>Data</Text>
                  <IconChevronDown />
                </Box>
              </CollapsibleTrigger>

              <CollapsibleContent>
                <Box
                  className={styles.viewTxBox}
                  backgroundColor={'backgroundSecondary'}
                  padding="2"
                  borderRadius={'large'}
                  width="full"
                >
                  <Text wordBreak="break-word">{tx?.data}</Text>
                </Box>
              </CollapsibleContent>
            </Collapsible>
          </Stack>
        </CollapsibleContent>
      </Box>
    </Collapsible>
  )
}

export default ViewTx
