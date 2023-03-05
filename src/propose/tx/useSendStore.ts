import { JSONContent } from '@tiptap/react'
import { ethers } from 'ethers'
import { create } from 'zustand'

import { ActionTypes } from './Toolbox'
import { SendNFT, SendToken } from './types'

export type SendStore = {
  title: string
  setTitle: (title: string) => void
  content: JSONContent
  setContent: (content: JSONContent) => void
  author: string
  setAuthor: (author: string) => void

  action: ActionTypes
  setAction: (view: SendStore['action']) => void
  op: number
  setOp: (op: number) => void
  to: `0x${string}`
  setTo: (to: `0x${string}`) => void
  value: string // in ether, convert to wei string before sending
  setValue: (value: string) => void
  data: `0x${string}`
  setData: (data: `0x${string}`) => void
  nonce: number
  setNonce: (nonce: number) => void

  // send token
  send_token: SendToken[]
  setSendToken: (send_token: SendToken[]) => void

  // send nft
  send_nft: SendNFT[]
  setSendNft: (send_nft: SendNFT[]) => void

  // manage signers
  manage_signers: {
    signers: string[]
    threshold: number
  }

  setManageSigners: (manage_signers: SendStore['manage_signers']) => void

  open: boolean
  setOpen: (open: boolean) => void
}

export const useSendStore = create<SendStore>((set) => ({
  title: '',
  setTitle: (title) => set({ title }),
  content: {},
  setContent: (content) => set({ content }),
  author: '',
  setAuthor: (author) => set({ author }),

  action: 'none',
  setAction: (action) => set({ action }),

  op: 0,
  setOp: (op) => set({ op }),
  to: ethers.constants.AddressZero,
  setTo: (to) => set({ to }),
  value: '0',
  setValue: (value) => set({ value }),
  data: ethers.constants.HashZero,
  setData: (data) => set({ data }),
  nonce: 0,
  setNonce: (nonce) => set({ nonce }),

  // send token
  send_token: [],
  setSendToken: (send_token) => set({ send_token }),

  // send nft
  send_nft: [],
  setSendNft: (send_nft) => set({ send_nft }),

  // manage signers
  manage_signers: {
    signers: [],
    threshold: 1,
  },
  setManageSigners: (manage_signers) => set({ manage_signers }),

  open: false,
  setOpen: (open) => set({ open }),
}))
