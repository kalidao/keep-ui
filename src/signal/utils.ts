import { getAuthToken } from '@dynamic-labs/sdk-react'
import { JSONContent } from '@tiptap/react'

import toast from '@design/Toast'

export const vote = async (signalId: string, userId: string, vote: boolean, authToken: string) => {
  await fetch(`${process.env.NEXT_PUBLIC_KEEP_API}/signals/${signalId}/sign`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    },
    body: JSON.stringify({
      user: userId,
      vote: vote == true ? 'yes' : 'no',
    }),
  })
    .then((res) => {
      if (res.status === 200) {
        toast('success', 'Voted! 💌')
      } else {
        res.json().then((data) => {
          toast('error', `Error: ${data.error.name}`)
        })
      }
    })
    .catch((e) => {
      console.error(e)
      toast('error', 'Something went wrong. Please try again.')
    })
}

export const signalCommentVote = async (signalId: string, commentId: string, vote: boolean, authToken: string) => {
  await fetch(
    `${process.env.NEXT_PUBLIC_KEEP_API}/signals/${signalId}/comment/${commentId}?vote=${vote === true ? 'yes' : 'no'}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
    },
  )
    .then((res) => {
      if (res.status === 200) {
        toast('success', `${vote ? '🖤' : '💔'}`)
      } else {
        res.json().then((data) => {
          toast('error', `Error: ${data.error.name}`)
        })
      }
    })
    .catch((e) => {
      console.error(e)
      toast('error', 'Something went wrong. Please try again.')
    })
}

export const commentOnSignal = async (signalId: string, comment: JSONContent, authToken: string, parentId?: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_KEEP_API}/signals/${signalId}/comment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({ comment: comment, parentId: parentId }),
    })
    const data = await res.json()
    if (res.status === 200) {
      toast('success', 'Commented!')
      return data
    } else {
      toast('error', 'Error while commenting')
      throw new Error(data)
    }
  } catch (error) {
    console.error(error)
    toast('error', 'Error while commenting')
    throw new Error(`Error while commenting on signal ${signalId} with comment ${comment} and auth token ${authToken}`)
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
      method: 'POST',
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
