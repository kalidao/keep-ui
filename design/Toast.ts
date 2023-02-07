import { vars } from '@kalidao/reality'
import toast from 'react-hot-toast'

export type ToastType = 'success' | 'error' | 'default'

const customToast = (type: ToastType, message: string) => {
  const style = {
    fontSize: vars.fontSizes.large,
    color: vars.colors.textPrimary,
    background: vars.colors.backgroundSecondary,
    border: `1px solid ${vars.colors.foregroundTertiary}`,
  }
  switch (type) {
    case 'success':
      toast.success(message, {
        icon: '✨',
        position: 'top-center',
        ariaProps: {
          role: 'status',
          'aria-live': 'polite',
        },
        style,
      })
      break
    case 'error':
      toast.error(message, {
        icon: '👎',
        position: 'top-center',
        ariaProps: {
          role: 'alert',
          'aria-live': 'assertive',
        },
        style,
      })
      break
    default:
      toast(message, {
        style,
      })
      break
  }
}

export default customToast
