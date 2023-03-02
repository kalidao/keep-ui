import { NextRouter } from 'next/router'

import { JSONContent } from '@tiptap/react'

import toast from '@design/Toast'

export const sendTx = async (
  chainId: number,
  address: string,
  body: {
    op: string
    to: string
    data: string
    nonce: string
    value: string
    txHash: string
    title: string
    content: JSONContent
    userId: string
  },
  router: NextRouter,
) => {
  const send = await fetch(`${process.env.NEXT_PUBLIC_KEEP_API}/keeps/${chainId}/${address}/addTx`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
    .then(async (res) => {
      const data = await res.json()
      if (res.status === 200) {
        toast('success', 'Success: Transaction sent')
        router.push(`/${chainId}/${address}/${data.txHash}`)
      } else {
        toast('error', `Error: ${data.message}`)
      }
    })
    .catch((e) => {

      toast('error', 'Error: Invalid transaction')
    })
    .finally(() => {

      router.push(`/${chainId}/${address}`)
    })
}
