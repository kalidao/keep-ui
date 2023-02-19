import { useDynamicContext } from '@dynamic-labs/sdk-react'
import { Box } from '@kalidao/reality'
import { vars } from '@kalidao/reality'
import { useMediaQuery } from 'react-responsive'

import { Menu } from '@design/Menu'
import toast from '@design/Toast'

import { ConnectButton } from './ConnectButton'
import { User } from './User'
import * as styles from './userMenu.css'

export const UserMenu = () => {
  const { user } = useDynamicContext()
  const sm = useMediaQuery({ query: '(max-width: 640px)' })

  const copy = () => {
    if (user) {
      navigator.clipboard.writeText(user.walletPublicKey as string)
      toast('success', 'Address copied!')
    }
  }
  // responsive styles

  return (
    <Box className={styles.userMenu} as="button" onClick={copy}>
      {sm ? (
        <Menu>
          <Box>
            {user ? <User address={user.walletPublicKey as string} size={sm ? 'sm' : 'lg'} /> : <ConnectButton />}
          </Box>
        </Menu>
      ) : (
        <>
          {' '}
          <Box>
            {user ? <User address={user.walletPublicKey as string} size={sm ? 'sm' : 'lg'} /> : <ConnectButton />}
          </Box>
          <Menu />
        </>
      )}
    </Box>
  )
}
