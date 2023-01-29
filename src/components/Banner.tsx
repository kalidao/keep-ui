import { Box, Button, IconClose } from '@kalidao/reality'
import { useEffect, useState } from 'react'
import * as styles from './banner.css'
import { useDynamicContext } from '@dynamic-labs/sdk-react'

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

  console.log('network', network)

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
