import { useQuery } from '@tanstack/react-query'
import { fetcher } from '~/utils'

export const getNonce = async (chainId: number, address: string) => {
  const res = await fetcher(`${process.env.NEXT_PUBLIC_KEEP_API}/keeps/${chainId}/${address}/nonce`)

  if (res.status !== 'success') {
    throw new Error('Failed to fetch')
  }
  return res.data.nonce
}

export const useNonce = (chainId: number, address: string) => {
  return useQuery(['nonce', chainId, address], () => getNonce(chainId, address), {
    enabled: !!chainId && !!address,
  })
}
