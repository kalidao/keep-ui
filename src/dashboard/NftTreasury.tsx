import { Avatar, Box, Spinner, Stack, Text } from '@kalidao/reality'
import { useNFTsByOwner } from 'ankr-react'
import { getBlockchainByChainId } from '~/utils/ankr'

import { useKeepStore } from './useKeepStore'

const Treasury = () => {
  const keep = useKeepStore((state) => state)
  const { data, error, isLoading } = useNFTsByOwner({
    walletAddress: keep.address ? keep.address : '',
    blockchain: keep.chainId ? getBlockchainByChainId(keep.chainId) : 'polygon',
  })

  console.log('getNFTsByOwner', data, error, isLoading)

  let render = null

  if (isLoading) {
    render = <Spinner />
  } else if (error) {
    render = <Text>{'There was an error fetching NFTs.'}</Text>
  } else if (data) {
    if (data.assets.length === 0) {
      render = <Text>{'Nothing to see here 😴'}</Text>
    } else {
      render = (
        <Stack direction={'horizontal'} wrap>
          {data.assets.map((collectible) => {
            return (
              <NFT
                key={collectible.contractAddress}
                image={collectible.imageUrl}
                collection_name={collectible.collectionName}
              />
            )
          })}
        </Stack>
      )
    }
  }

  return (
    <Box padding="6" display="flex" justifyContent={'space-between'} flexDirection="column" minHeight={'viewHeight'}>
      {render}
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
