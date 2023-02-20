import { useDynamicContext } from '@dynamic-labs/sdk-react'
import { Box, IconChevronDown } from '@kalidao/reality'
import { useMediaQuery } from 'react-responsive'

import { Menu } from '@design/Menu'

import { User } from './User'
import * as styles from './userMenu.css'

export const UserMenu = () => {
  const { user } = useDynamicContext()
  const sm = useMediaQuery({ query: '(max-width: 640px)' })

  return (
    <Box className={styles.userMenu}>
      {sm ? (
        <Menu>
          <Box>{user ? <User address={user.walletPublicKey as string} size={'sm'} /> : null}</Box>
        </Menu>
      ) : (
        <Menu>
          <Box>
            {user ? <User address={user.walletPublicKey as string} size={'lg'} /> : <User address="" size="lg" />}
          </Box>
        </Menu>
      )}
    </Box>
  )
}
