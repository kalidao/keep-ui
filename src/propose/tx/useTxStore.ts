import create from 'zustand'

export type TxStore = {
  view: 'menu' | 'send_token' | 'send_nft' | 'app_tribute'
  setView: (view: 'menu' | 'send_token' | 'send_nft' | 'app_tribute') => void
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
}

export const useTxStore = create<TxStore>((set) => ({
  view: 'menu',
  setView: (view) => set({ view }),
  op: 0,
  setOp: (op) => set({ op }),
  to: `0x${'0'.repeat(40)}`,
  setTo: (to) => set({ to }),
  value: '0',
  setValue: (value) => set({ value }),
  data: `0x${'0'.repeat(40)}`,
  setData: (data) => set({ data }),
  nonce: 0,
  setNonce: (nonce) => set({ nonce }),
}))
