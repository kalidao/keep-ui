import React, { useRef, useState, useMemo, useEffect } from 'react'
import {
  AuthenticationStatus,
  createAuthenticationAdapter,
  RainbowKitAuthenticationProvider,
} from '@rainbow-me/rainbowkit'
import { SiweMessage } from 'siwe'

interface AuthProviderProps {
  enabled?: boolean
  children: React.ReactNode
}

export function AuthProvider({ children, enabled }: AuthProviderProps) {
  const fetchingStatusRef = useRef(false)
  const verifyingRef = useRef(false)
  const [status, setStatus] = useState<AuthenticationStatus>('loading')

  useEffect(() => {
    const fetchStatus = async () => {
      if (fetchingStatusRef.current || verifyingRef.current) return
      fetchingStatusRef.current = true
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_KEEP_API}/auth/user`, {
          method: 'GET',
          credentials: 'include',
        }).then((res) => res.json())
        setStatus(res ? 'authenticated' : 'unauthenticated')
      } catch (e) {
        setStatus('unauthenticated')
      } finally {
        fetchingStatusRef.current = false
      }
    }
    // 1. page loads
    fetchStatus()

    // 2. window is focused (in case user logs out of another window)
    window.addEventListener('focus', fetchStatus)
    return () => window.removeEventListener('focus', fetchStatus)
  }, [])

  const adapter = useMemo(
    () =>
      createAuthenticationAdapter({
        getNonce: async () => {
          const response = await fetch(`${process.env.NEXT_PUBLIC_KEEP_API}/auth/nonce`, {
            method: 'GET',
            credentials: 'include',
          })
          return await response.text()
        },
        createMessage: ({ nonce, address, chainId }) => {
          return new SiweMessage({
            domain: window.location.host,
            address,
            statement:
              'Keep wants you to sign in with your Ethereum account. You agree to our Terms of Service and Privacy Policy by doing this.',
            uri: window.location.origin,
            version: '1',
            chainId,
            nonce,
          })
        },
        getMessageBody: ({ message }) => {
          return message.prepareMessage()
        },
        verify: async ({ message, signature }) => {
          verifyingRef.current = true

          try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_KEEP_API}/auth/verify`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ message, signature }),
              credentials: 'include',
            })

            console.log('res', res)
            const authenticated = Boolean(res.ok)

            setStatus(authenticated ? 'authenticated' : 'unauthenticated')

            return authenticated
          } catch (error) {
            return false
          } finally {
            verifyingRef.current = false
          }
        },
        signOut: async () => {
          setStatus('unauthenticated')
          await fetch(`${process.env.NEXT_PUBLIC_KEEP_API}/auth/logout`, {
            method: 'GET',
            credentials: 'include',
          })
        },
      }),
    [],
  )
  console.log('status', status)
  return (
    <RainbowKitAuthenticationProvider adapter={adapter} enabled={enabled} status={status}>
      {children}
    </RainbowKitAuthenticationProvider>
  )
}
