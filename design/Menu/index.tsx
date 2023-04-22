import React, { useCallback } from 'react'

import { useDynamicContext } from '@dynamic-labs/sdk-react'
import {
  Avatar,
  Box,
  Button,
  IconChevronDown,
  IconChevronRight,
  IconDuplicate,
  IconMoon,
  IconSun,
  Stack,
  Text,
  useTheme,
} from '@kalidao/reality'
import { ReactNodeNoStrings } from '@kalidao/reality/dist/types/types'
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import { useThemeStore } from '~/hooks/useThemeStore'
import { setThemeMode } from '~/utils/cookies'

import toast from '@design/Toast'

import { arrow, content, item, itemLink, itemText, separator, subcontent, subtrigger, trigger } from './styles.css'

export const Menu = ({ children = <IconChevronDown /> }) => {
  const { mode, setMode } = useTheme()
  const toggleModeState = useThemeStore((state) => state.toggleMode)

  const {
    isAuthenticated,
    user,
    handleLogOut,
    setShowAuthFlow,
    network,
    networkConfigurations,
    setNetwork,
    walletConnector,
  } = useDynamicContext()

  const toggleMode = useCallback(() => {
    const nextMode = mode === 'dark' ? 'light' : 'dark'
    setMode(nextMode)
    setThemeMode(nextMode)
    toggleModeState()
  }, [mode, setMode, toggleModeState])

  const copy = () => {
    if (user) {
      navigator.clipboard.writeText(user.blockchainAccounts[0].address)
      toast('success', 'Address copied!')
    }
  }

  const switchNetwork = async (chainId: number) => {
    if (!walletConnector) {
      toast('error', 'No wallet connected')
      return
    }
    if (walletConnector.supportsNetworkSwitching()) {
      await walletConnector.switchNetwork({
        networkChainId: chainId,
      })
    } else {
      toast('error', 'Please switch network in your wallet manually 🙏')
    }
    setNetwork(chainId)
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
          <Item
            label="Docs"
            href="https://keepdao.notion.site/Keep-Knowledge-Base-2f69922534a64eb2a043f71af33b2afc"
            isExternal={true}
          />
          <Item
            type="button"
            icon={mode === 'dark' ? <IconSun /> : <IconMoon />}
            label={mode === 'dark' ? 'Day' : 'Night'}
            onClick={toggleMode}
          />
          <DropdownMenuPrimitive.Separator className={separator} />
          {isAuthenticated ? (
            <>
              <DropdownMenuPrimitive.Sub>
                <DropdownMenuPrimitive.SubTrigger className={subtrigger}>
                  <Text>Switch Network</Text>
                  <IconChevronRight />
                </DropdownMenuPrimitive.SubTrigger>
                <DropdownMenuPrimitive.Portal>
                  <DropdownMenuPrimitive.SubContent className={subcontent} sideOffset={2} alignOffset={-5}>
                    {networkConfigurations?.evm?.map((chain: any) => {
                      const active = Number(chain.chainId) === Number(network)
                      return (
                        <Button
                          key={chain.chainId}
                          type="button"
                          width="full"
                          variant={active ? 'secondary' : 'transparent'}
                          onClick={async () => {
                            await switchNetwork(chain.chainId)
                          }}
                        >
                          <Stack direction={'horizontal'} align="center" justify={'space-between'}>
                            <Avatar src={chain.iconUrls[0]} size="6" label={chain.vanityName} />
                            <DropdownMenuPrimitive.Item className={itemText}>
                              {chain.vanityName}
                            </DropdownMenuPrimitive.Item>
                          </Stack>
                        </Button>
                      )
                    })}
                  </DropdownMenuPrimitive.SubContent>
                </DropdownMenuPrimitive.Portal>
              </DropdownMenuPrimitive.Sub>
              <Item type="button" icon={<IconDuplicate />} label={'Copy User'} onClick={copy} />{' '}
            </>
          ) : null}
          <Item
            type="button"
            label={isAuthenticated ? 'Logout' : 'Login'}
            accent
            onClick={() => {
              if (isAuthenticated) {
                handleLogOut()
              } else {
                setShowAuthFlow(true)
              }
            }}
          />
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
  accent?: boolean
}

export const Item = ({ type = 'link', label, href, onClick, icon, isExternal = true, accent }: ItemProps) => {
  if (type === 'button' && accent) {
    return (
      <Button onClick={onClick} variant={'secondary'} tone="accent" size="small" width="full" prefix={icon}>
        {label}
      </Button>
    )
  } else if (type === 'button') {
    return (
      <Button onClick={onClick} variant={'transparent'} size="small" width="full" prefix={icon}>
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
