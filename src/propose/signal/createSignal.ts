import { NextRouter } from 'next/router'

import { getAuthToken } from '@dynamic-labs/sdk-react'
import { JSONContent } from '@tiptap/react'

import toast from '@design/Toast'

export const createSignal = async (address: string, chainId: number, title: string, content: JSONContent) => {
  const payload = {
    address,
    chainId,
    title,
    content,
  }

  const authToken = await getAuthToken()

  const response = await fetch(`${process.env.NEXT_PUBLIC_KEEP_API}/signals/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    },
    body: JSON.stringify(payload),
  })
    .then((res) => {
      if (res.status === 401) {
        toast('error', 'Only signers can create signals')
      }
      if (res.status === 200) {
        toast('success', 'Signal created')
        res.json().then((data) => {
          return data
        })
      }
    })
    .catch((err) => {
      toast('error', 'Something went wrong')
    })

  return response
}
