import { getAuthToken } from '@dynamic-labs/sdk-react'
import { JSONContent } from '@tiptap/react'

import toast from '@design/Toast'
import { NextRouter } from 'next/router'

export const createSignal = async (address: string, chainId: number, title: string, content: JSONContent, router: NextRouter) => {
  const payload = {
    address,
    chainId,
    title,
    content,
  }

  const authToken = await getAuthToken()

  console.log(authToken)

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
          router.push(`/${chainId}/${address}signal/${data.id}`)
          return data
        })
      }
    })
    .catch((err) => {
      console.error(err)
      toast('error', 'Something went wrong')
    })

  return response
}
