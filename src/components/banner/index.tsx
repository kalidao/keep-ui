import { useEffect, useState } from 'react'

import { useDynamicContext } from '@dynamic-labs/sdk-react'
import { Box, Button, IconClose } from '@kalidao/reality'

import * as styles from './styles.css'

export default function Banner({ label }: { label: string }) {
  const { network } = useDynamicContext()
  const [hidden, setHidden] = useState(true)

  useEffect(() => {
    if (network === 1 || network === 137 || network === undefined) {
      setHidden(true)
    } else {
      setHidden(false)
    }
  }, [network])

  if (hidden) return null

  return (
    <Box className={styles.root}>
      <p className={styles.text}>{label}</p>
      <Button type="button" shape="circle" variant="transparent" onClick={() => setHidden(true)}>
        <span className={styles.sr}>Dismiss</span>
        <IconClose color="white" aria-hidden="true" />
      </Button>
    </Box>
  )
}
