import { useDynamicContext } from '@dynamic-labs/sdk-react'
import { Box } from '@kalidao/reality'
import { vars } from '@kalidao/reality'

import { Menu } from '@design/Menu'
import toast from '@design/Toast'

import { ConnectButton } from './ConnectButton'
import { User } from './User'
import * as styles from './userMenu.css'

export const UserMenu = () => {
  const { user } = useDynamicContext()

  const copy = () => {
    if (user) {
      navigator.clipboard.writeText(user.walletPublicKey as string)
      toast('success', 'Address copied!')
    }
  }

  return (
    <Box className={styles.userMenu} as="button" onClick={copy}>
      <Box>{user ? <User address={user.walletPublicKey as string} size="lg" /> : <ConnectButton />}</Box>
      <Menu />
    </Box>
  )
}
