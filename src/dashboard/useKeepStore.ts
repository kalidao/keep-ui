import create from 'zustand'

type KeepStore = {
  chainId: number | undefined
  setChainId: (chainId: number) => void
  address: string | undefined
  setAddress: (address: string) => void
  txHash: string | undefined
  setTxHash: (txHash: string) => void
}
export const useKeepStore = create<KeepStore>((set) => ({
  chainId: undefined,
  setChainId: (chainId: number) => set({ chainId }),
  address: undefined,
  setAddress: (address: string) => set({ address }),
  txHash: undefined,
  setTxHash: (txHash: string) => set({ txHash }),
}))
