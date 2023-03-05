import { useQuery } from '@tanstack/react-query'
import { ethers } from 'ethers'
import { fetcher } from '~/utils'

export const getTxs = async (chainId: number, address: string) => {
  try {
    const data = await fetcher(`${process.env.NEXT_PUBLIC_KEEP_API}/txs/${chainId}/${address}/`)
    return data
  } catch (error) {
    return Promise.reject(error)
  }
}

export const useGetTxs = (chainId: number, address: string) => {
  return useQuery(['txs', chainId, address], () => getTxs(chainId, address))
}
