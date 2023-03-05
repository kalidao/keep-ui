import { useQuery } from '@tanstack/react-query'
import { ethers } from 'ethers'
import { fetcher } from '~/utils'

export const getUser = async (address: string) => {
  try {
    const data = await fetcher(`${process.env.NEXT_PUBLIC_KEEP_API}/users/${address}/`)

    return data
  } catch (error) {
    console.error(error)
    return error
  }
}

export const useGetUser = (address: string) => {
  return useQuery(['user', address], () => getUser(address), {
    enabled: !!address && ethers.utils.isAddress(address),
  })
}
