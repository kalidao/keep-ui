import { JSONContent } from '@tiptap/react'

import toast from '@design/Toast'

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
