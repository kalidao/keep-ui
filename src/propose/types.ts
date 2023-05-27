import { AnyZodObject, z } from 'zod'
import { isAddressOrEns, validateEns } from '~/utils/ens'

import { jsonContentSchema } from './tx/sendTx'
import { SendStore } from './tx/useSendStore'

export const baseSchema = z.object({
  title: z.string().min(1, { message: 'Title cannot be empty' }),
  content: jsonContentSchema,
  action: z.enum(['none', 'manage_signers', 'send_token', 'mint_token', 'burn_token', 'builder']),
})

export const sendTokenSchema = z.object({
  transfers: z.array(
    z.object({
      token_address: z.string(),
      to: z.string().refine((val) => isAddressOrEns(val), 'Not a valid address or ENS.'),
      amount: z.coerce.number().min(0, { message: 'Amount must be greater than 0' }),
    }),
  ),
})

export type SendTokenProps = z.infer<typeof sendTokenSchema>

export const manageSignersSchema = z.object({
  signers: z
    .array(
      z.object({
        resolves: z.string().optional(),
        address: z
          .string()
          .min(1, { message: 'Address cannot be empty' })
          .refine((val) => isAddressOrEns(val), 'Not a valid address or ENS.'),
      }),
    )
    .transform((val) => val.filter((v, i, a) => a.findIndex((t) => t.address === v.address) === i)),
  threshold: z.coerce.number().min(1, { message: 'Threshold must be greater than 0' }),
})

export type ManageSignersProps = z.infer<typeof manageSignersSchema>

export const callBuilderSchema = z.object({
  to: z
    .string()
    .min(1, { message: 'To cannot be empty' })
    .refine((val) => isAddressOrEns(val), 'Not a valid address or ENS.'),
})

export type CallBuilderProps = z.infer<typeof callBuilderSchema>

export const mintTokenSchema = z.object({
  id: z.number().min(0, { message: 'ID must be greater than 0' }),
  amount: z.number().min(1, { message: 'Amount must be greater than 1' }),
  address: z
    .string()
    .min(1, { message: 'Address cannot be empty' })
    .refine((val) => isAddressOrEns(val), 'Not a valid address or ENS.')
    .transform((val) => validateEns(val)), // FIXME: Add ENS support
})

export type MintTokenProps = z.infer<typeof mintTokenSchema>

export const burnTokenSchema = z.object({
  id: z.number().min(0, { message: 'ID must be greater than 0' }),
  amount: z.number().min(1, { message: 'Amount must be greater than 1' }),
  fromAddress: z
    .string()
    .min(1, { message: 'FromAddress cannot be empty' })
    .refine((val) => isAddressOrEns(val), 'Not a valid address or ENS.')
    .transform((val) => validateEns(val)), // FIXME: Add ENS support
})

export type BurnTokenProps = z.infer<typeof burnTokenSchema>

export const schemas: { [key in SendStore['action']]: AnyZodObject } = {
  manage_signers: manageSignersSchema,
  send_token: sendTokenSchema,
  builder: callBuilderSchema,
  mint_token: mintTokenSchema,
  burn_token: burnTokenSchema,
}
