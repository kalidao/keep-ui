import { Box, Heading } from '@kalidao/reality'
import { Splash } from '~/create/Splash'
import * as styles from '~/create/create.css'
import { ConnectButton } from '~/components/connect-button'

export const Login = () => {
  return (
    <Box height="viewHeight" width="viewWidth">
      <Splash />
      <Box className={styles.typeShell}>
        <Box width="fit" display={'flex'} flexDirection="column" gap="5">
          <Heading level="1">Welcome back!</Heading>
          <ConnectButton />
        </Box>
      </Box>
    </Box>
  )
}
