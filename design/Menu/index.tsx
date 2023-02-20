import React, { useCallback } from 'react'

import { useDynamicContext } from '@dynamic-labs/sdk-react'
import {
  Box,
  Button,
  IconChevronDown,
  IconDocumentAdd,
  IconMoon,
  IconSun,
  IconWallet,
  useTheme,
} from '@kalidao/reality'
import { ReactNodeNoStrings } from '@kalidao/reality/dist/types/types'
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import { useThemeStore } from '~/hooks/useThemeStore'
import { setThemeMode } from '~/utils/cookies'

import { ConnectButton } from '~/components/ConnectButton'

import toast from '@design/Toast'

import { arrow, content, item, itemLink, itemText, label, separator, trigger } from './styles.css'

export const Menu = ({ children = <IconChevronDown /> }) => {
  const { mode, setMode } = useTheme()
  const toggleModeState = useThemeStore((state) => state.toggleMode)

  const { isAuthenticated, user, handleLogOut } = useDynamicContext()

  const toggleMode = useCallback(() => {
    const nextMode = mode === 'dark' ? 'light' : 'dark'
    setMode(nextMode)
    setThemeMode(nextMode)
    toggleModeState()
  }, [mode, setMode, toggleModeState])

  const copy = () => {
    if (user) {
      navigator.clipboard.writeText(user.walletPublicKey as string)
      toast('success', 'Address copied!')
    }
  }

  return (
    <DropdownMenuPrimitive.Root>
      <DropdownMenuPrimitive.Trigger asChild className={trigger}>
        <Button shape="circle" aria-label="Menu">
          {children}
        </Button>
      </DropdownMenuPrimitive.Trigger>
      <DropdownMenuPrimitive.Portal>
        <DropdownMenuPrimitive.Content className={content}>
          <Item label="Home" href={user ? '/dashboard' : '/'} isExternal={false} />
          <Item label="Create" href="/create" isExternal={false} />
          <Item label="Docs" href="https://github.com/kalidao/keep#model" isExternal={true} />
          <Item
            type="button"
            icon={mode === 'dark' ? <IconSun /> : <IconMoon />}
            label={mode === 'dark' ? 'Light' : 'Dark'}
            onClick={toggleMode}
          />
          <DropdownMenuPrimitive.Separator className={separator} />

          {isAuthenticated ? (
            <>
              <Item type="button" icon={<IconDocumentAdd />} label={'Address'} onClick={copy} />
              <Item
                type="button"
                icon={isAuthenticated ? <IconWallet /> : <IconWallet />}
                label={isAuthenticated ? 'Logout' : 'Login'}
                onClick={async () => {
                  if (isAuthenticated) {
                    await handleLogOut()
                  } else {
                  }
                }}
              />
            </>
          ) : (
            <ConnectButton />
          )}
          <DropdownMenuPrimitive.Arrow className={arrow} />
        </DropdownMenuPrimitive.Content>
      </DropdownMenuPrimitive.Portal>
    </DropdownMenuPrimitive.Root>
  )
}

type ItemProps = {
  icon?: ReactNodeNoStrings
  label: React.ReactNode
  href?: string
  isExternal?: boolean
  type?: 'button' | 'link'
  onClick?: () => void
}

export const Item = ({ type = 'link', label, href, onClick, icon, isExternal = true }: ItemProps) => {
  if (type === 'button') {
    return (
      <Button onClick={onClick} variant="transparent" size="small" width="full" prefix={icon}>
        <DropdownMenuPrimitive.Item className={itemText}>{label}</DropdownMenuPrimitive.Item>
      </Button>
    )
  }

  return (
    <a
      href={href}
      target={isExternal ? '_blank' : '_self'}
      rel={isExternal ? 'noreferrer noopener' : ''}
      className={itemLink}
    >
      <DropdownMenuPrimitive.Item className={item}>
        <Box className={itemText}>{label}</Box>
      </DropdownMenuPrimitive.Item>
    </a>
  )
}
