import { useQuery } from '@tanstack/react-query'
import { fetcher } from '~/utils'

export const getSignal = async (id: string) => {
  const res = await fetcher(`${process.env.NEXT_PUBLIC_KEEP_API}/signals/${id}`).catch((e) => {
    return new Error('Error fetching signal')
  })

  return res
}

export const useGetSignal = (id: string) => {
  return useQuery(['signal', id], () => getSignal(id), {
    refetchInterval: 1000 * 60,
    enabled: !!id,
  })
}
