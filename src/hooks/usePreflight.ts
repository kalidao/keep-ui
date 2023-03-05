import { useDynamicContext } from '@dynamic-labs/sdk-react'

import toast from '@design/Toast'

export const usePreflight = () => {
  const { isAuthenticated, setShowAuthFlow } = useDynamicContext()

  const preflight = async () => {
    if (!isAuthenticated) {
      setShowAuthFlow(true)
      toast('error', 'Please login to continue')
      return false
    } else {
      return true
    }
  }

  return { preflight }
}
