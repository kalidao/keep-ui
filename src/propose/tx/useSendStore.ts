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

  // mint token
  mint_token: {
    id: number
    amount: number
    address: `0x${string}`
  }
  setMintToken: (mint_token: SendStore['mint_token']) => void

  // burn token
  burn_token: {
    id: number
    amount: number
    fromAddress: `0x${string}`
  }
  setBurnToken: (burn_token: SendStore['burn_token']) => void

  open: boolean
  setOpen: (open: boolean) => void

  reset: () => void
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

  // mint token
  mint_token: {
    id: 0,
    amount: 0,
    address: ethers.constants.AddressZero,
  },
  setMintToken: (mint_token) => set({ mint_token }),

  // burn token
  burn_token: {
    id: 0,
    amount: 0,
    fromAddress: ethers.constants.AddressZero,
  },
  setBurnToken: (burn_token) => set({ burn_token }),

  open: false,
  setOpen: (open) => set({ open }),

  reset: () => {
    set({
      title: '',
      content: {},
      action: 'none',
      op: 0,
      to: ethers.constants.AddressZero,
      value: '0',
      data: ethers.constants.HashZero,
      nonce: 0,
      send_token: [],
      send_nft: [],
      manage_signers: {
        signers: [],
        threshold: 1,
      },
      mint_token: {
        id: 0,
        amount: 1,
        address: ethers.constants.AddressZero,
      },
      burn_token: {
        id: 0,
        amount: 0,
        fromAddress: ethers.constants.AddressZero,
      },
      open: false,
    })
  },
}))
