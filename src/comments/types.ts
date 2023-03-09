import { z } from 'zod'
import { jsonContentSchema } from '~/propose/tx/sendTx'

export enum CommentHome {
  Signal = 'signal',
  Tx = 'tx',
}

export const createCommentBodySchema = z.object({
  signalId: z.string().optional(),
  txId: z.string().optional(),
  parentId: z.string().optional(),
  content: jsonContentSchema,
})

export type CreateCommentBodyProps = z.infer<typeof createCommentBodySchema>
