// forwardRef

import React, { forwardRef } from 'react'

import { Box } from '@kalidao/reality'

import * as styles from './styles.css'

export interface FlipProps {
  from: React.ReactNode | string
  to: React.ReactNode | string
}

export const Flip = forwardRef<any, FlipProps>(({ from, to }, ref) => {
  const [isFlipped, setIsFlipped] = React.useState(false)

  const flip = React.useCallback(() => {
    setIsFlipped((isFlipped) => !isFlipped)
  }, [])

  return (
    <Box as="button" onClick={flip} className={styles.root}>
      {isFlipped ? from : to}
    </Box>
  )
})
