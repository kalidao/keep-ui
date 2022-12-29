import { useCallback } from 'react'
import { Skeleton, Button, IconSun, IconMoon, useTheme } from '@kalidao/reality'

import { setThemeMode } from '~/utils/cookies'
import { useIsMounted } from '~/utils/isMounted'
import { useThemeStore } from '~/hooks/useThemeStore'

const ToggleMode = () => {
  // const mode = useThemeStore((state) => state.mode)
  // const toggleMode = useThemeStore((state) => state.toggleMode)
  const isMounted = useIsMounted()
  const { mode, setMode } = useTheme()
  const toggleModeState = useThemeStore((state) => state.toggleMode)

  const toggleMode = useCallback(() => {
    const nextMode = mode === 'dark' ? 'light' : 'dark'
    setMode(nextMode)
    setThemeMode(nextMode)
    toggleModeState()
  }, [mode, setMode, toggleModeState])

  return (
    <Skeleton loading={!isMounted}>
      <Button shape="circle" size="small" variant="transparent" onClick={toggleMode}>
        {isMounted ? mode === 'dark' ? <IconSun /> : <IconMoon /> : 'dark'}
      </Button>
    </Skeleton>
  )
}

export default ToggleMode
