import { Avatar, Box, Button, Card, Heading, IconArrowRight, Stack, Stat, Tag, Text } from '@kalidao/reality'
import { useQuery } from 'wagmi'
import { fetcher, prettyDate } from '~/utils'

import { Collectible, useKeepStore } from './useKeepStore'

const Treasury = () => {
  const collectibles = useKeepStore((state) => state.collectibles)
  const synced = useKeepStore((state) => state.treasuryUpdatedAt)

  return (
    <Box padding="6" display="flex" justifyContent={'space-between'} flexDirection="column" minHeight={'viewHeight'}>
      <Stack direction={'horizontal'} wrap>
        {collectibles &&
          collectibles?.slice(0, 5).map((collectible: Collectible) => {
            return <NFT key={collectible.contract_address} collectible={collectible} />
          })}
      </Stack>
      <Text color="foregroundSecondary">Synced {prettyDate(synced)}</Text>
    </Box>
  )
}

const NFT = ({ collectible }: { collectible: Collectible }) => {
  const chainId = useKeepStore((state) => state.chainId)
  const { data } = useQuery(['collectible', collectible], async () =>
    fetcher(
      `https://api.covalenthq.com/v1/${chainId}/tokens/${collectible.contract_address}/nft_metadata/${collectible.nft_data[0].token_id}/?quote-currency=USD&format=JSON&key=${process.env.NEXT_PUBLIC_COVALENT_API_KEY}`,
    ),
  )

  const metadata = data?.data?.items[0]?.nft_data?.token_url

  console.log('metadata', data?.data?.items[0]?.nft_data?.[0]?.external_data?.image)

  return (
    <Stack align="center">
      <Avatar
        src={data?.data?.items[0]?.nft_data?.[0]?.external_data?.image}
        label={collectible.contract_name}
        shape="square"
        size="40"
      />
      <Text>{collectible.contract_name.slice(0, 20)}</Text>
    </Stack>
  )
}

export default Treasury
