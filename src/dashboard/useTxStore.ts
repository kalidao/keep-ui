import create from 'zustand'

type Sig = {
  signer: string
  type: 'yes' | 'no'
  v: string
  r: string
  s: string
}

type TxStore = {
  txHash: string | undefined
  setTxHash: (txHash: string) => void
  op: string | undefined
  setOp: (op: string) => void
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
}
export const useTxStore = create<TxStore>((set) => ({
  txHash: undefined,
  setTxHash: (txHash: string) => set({ txHash }),
  op: undefined,
  setOp: (op: string) => set({ op }),
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
}))
