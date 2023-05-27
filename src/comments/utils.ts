import { getAuthToken } from '@dynamic-labs/sdk-react'
import { JSONContent } from '@tiptap/core'

import toast from '@design/Toast'

import { CommentHome } from './types'
import { createCommentBodySchema } from './types'

export const voteOnComment = async (commentId: string, vote: boolean) => {
  try {
    const authToken = getAuthToken()

    if (!authToken) {
      toast('error', 'Please sign in to vote.')
      return
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_KEEP_API}/comments/${commentId}/vote?type=${vote === true ? 'yes' : 'no'}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
      },
    )
    const data = await res.json()

    if (res.status === 200) {
      toast('success', `${vote ? '🖤' : '💔'}`)
      return data
    } else {
      throw new Error(data.error)
    }
  } catch (e) {
    console.error(e)
    toast('error', 'Something went wrong. Please try again.')
    return Error(`Error while voting on comment ${commentId} with vote ${vote}`)
  }
}

export const createComment = async ({
  home,
  signalId,
  txId,
  parentId,
  content,
}: {
  home: CommentHome
  signalId?: string
  txId?: string
  parentId?: string
  content: JSONContent
}) => {
  try {
    const authToken = await getAuthToken()

    if (!authToken) {
      toast('error', 'Please sign in to comment.')
      return
    }

    if (!createCommentBodySchema.parse({ home, signalId, txId, parentId, content })) {
      toast('error', 'Invalid comment body.')
      return Error(`Invalid comment body: ${JSON.stringify({ home, signalId, txId, parentId, content })}`)
    }

    const url = `${process.env.NEXT_PUBLIC_KEEP_API}/comments?${
      home === CommentHome.Signal ? `signalId=${signalId}` : `txId=${txId}`
    }${parentId ? `&parentId=${parentId}` : ''}`
    const body = {
      signalId: signalId,
      txId: txId,
      parentId: parentId,
      content: content,
    }
    console.log('COMMENT BODY', body)
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(body),
    })

    console.info('COMMENT RES', res)

    const data = await res.json()
    console.info('COMMENT', {
      res,
      data,
    })
    if (res.status === 200) {
      toast('success', 'Commented!')
      return data
    } else {
      toast('error', 'Error while commenting')
      throw new Error(data)
    }
  } catch (error) {
    toast('error', 'Something went wrong. Please try again.')
    return Error(
      `Error while creating comment on ${home} ${signalId || txId} with parent ${parentId} and content ${content}`,
    )
  }
}

export const editComment = async (commentId: string, comment: JSONContent) => {
  try {
    const authToken = await getAuthToken()

    if (!authToken) {
      toast('error', 'Please sign in to edit a comment')
      return
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_KEEP_API}/comments/${commentId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({ comment: comment }),
    })

    const data = await res.json()

    if (res.status === 200) {
      toast('success', 'Comment edited!')
      return data
    } else {
      toast('error', 'Error while editing comment')
      throw new Error(data)
    }
  } catch (e) {
    console.error(e)
    toast('error', 'Error while editing comment')
    throw new Error(`Error while editing comment ${commentId} with comment ${comment}`)
  }
}

export const deleteComment = async (commentId: string) => {
  try {
    const authToken = await getAuthToken()
    if (!authToken) {
      throw new Error('Please sign in to delete a comment')
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_KEEP_API}/comments/${commentId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
    })

    const data = await res.json()

    if (res.status === 200) {
      toast('success', 'Comment deleted!')
      return data
    }

    throw new Error(data.error)
  } catch (e) {
    console.error(e)
    toast('error', 'Error while deleting comment')
    return e
  }
}
