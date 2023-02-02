import create from 'zustand'

type KeepStore = {
  chainId: number | undefined
  setChainId: (chainId: number) => void
  address: `0xstring` | undefined
  setAddress: (address: `0xstring`) => void
  threshold: number | undefined
  setThreshold: (threshold: number) => void
  signers: string[]
  setSigners: (signers: []) => void
}

export const useKeepStore = create<KeepStore>((set) => ({
  chainId: undefined,
  setChainId: (chainId: number) => set({ chainId }),
  address: undefined,
  setAddress: (address: `0xstring`) => set({ address }),
  threshold: undefined,
  setThreshold: (threshold: number) => set({ threshold }),
  signers: [],
  setSigners: (signers: string[]) => set({ signers }),
}))
