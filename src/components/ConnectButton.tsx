import { DynamicWidget } from '@dynamic-labs/sdk-react'
import { useThemeStore } from '~/hooks'

export const ConnectButton = () => {
  const mode = useThemeStore((state) => state.mode)

  return (
    <DynamicWidget
      buttonClassName={mode == 'dark' ? 'connectButtonDark' : 'connectButtonLight'}
      innerButtonComponent="Login"
    />
  )
}
