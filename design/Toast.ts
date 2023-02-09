import { vars } from '@kalidao/reality'
import toast from 'react-hot-toast'

export type ToastType = 'success' | 'error' | 'default'

const customToast = (type: ToastType, message: string, duration?: number) => {
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
        duration,
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
        duration,
        style,
      })
      break
    default:
      toast(message, {
        style,
        duration
      })
      break
  }
}

export default customToast
