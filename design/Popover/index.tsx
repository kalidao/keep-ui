import React from 'react'

import { IconClose } from '@kalidao/reality'
import * as PopoverPrimitive from '@radix-ui/react-popover'

import * as styles from './styles.css'

const Popover = ({ trigger, children }: { trigger: React.ReactNode; children: React.ReactNode }) => (
  <PopoverPrimitive.Root>
    <PopoverPrimitive.Trigger asChild>{trigger}</PopoverPrimitive.Trigger>
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content className={styles.content} sideOffset={5}>
        {children}
        <PopoverPrimitive.Close className={styles.close} aria-label="Close">
          <IconClose />
        </PopoverPrimitive.Close>
        <PopoverPrimitive.Arrow className={styles.arrow} />
      </PopoverPrimitive.Content>
    </PopoverPrimitive.Portal>
  </PopoverPrimitive.Root>
)

export default Popover
