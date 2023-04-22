import { useDynamicContext } from '@dynamic-labs/sdk-react'
import { Box } from '@kalidao/reality'
import { useMediaQuery } from 'react-responsive'

import { User } from '~/components/user'

import { Menu } from '@design/Menu'

import * as styles from './styles.css'

export const UserMenu = () => {
  const { user } = useDynamicContext()
  const sm = useMediaQuery({ query: '(max-width: 640px)' })

  return (
    <Box className={styles.userMenu}>
      {sm ? (
        <Menu>
          <Box>
            {user ? <User login address={user?.blockchainAccounts?.[0]?.address as string} size={'sm'} /> : null}
          </Box>
        </Menu>
      ) : (
        <Menu>
          <Box>
            {user ? (
              <User login address={user?.blockchainAccounts?.[0]?.address as string} size={'lg'} />
            ) : (
              <User login address="" size="lg" />
            )}
          </Box>
        </Menu>
      )}
    </Box>
  )
}
