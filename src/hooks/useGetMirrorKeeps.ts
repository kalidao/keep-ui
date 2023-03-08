import { useQuery } from '@tanstack/react-query'
import { ethers } from 'ethers'

export const getMirrorKeeps = async (address: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_KEEP_API}/keeps?address=${address}`)
    if (!res.ok) throw new Error(res.statusText)
    const data = await res.json()
    return data
  } catch (e) {
    return e as Error
  }
}

export const useGetMirrorKeeps = (address: string) => {
  return useQuery(['mirrorKeeps', address], () => getMirrorKeeps(address), {
    enabled: !!address && ethers.utils.isAddress(address),
  })
}
