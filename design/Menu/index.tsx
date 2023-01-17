import React, { useCallback } from 'react'
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import {
  Box,
  Button,
  IconMoon,
  IconSun,
  IconTwitter,
  IconDiscord,
  IconGitHub,
  Stack,
  useTheme,
  IconChevronDown,
} from '@kalidao/reality'
import { arrow, content, item, itemLink, itemText, label, trigger, separator } from './styles.css'
import { useThemeStore } from '~/hooks/useThemeStore'
import { setThemeMode } from '~/utils/cookies'
import { ReactNodeNoStrings } from '@kalidao/reality/dist/types/types'
import { useDynamicContext } from '@dynamic-labs/sdk-react'

export const Menu = () => {
  const { mode, setMode } = useTheme()
  const toggleModeState = useThemeStore((state) => state.toggleMode)
  const { user } = useDynamicContext()

  const toggleMode = useCallback(() => {
    const nextMode = mode === 'dark' ? 'light' : 'dark'
    setMode(nextMode)
    setThemeMode(nextMode)
    toggleModeState()
  }, [mode, setMode, toggleModeState])

  return (
    <Box>
      <DropdownMenuPrimitive.Root>
        <DropdownMenuPrimitive.Trigger asChild className={trigger}>
          <Button shape="circle">
            <IconChevronDown color={'text'} />
          </Button>
        </DropdownMenuPrimitive.Trigger>
        <DropdownMenuPrimitive.Portal>
          <DropdownMenuPrimitive.Content className={content}>
            <Item label="Home" href={user ? '/dashboard' : '/'} isExternal={false} />
            <Item label="Create" href="/create" isExternal={false} />
            <Item label="Docs" href="https://github.com/kalidao/keep#model" isExternal={true} />
            <Item label="Contact" href="mailto:contact@kali.gg" isExternal={true} />
            <Item
              type="button"
              icon={mode === 'dark' ? <IconSun /> : <IconMoon />}
              label={mode === 'dark' ? 'Light' : 'Dark'}
              onClick={toggleMode}
            />
            <DropdownMenuPrimitive.Separator className={separator} />
            <DropdownMenuPrimitive.Label className={label}>Socials</DropdownMenuPrimitive.Label>
            <Item
              label={
                <Stack direction={'horizontal'} align="center" justify={'flex-start'}>
                  <IconTwitter aria-label="Twitter" />
                  <Box className={itemText}>Twitter</Box>
                </Stack>
              }
              href="https://twitter.com/kali__gg"
            />
            <Item
              label={
                <Stack direction={'horizontal'} align="center" justify={'flex-start'}>
                  <IconDiscord aria-label="Discord" />
                  <Box className={itemText}>Discord</Box>
                </Stack>
              }
              href="http://discord.gg/UKCS9ghzUE"
            />
            <Item
              label={
                <Stack direction={'horizontal'} align="center" justify={'flex-start'}>
                  <IconGitHub aria-label="GitHub" />
                  <Box className={itemText}>GitHub</Box>
                </Stack>
              }
              href="https://github.com/kalidao/"
            />
            <DropdownMenuPrimitive.Arrow className={arrow} />
          </DropdownMenuPrimitive.Content>
        </DropdownMenuPrimitive.Portal>
      </DropdownMenuPrimitive.Root>
    </Box>
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
