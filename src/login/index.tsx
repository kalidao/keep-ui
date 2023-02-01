import { Box } from '@kalidao/reality'
import { Splash } from '~/create/Splash'
import * as styles from '~/create/create.css'

import { ConnectButton } from '~/components/ConnectButton'

export const Login = () => {
  return (
    <>
      <Splash />
      <Box className={styles.typeShell}>
        <ConnectButton />
      </Box>
    </>
  )
}
