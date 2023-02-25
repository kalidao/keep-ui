import { useEffect, useMemo, useState } from 'react'

import { Box, Input, Stack } from '@kalidao/reality'
import { useNFTsByOwner } from 'ankr-react'
import { ethers } from 'ethers'
import { useKeepStore } from '~/dashboard/useKeepStore'
import { getBlockchainByChainId } from '~/utils/ankr'

import { RadioNFT } from '@design/RadioNFT'

import { useSendStore } from './useSendStore'

export const SendNFT = () => {
  const keep = useKeepStore((state) => state)
  const setSendNFT = useSendStore((state) => state.setSendNft)
  const send_nft = useSendStore((state) => state.send_nft)
  const { data, isLoading, error } = useNFTsByOwner({
    walletAddress: keep?.address ?? ethers.constants.AddressZero,
    blockchain: keep?.chainId ? getBlockchainByChainId(keep?.chainId) : 'polygon',
  })

  const holdings = useMemo(() => {
    if (data) {
      return data.assets.map((nft) => {
        return {
          ...nft,
          checked: false,
          id: nft.contractAddress + '-tokenId-' + nft.tokenId,
          sendTo: '',
        }
      })
    }
  }, [data])

  useEffect(() => {
    if (holdings) {
      setSendNFT(holdings)
    }
  }, [holdings])
  // what does useMemo do?

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(e.currentTarget.value)
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>SendNFT</h1>
      <Stack space="5" direction={'horizontal'} justify="space-between" wrap>
        {send_nft.map((collectible) => {
          if (collectible.checked) {
            return (
              <Box key={collectible.id} display="flex" gap="10" width="full">
                <RadioNFT
                  image={collectible?.imageUrl}
                  label={collectible?.collectionName?.slice(0, 20)}
                  address={collectible?.contractAddress}
                  checked={collectible.checked}
                  tokenId={collectible.tokenId}
                  onChange={(e) => {
                    const currentNFTs = send_nft
                    const index = currentNFTs.findIndex((nft) => nft.id === collectible.id)
                    console.log(
                      'checked',
                      index,
                      collectible.id,
                      currentNFTs[index].checked,
                      !currentNFTs[index].checked,
                    )
                    currentNFTs[index].checked = e.target.checked
                    setSendNFT(currentNFTs)
                  }}
                />
                <Box width="full">
                  <Input
                    label="To"
                    onChange={(e) => {
                      const currentNFTs = send_nft
                      const index = currentNFTs.findIndex((nft) => nft.id === collectible.id)
                      currentNFTs[index].sendTo = e.currentTarget.value
                      setSendNFT(currentNFTs)
                    }}
                  />
                </Box>
              </Box>
            )
          }

          return (
            <RadioNFT
              key={collectible.id}
              image={collectible?.imageUrl}
              label={collectible?.collectionName?.slice(0, 20)}
              address={collectible?.contractAddress}
              checked={collectible.checked}
              tokenId={collectible.tokenId}
              onChange={(e) => {
                const currentNFTs = send_nft
                const index = currentNFTs.findIndex((nft) => nft.id === collectible.id)
                console.log('checked', index, collectible.id, currentNFTs[index].checked, !currentNFTs[index].checked)
                currentNFTs[index].checked = e.target.checked
                setSendNFT(currentNFTs)
              }}
            />
          )
        })}
      </Stack>
    </form>
  )
}
