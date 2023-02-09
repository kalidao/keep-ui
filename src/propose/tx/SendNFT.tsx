import { Stack, Text } from '@kalidao/reality'
import { useKeepStore } from '~/dashboard/useKeepStore'

export const SendNFT = () => {
  const collectibles = useKeepStore((state) => state.collectibles)
  return (
    <div>
      <h1>SendNFT</h1>
      <pre>{JSON.stringify(collectibles, null, 2)}</pre>
      {collectibles.map((collectible) => {
        return (
          <Stack key={collectible.contract_address}>
            {collectible.nft_data.map((nft) => {
              return (
                <Stack key={nft.token_id} direction={'horizontal'} justify="space-between">
                  <Text>{collectible.contract_name}</Text>
                  <Text>{nft.token_id}</Text>
                  <input type="checkbox" />
                </Stack>
              )
            })}
          </Stack>
        )
      })}
    </div>
  )
}
