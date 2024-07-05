import { useQuery } from '@tanstack/react-query'
import { ethers } from 'ethers'
import { fetcher } from '~/utils'

export const getMirrorKeeps = async (address: string) => {
  const res = await fetcher(`${process.env.NEXT_PUBLIC_KEEP_API}/keeps?address=${address}`)
  console.log('getMirrorKeeps', res)
  return res.keeps
}

export const useGetMirrorKeeps = (address: string) => {
  return useQuery(['mirrorKeeps', address], () => getMirrorKeeps(address), {
    enabled: !!address && ethers.utils.isAddress(address),
  })
}
