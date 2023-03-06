import { useState } from 'react'
import { useEffect } from 'react'

import { useDynamicContext } from '@dynamic-labs/sdk-react'

import toast from '@design/Toast'

import { useIsMounted } from './useIsMounted'

export const usePreflight = (chainId?: number) => {
  const { isAuthenticated, setShowAuthFlow, network, setNetwork, walletConnector } = useDynamicContext()
  const mounted = useIsMounted()
  const [fly, setFly] = useState(false)

  const switchNetwork = async (chainId: number) => {
    if (!walletConnector) {
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

  const preflight = async () => {
    if (!isAuthenticated) {
      setShowAuthFlow(true)
      setFly(false)
    } else {
      if (chainId && chainId !== network) {
        await switchNetwork(chainId)
        setFly(false)
      } else {
        setFly(true)
      }
    }
  }

  useEffect(() => {
    if (mounted) {
      preflight()
    }
  }, [isAuthenticated, network, chainId])

  return { fly }
}
