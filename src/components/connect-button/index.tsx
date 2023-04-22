import React from 'react'

import { DynamicWidget, useDynamicContext } from '@dynamic-labs/sdk-react'
import { Avatar, Box, Button } from '@kalidao/reality'
import { useEnsAvatar } from 'wagmi'

import * as styles from './styles.css'

export const ConnectButton = () => {
  const { user, setShowAuthFlow, handleLogOut } = useDynamicContext()
  const { data: ensAvatar } = useEnsAvatar({
    address: user?.blockchainAccounts[0]?.address as `0xstring`,
    chainId: 1,
    enabled: !!user?.blockchainAccounts[0]?.address,
  })

  const renderUserProfile = () => {
    return (
      <Box className={styles.userProfile}>
        {ensAvatar ? (
          <Avatar size="6" label={`${user?.alias} profile`} src={ensAvatar} />
        ) : (
          <Avatar
            size="6"
            label={`${user?.alias} profile`}
            address={user?.blockchainAccounts[0]?.address}
            placeholder
          />
        )}
        <Box fontWeight={'semiBold'} color="textSecondary">
          {user?.alias}
        </Box>
      </Box>
    )
  }

  const renderLoginButton = () => {
    return (
      <Button size="small" center tone="accent" variant="secondary" onClick={() => setShowAuthFlow(true)}>
        Login
      </Button>
    )
  }

  return user ? renderUserProfile() : renderLoginButton()
}
