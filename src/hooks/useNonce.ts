import { useQuery } from '@tanstack/react-query'
import { fetcher } from '~/utils'

export const getNonce = async (chainId: number, address: string) => {
  const data = await fetcher(`${process.env.NEXT_PUBLIC_KEEP_API}/keeps/${chainId}/${address}/nonce`)

  return data.nonce
}

export const useNonce = (chainId: number, address: string) => {
  return useQuery(['nonce', chainId, address], () => getNonce(chainId, address), {
    enabled: !!chainId && !!address,
  })
}
