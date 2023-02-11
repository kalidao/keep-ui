import { ethers } from 'ethers'
import create from 'zustand'

export type SendToken = {
  token_address: string
  to: string
  amount: number
}

export type SendStore = {
  title: string
  setTitle: (title: string) => void
  content: string
  setContent: (content: string) => void
  author: string
  setAuthor: (author: string) => void

  view?: 'send_token' | 'send_nft' | 'builder' | 'manage_signers' | 'nft_generator'
  setView: (view: SendStore['view']) => void
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

  // manage signers
  manage_signers: {
    signers: string[]
    threshold: number
  }
  setManageSigners: (manage_signers: SendStore['manage_signers']) => void
}

export const useSendStore = create<SendStore>((set) => ({
  title: '',
  setTitle: (title) => set({ title }),
  content: '',
  setContent: (content) => set({ content }),
  author: '',
  setAuthor: (author) => set({ author }),

  view: undefined,
  setView: (view) => set({ view }),
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
  manage_signers: {
    signers: [],
    threshold: 0,
  },
  setManageSigners: (manage_signers) => set({ manage_signers }),
}))
