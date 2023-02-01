import React from 'react'
import { Stack, Box, Text, IconChevronDown } from '@kalidao/reality'
import { truncAddress } from '~/utils'
import { ethers } from 'ethers'
import * as styles from './styles.css'
import * as RadixCollapsible from '@radix-ui/react-collapsible'
import { useTxStore } from '~/dashboard/useTxStore'
import { useKeepStore } from '~/dashboard/useKeepStore'
import { useQuery } from '@tanstack/react-query'

const ViewTx = () => {
  const [open, setOpen] = React.useState(false)
  const tx = useTxStore((state) => state)
  const keep = useKeepStore((state) => state)
  const { data } = useQuery(['decodeTx', tx.data], async () => {
    const data = await fetch(
      `${process.env.NEXT_PUBLIC_KEEP_API}/about/tx?chainId=${keep.chainId}&data=${tx.data}&value=${tx.value}&to=${tx.to}`,
    )
    const json = await data.json()

    return json
  })

  console.log('decoded tx', data, keep.chainId, tx.data, tx.value, tx.to)

  return (
    <RadixCollapsible.Root className={styles.viewTxRoot} open={open} onOpenChange={setOpen}>
      <Box display="flex" flexDirection={'column'} gap="3">
        <RadixCollapsible.Trigger asChild>
          <Box className={styles.viewTxTrigger}>
            <Text>
              {data ? (data?.ok == true ? data?.message : 'Unknown Transaction Summary') : 'Transaction Summary'}
            </Text>
            <IconChevronDown />
          </Box>
        </RadixCollapsible.Trigger>
        <RadixCollapsible.Content>
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
            <Text>Data</Text>
            <Box backgroundColor={'backgroundSecondary'} padding="2" borderRadius={'large'} width="full">
              <Text wordBreak="break-word">{tx?.data}</Text>
            </Box>
          </Box>
        </RadixCollapsible.Content>
      </Box>
    </RadixCollapsible.Root>
  )
}

export default ViewTx
