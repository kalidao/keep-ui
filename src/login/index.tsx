import { useDynamicContext } from '@dynamic-labs/sdk-react'
import { Box, Button, Heading, IconWallet } from '@kalidao/reality'
import { Splash } from '~/create/Splash'
import * as styles from '~/create/create.css'

import { ConnectButton } from '~/components/ConnectButton'

export const Login = () => {
  const { setShowAuthFlow } = useDynamicContext()
  return (
    <Box height="viewHeight" width="viewWidth">
      <Splash />
      <Box className={styles.typeShell}>
        <Box width="fit" display={'flex'} flexDirection="column" gap="5">
          <Heading level="1">Welcome back!</Heading>
          <Button center tone="accent" variant="secondary" onClick={() => setShowAuthFlow(true)}>
            Login
          </Button>
        </Box>
      </Box>
    </Box>
  )
}
