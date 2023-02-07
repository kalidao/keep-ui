import { useDynamicContext } from '@dynamic-labs/sdk-react'
import { Box } from '@kalidao/reality'

import { Menu } from '@design/Menu'

import { ConnectButton } from './ConnectButton'
import { User } from './User'
import * as styles from './userMenu.css'

export const UserMenu = () => {
  const { user } = useDynamicContext()

  return (
    <Box className={styles.userMenu}>
      <Box>{user ? <User address={user.walletPublicKey as string} size="lg" /> : <ConnectButton />}</Box>
      <Menu />
    </Box>
  )
}
