import { NextRouter } from 'next/router'

import { getAuthToken } from '@dynamic-labs/sdk-react'
import { z } from 'zod'
import { getNonce } from '~/hooks/useNonce'
import { getUser } from '~/utils/user'

import toast from '@design/Toast'

export declare type JSONContent = {
  type?: string
  attrs?: Record<string, any>
  content?: JSONContent[]
  marks?: {
    type: string
    attrs?: Record<string, any>
    [key: string]: any
  }[]
  text?: string
  [key: string]: any
}

const baseJSONContentSchema = z.object({
  type: z.string().optional(),
  attrs: z.record(z.any()).optional(),
  marks: z
    .array(
      z.object({
        type: z.string(),
        attrs: z.record(z.any()).optional(),
      }),
    )
    .optional(),
  text: z.string().optional(),
})

export const jsonContentSchema: z.ZodType<JSONContent> = baseJSONContentSchema.extend({
  content: z.lazy(() => jsonContentSchema.array().optional()),
})

const bodySchema = z.object({
  txHash: z.string(),
  op: z.string(),
  to: z.string(),
  value: z.string(),
  data: z.string(),
  nonce: z.coerce.number(),
  title: z.string(),
  content: jsonContentSchema,
  userId: z.string(),
})

const sendBodySchema = bodySchema.omit({ nonce: true, userId: true })

// exclude nonce and userId from bodySchema
type Body = z.infer<typeof sendBodySchema>

export const sendTx = async (chainId: number, address: string, body: Body, router: NextRouter) => {
  const user = getUser()
  if (!user) {
    toast('error', 'Error: No user logged in')
    return
  }
  const authToken = getAuthToken()
  const send = await fetch(`${process.env.NEXT_PUBLIC_KEEP_API}/keeps/${chainId}/${address}/addTx`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${authToken}`,
    },
    body: JSON.stringify({
      ...body,
      userId: user?.blockchainAccounts?.[0]?.address,
    }),
  })
    .then(async (res) => {
      if (!res.ok) {
        const data = await res.json()
        toast('error', `Error sending transaction: ${data?.message}`)
      }
      const data = await res.json()

      console.log('tx submitted', data)

      toast('success', 'Success: Transaction sent')
      router.push(`/${chainId}/${address}/tx/${data.data.txHash}`)
    })
    .catch((e) => {
      toast('error', 'Error: Invalid transaction')
    })
}
