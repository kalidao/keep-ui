import React from 'react'
import { Stack, Box, Text, IconChevronDown } from '@kalidao/reality'
import { truncAddress } from '~/utils'
import { ethers } from 'ethers'
import * as styles from './styles.css'
import * as RadixCollapsible from '@radix-ui/react-collapsible'

const ViewTx = ({ tx }: { tx: any }) => {
  const [open, setOpen] = React.useState(false)

  return (
    <RadixCollapsible.Root open={open} onOpenChange={setOpen}>
      <Box display="flex" flexDirection={'column'} gap="3">
        <RadixCollapsible.Trigger asChild>
          <Box className={styles.viewTxTrigger}>
            <Text>This will send {ethers.utils.formatEther(tx.value)} ETH to shivanshi.eth</Text>
            <IconChevronDown />
          </Box>
        </RadixCollapsible.Trigger>
        <RadixCollapsible.Content>
          <Box className={styles.viewTxRoot}>
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
              <Text weight="bold">{truncAddress(tx?.to)}</Text>
            </Stack>
            <Stack direction={'horizontal'} justify="space-between" align="center">
              <Text>Value</Text>
              <Text weight="bold">{ethers.utils.formatEther(tx?.value)}</Text>
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
