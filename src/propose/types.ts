import { AnyZodObject, z } from 'zod'
import { isAddressOrEns } from '~/utils/ens'

import { jsonContentSchema } from './tx/sendTx'
import { SendStore } from './tx/useSendStore'

export const baseSchema = z.object({
  title: z.string().min(1, { message: 'Title cannot be empty' }),
  content: jsonContentSchema,
  // todo: get enum from type SendStore["action"]
  action: z.enum(['none', 'manage_signers', 'send_token', 'send_nft', 'builder']),
})

export const manageSignersSchema = z.object({
  signers: z
    .array(
      z.object({
        resolves: z.string().optional(),
        address: z
          .string()
          .min(1, { message: 'Address cannot be empty' })
          .refine(async (val) => await isAddressOrEns(val), 'Not a valid address or ENS.'),
      }),
    )
    .transform((val) => val.filter((v, i, a) => a.findIndex((t) => t.address === v.address) === i)),
  threshold: z.coerce.number().min(1, { message: 'Threshold must be greater than 0' }),
})

export type ManageSignersProps = z.infer<typeof manageSignersSchema>

export const schemas: { [key in SendStore['action']]: AnyZodObject } = {
  manage_signers: manageSignersSchema,
}
