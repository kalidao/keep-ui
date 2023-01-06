import { Box } from '@kalidao/reality'
import { useState } from 'react'

interface Props {
  trigger: React.ReactNode
  children: React.ReactNode
}
export const Collapsible = ({ trigger, children }: Props) => {
  const [open, setOpen] = useState(false)

  return (
    <Box width="180">
      <Box as="button" onClick={() => setOpen(!open)}>
        {trigger}
      </Box>
      {open === true && <Box>{children}</Box>}
    </Box>
  )
}
