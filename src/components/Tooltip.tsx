import React from 'react'
import * as RadixTooltip from '@radix-ui/react-tooltip'
import * as styles from './styles.css'

const Tooltip = ({ children, label }: { children: React.ReactNode; label: string }) => {
  return (
    <RadixTooltip.Provider>
      <RadixTooltip.Root>
        <RadixTooltip.Trigger asChild>{children}</RadixTooltip.Trigger>
        <RadixTooltip.Portal>
          <RadixTooltip.Content className={styles.TooltipContent} sideOffset={5}>
            {label}
            <RadixTooltip.Arrow className={styles.TooltipArrow} />
          </RadixTooltip.Content>
        </RadixTooltip.Portal>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  )
}

export default Tooltip
