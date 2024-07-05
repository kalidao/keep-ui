import { useQuery } from '@tanstack/react-query'
import { fetcher } from '~/utils'

export const getTxs = async (chainId: number, address: string) => {
  const data = await fetcher(`${process.env.NEXT_PUBLIC_KEEP_API}/txs?chainId=${chainId}&address=${address}`)

  return data.txs
}

export const useGetTxs = (chainId: number, address: string) => {
  return useQuery(['txs', chainId, address], () => getTxs(chainId, address))
}
