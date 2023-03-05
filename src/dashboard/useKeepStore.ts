import { create } from 'zustand'

interface NftData {
  token_id: string
  token_balance: string
  token_url: string | null
  supports_erc: string[]
  token_price_wei: string | null
  token_quote_rate_eth: string | null
  original_owner: string
  external_data: string | null
  owner: string
  owner_address: string | null
  burned: string | null
}

export interface Collectible {
  contract_decimals: number
  contract_name: string
  contract_ticker_symbol: string
  contract_address: string
  supports_erc: string[]
  logo_url: string
  last_transferred_at: string
  native_token: boolean
  type: string
  balance: string
  balance_24h: string | null
  quote_rate: number
  quote_rate_24h: number | null
  quote: number
  quote_24h: number | null
  nft_data: NftData[]
}

export type KeepStore = {
  chainId: number | undefined
  setChainId: (chainId: number) => void
  address: `0xstring` | undefined
  setAddress: (address: `0xstring`) => void
  threshold: number | undefined
  setThreshold: (threshold: number) => void
  signers: string[]
  setSigners: (signers: []) => void
  txFilter: 'all' | 'pending' | 'executed' | 'process'
  setTxFilter: (txFilter: 'all' | 'pending' | 'executed' | 'process') => void

  collectibles: Collectible[]
  setCollectibles: (collectibles: Collectible[]) => void

  tokens: any[]
  setTokens: (tokens: any[]) => void

  treasuryUpdatedAt: string
  setTreasuryUpdatedAt: (treasuryUpdate: string) => void
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
  txFilter: 'pending',
  setTxFilter: (txFilter: 'all' | 'pending' | 'executed' | 'process') => set({ txFilter }),

  collectibles: [],
  setCollectibles: (collectibles) => set({ collectibles }),

  tokens: [],
  setTokens: (tokens: any) => set({ tokens }),

  treasuryUpdatedAt: '',
  setTreasuryUpdatedAt: (treasuryUpdatedAt: string) => set({ treasuryUpdatedAt }),
}))
