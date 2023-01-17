import { Box } from '@kalidao/reality'
import * as styles from '~/create/create.css'
import { Splash } from '~/create/Splash'
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
