import React from 'react'
import { z } from 'zod'
import { TokenTemplates } from '~/types'

export type Store = {
  // 0 for multisig, 1 for multisig + dao
  type: number
  name: string
  bio: string
  avatar?: File
  twitter?: string
  discord?: string
  website?: string
  threshold: number
  signers: {
    address: string
  }[]
}

export type CreateProps = {
  setView: React.Dispatch<React.SetStateAction<number>>
  store: Store
  setStore: React.Dispatch<React.SetStateAction<Store>>
}

// Setup 
export const setupSchema = z.object({
  body: z.object({
    address: z.string(),
    chain: z.coerce.number(),
    blocknumber: z.coerce.number(),
    name: z.string(),
    threshold: z.coerce.number(),
    signers: z.array(z.string()),
    avatar: z.string().optional(),
    templateId: TokenTemplates,
    bio: z.string().optional(),
    params: z.object({
      borderColor: z.string(),
      borderTextColor: z.string(),
      bgColor: z.string(),
      innerTextColor: z.string(),
    }),
    socials: z.object({
      twitter: z.string().optional(),
      discord: z.string().optional(),
      website: z.string().optional(),
    }),
  }),
})
