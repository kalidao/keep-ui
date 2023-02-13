import { useState } from 'react'

import { Box, Stack, Text } from '@kalidao/reality'
import { useNFTsByOwner } from 'ankr-react'
import { ethers } from 'ethers'
import { useKeepStore } from '~/dashboard/useKeepStore'
import { getBlockchainByChainId } from '~/utils/ankr'

import { RadioNFT } from '@design/RadioNFT'

interface NFT {
  blockchain: 'arbitrum' | 'avalanche' | 'bsc' | 'eth' | 'fantom' | 'polygon' | 'syscoin' | 'optimism'
  name: string
  tokenId: string
  tokenUrl: string
  imageUrl: string
  collectionName: string
  symbol: string
  contractType: 'ERC721' | 'ERC1155' | 'UNDEFINED'
  contractAddress: string
}

export const SendNFT = () => {
  const keep = useKeepStore((state) => state)
  const { data, isLoading, error } = useNFTsByOwner({
    walletAddress: keep?.address ?? ethers.constants.AddressZero,
    blockchain: keep?.chainId ? getBlockchainByChainId(keep?.chainId) : 'polygon',
  })
  const [selected, setSelected] = useState<string[]>([])

  // strongly type react form submit event handler

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(selected)
  }

  console.log('selectedNFT', selected)

  return (
    <form onSubmit={handleSubmit}>
      <h1>SendNFT</h1>

      {data ? (
        <Stack space="5" direction={'horizontal'} justify="space-between" wrap>
          {data?.assets?.map((collectible) => {
            const key = collectible.contractAddress + '-tokenId-' + collectible.tokenId

            const checked = selected.includes(key)

            return (
              <RadioNFT
                key={key}
                image={collectible?.imageUrl}
                label={collectible?.collectionName?.slice(0, 20)}
                address={collectible?.contractAddress}
                checked={checked}
                tokenId={collectible?.tokenId}
                onChange={(e) => {
                  const value = e.currentTarget.value
                  const isSelected = selected.includes(value)

                  if (isSelected) {
                    // remove from selected without mutating state
                    let newSelected = selected
                    newSelected = newSelected.filter((item) => item !== value)
                    setSelected(newSelected)
                  } else {
                    // add to selected
                    let newSelected = selected
                    newSelected.push(value)
                    setSelected(newSelected)
                  }
                }}
              />
            )
          })}
        </Stack>
      ) : null}
    </form>
  )
}
