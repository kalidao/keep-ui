import { useQuery } from '@tanstack/react-query'
import { fetcher } from '~/utils'

export const getSignalComments = async (signalId: string) => {
  try {
    const res = await fetcher(`${process.env.NEXT_PUBLIC_KEEP_API}/comments?signalId=${signalId}`)
    return res
  } catch (e) {
    return e as Error
  }
}

export const getTxComments = async (txId: string) => {
  try {
    const res = await fetcher(`${process.env.NEXT_PUBLIC_KEEP_API}/comments?txId=${txId}`)
    return res
  } catch (e) {
    return e as Error
  }
}

export const useGetComments = (signalId?: string, txId?: string) => {
  return useQuery(
    ['comments', signalId, txId],
    () => {
      if (signalId) {
        return getSignalComments(signalId)
      } else if (txId) {
        return getTxComments(txId)
      }
      return null
    },
    {
      enabled: !!signalId || !!txId,
      refetchInterval: 1000 * 60,
    },
  )
}

export const getComment = async (commentId: string) => {
  try {
    const res = await fetcher(`${process.env.NEXT_PUBLIC_KEEP_API}/comments?commentId=${commentId}`)
    return res
  } catch (e) {
    return e as Error
  }
}

export const useGetComment = (commentId: string) => {
  return useQuery(['comment', commentId], () => getComment(commentId), {
    enabled: !!commentId,
    refetchInterval: 1000 * 60,
  })
}
