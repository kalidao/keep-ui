import { Avatar, Box, Spinner, Stack, Text } from '@kalidao/reality'
import { useNFTsByOwner } from 'ankr-react'
import { useQuery } from 'wagmi'
import { fetcher, prettyDate } from '~/utils'
import { getBlockchainByChainId } from '~/utils/ankr'

import { Collectible, useKeepStore } from './useKeepStore'

const Treasury = () => {
  const keep = useKeepStore((state) => state)
  const { data, error, isLoading } = useNFTsByOwner({
    walletAddress: keep.address ? keep.address : '',
    blockchain: keep.chainId ? getBlockchainByChainId(keep.chainId) : 'polygon',
  })

  console.log('getNFTsByOwner', data, error, isLoading)

  return (
    <Box padding="6" display="flex" justifyContent={'space-between'} flexDirection="column" minHeight={'viewHeight'}>
      <Stack direction={'horizontal'} wrap>
        {/* @ts-ignore */}
        {isLoading ? <Spinner /> : error ? <Text>{error?.message}</Text> : null}

        {data
          ? data?.assets?.map((collectible) => {
              return (
                <NFT
                  key={collectible.contractAddress}
                  image={collectible.imageUrl}
                  collection_name={collectible.collectionName}
                />
              )
            })
          : null}
      </Stack>
    </Box>
  )
}

const NFT = ({ image, collection_name }: { image: string; collection_name: string }) => {
  return (
    <Stack align="center">
      <Avatar src={image} label={collection_name} shape="square" size="40" />
      <Text>{collection_name.slice(0, 20)}</Text>
    </Stack>
  )
}

export default Treasury
