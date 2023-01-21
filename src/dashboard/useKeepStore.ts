import create from 'zustand'

type KeepStore = {
  chainId: number | undefined
  setChainId: (chainId: number) => void
  address: `0xstring` | undefined
  setAddress: (address: `0xstring`) => void
}
export const useKeepStore = create<KeepStore>((set) => ({
  chainId: undefined,
  setChainId: (chainId: number) => set({ chainId }),
  address: undefined,
  setAddress: (address: `0xstring`) => set({ address }),
}))
