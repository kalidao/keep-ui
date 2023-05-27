import { useQuery } from '@tanstack/react-query'
import { fetcher } from '~/utils'

export const getSignal = async (id: string) => {
  const res = await fetcher(`${process.env.NEXT_PUBLIC_KEEP_API}/signals/${id}`)

  if (res.status !== 'success') {
    throw new Error('Failed')
  }

  return res.data.signal
}

export const useGetSignal = (id: string) => {
  return useQuery(['signal', id], () => getSignal(id), {
    refetchInterval: 1000 * 60,
    enabled: !!id,
  })
}
