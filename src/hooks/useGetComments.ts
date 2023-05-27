import { useQuery } from '@tanstack/react-query'
import { fetcher } from '~/utils'

export const getSignalComments = async (signalId: string) => {
  const res = await fetcher(`${process.env.NEXT_PUBLIC_KEEP_API}/comments?signalId=${signalId}`)

  if (res.status !== 'success') {
    throw new Error('Failed')
  }

  return res.data.comments
}

export const getTxComments = async (txId: string) => {
  const res = await fetcher(`${process.env.NEXT_PUBLIC_KEEP_API}/comments?txId=${txId}`)
  if (res.status !== 'success') {
    throw new Error('Failed')
  }

  return res.data.comments
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
  const res = await fetcher(`${process.env.NEXT_PUBLIC_KEEP_API}/comments?commentId=${commentId}`)
  console.log('Comment Fetched')
  if (res.status !== 'success') {
    throw new Error('Failed')
  }

  return res.data.comments
}

export const useGetComment = (commentId: string) => {
  return useQuery(['comment', commentId], () => getComment(commentId), {
    enabled: !!commentId,
    refetchInterval: 1000 * 60,
  })
}
