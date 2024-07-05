import React, { useEffect } from 'react'

import Image from 'next/image'
import { useRouter } from 'next/router'

import { useDynamicContext } from '@dynamic-labs/sdk-react'
import { useGetMirrorKeeps } from '~/hooks/useGetMirrorKeeps'

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@design/Select'
import toast from '@design/Toast'

import * as styles from './styles.css'

export const ChainMirror = ({ address }: { address: string }) => {
  const { data } = useGetMirrorKeeps(address)
  const { isAuthenticated, networkConfigurations, walletConnector, network, setNetwork } = useDynamicContext()
  const router = useRouter()
  const activeNetwork = networkConfigurations?.evm?.find((chain) => chain.chainId === network)

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
    <Select
      onValueChange={(value) => {
        if (isAuthenticated) {
          if (parseInt(value) !== network) {
            switchNetwork(parseInt(value))
          } else {
            return
          }
        }
        router.push(`/${value}/${address}`)
      }}
    >
      <SelectTrigger hideIndicator>
        <SelectValue
          placeholder={
            activeNetwork?.iconUrls?.[0] ? (
              <Image
                src={activeNetwork?.iconUrls?.[0]}
                alt={`Active chain - ${activeNetwork?.chainName}`}
                width="20"
                height="20"
              />
            ) : (
              activeNetwork?.chainName
            )
          }
        />
      </SelectTrigger>
      <SelectContent position="popper">
        <SelectGroup>
          {networkConfigurations?.evm?.map((network) => {
            const keep = data?.find((keep: { chainId: number }) => keep.chainId === network.chainId)
            console.log('mirror keep', keep)
            if (keep) {
              return (
                <SelectItem
                  key={network.chainId}
                  hideIndicator
                  className={styles.item}
                  value={network.chainId.toString()}
                >
                  {network?.iconUrls?.[0] ? (
                    <Image src={network?.iconUrls?.[0]} alt={network.chainName} width="20" height="20" />
                  ) : null}
                </SelectItem>
              )
            }
            return null
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
