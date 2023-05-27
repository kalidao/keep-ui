import { useQuery } from '@tanstack/react-query'
import { ethers } from 'ethers'
import { fetcher } from '~/utils'

export const getUser = async (address: string) => {
  const res = await fetcher(`${process.env.NEXT_PUBLIC_KEEP_API}/users/${address}/`)

  if (res.status !== 'success') {
    throw new Error('Failed to fetch')
  }

  return res.data
}

export const useGetUser = (address: string) => {
  return useQuery(['user', address], () => getUser(address), {
    enabled: !!address && ethers.utils.isAddress(address),
  })
}
