import { useQuery } from '@tanstack/react-query'
import { fetcher } from '~/utils'

export const getSignalComments = async (signalId: string, commentId?: string) => {
  if (commentId) {
    const res = await fetcher(`${process.env.NEXT_PUBLIC_KEEP_API}/gcomments?commentId=${commentId}`).catch((e) => {
      return new Error('Error fetching signal')
    })
    return res
  }
  const res = await fetcher(`${process.env.NEXT_PUBLIC_KEEP_API}/comments?signalId=${signalId}`).catch((e) => {
    return new Error('Error fetching signal')
  })

  return res
}

export const useGetSignalComments = (signalId: string, commentId?: string) => {
  return useQuery(['signalComments', signalId, commentId], () => getSignalComments(signalId, commentId), {
    refetchInterval: 1000 * 60,
  })
}
