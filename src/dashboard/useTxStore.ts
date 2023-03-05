import create from 'zustand'

import { Sig } from './types'

type TxStore = {
  txHash: string | undefined
  setTxHash: (txHash: string) => void
  op: 'call' | 'delegatecall' | 'create'
  setOp: (op: 'call' | 'delegatecall' | 'create') => void
  to: string | undefined
  setTo: (to: string) => void
  value: string | undefined
  setValue: (value: string) => void
  data: string | undefined
  setData: (data: string) => void
  nonce: number | undefined
  setNonce: (nonce: number) => void
  status: string | undefined
  setStatus: (status: string) => void
  title: string | undefined
  setTitle: (title: string) => void
  content: string | undefined
  setContent: (content: string) => void
  createdAt: string | undefined
  setCreatedAt: (createdAt: string) => void
  sigs: Sig[] | []
  setSigs: (sigs: Sig[]) => void
  author: string | undefined
  setAuthor: (author: string) => void
  executedOn: number | undefined
  setExecutedOn: (executedOn: number) => void
  executionHash: string | undefined
  setExecutionHash: (executionHash: string) => void
}
export const useTxStore = create<TxStore>((set) => ({
  txHash: undefined,
  setTxHash: (txHash: string) => set({ txHash }),
  op: 'call',
  setOp: (op: 'call' | 'delegatecall' | 'create') => set({ op }),
  to: undefined,
  setTo: (to: string) => set({ to }),
  value: undefined,
  setValue: (value: string) => set({ value }),
  data: undefined,
  setData: (data: string) => set({ data }),
  nonce: undefined,
  setNonce: (nonce: number) => set({ nonce }),
  status: undefined,
  setStatus: (status: string) => set({ status }),
  title: undefined,
  setTitle: (title: string) => set({ title }),
  content: undefined,
  setContent: (content: string) => set({ content }),
  createdAt: undefined,
  setCreatedAt: (createdAt: string) => set({ createdAt }),
  sigs: [],
  setSigs: (sigs: Sig[]) => set({ sigs }),
  author: undefined,
  setAuthor: (author: string) => set({ author }),
  executedOn: undefined,
  setExecutedOn: (executedOn: number) => set({ executedOn }),
  executionHash: undefined,
  setExecutionHash: (executionHash: string) => set({ executionHash }),
}))
