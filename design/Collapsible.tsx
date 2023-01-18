import { Stack, Box, Text, IconChevronDown } from '@kalidao/reality'

import React from 'react'
import * as RadixCollapsible from '@radix-ui/react-collapsible'
import * as styles from './collapsible.css'

export const Collapsible = ({ label, children }: { label: string; children: React.ReactNode }) => {
  const [open, setOpen] = React.useState(false)
  return (
    <RadixCollapsible.Root className={styles.root} open={open} onOpenChange={setOpen}>
      <Stack>
        <Box display="flex" alignItems={'center'} justifyContent="space-between">
          <Text>{label}</Text>
          <RadixCollapsible.Trigger asChild>
            <IconChevronDown />
          </RadixCollapsible.Trigger>
        </Box>
        <RadixCollapsible.Content>{children}</RadixCollapsible.Content>
      </Stack>
    </RadixCollapsible.Root>
  )
}
