import { useQuery } from '@tanstack/react-query'
import { useKeepStore } from '~/dashboard/useKeepStore'
import { fetcher } from '~/utils'

export const getKeep = async (chainId: number, address: string) => {
  const data = await fetcher(`${process.env.NEXT_PUBLIC_KEEP_API}/keeps/${chainId}/${address}/`)

  return data
}

export const useGetKeep = (chainId: number, address: string) => {
  const state = useKeepStore()
  return useQuery(
    ['keep', chainId, address],
    () => {
      return getKeep(chainId, address).then((data) => {
        state.setThreshold(data.threshold)
        const signers = data?.signers?.map((s: any) => s.signerId)
        state.setSigners(signers)
        return data
      })
    },
    {
      enabled: !!chainId && !!address,
      refetchOnWindowFocus: true,
    },
  )
}
