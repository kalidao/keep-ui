export interface Call {
  op: number
  to: string // ethereum address
  value: number // wei
  data: string // hex string
}

export interface SendNFT {
  id: string
  blockchain: 'arbitrum' | 'avalanche' | 'bsc' | 'eth' | 'fantom' | 'polygon' | 'syscoin' | 'optimism'
  name: string
  tokenId: string
  tokenUrl: string
  imageUrl: string
  collectionName: string
  symbol: string
  contractType: 'ERC721' | 'ERC1155' | 'UNDEFINED'
  contractAddress: string

  checked: boolean
  sendTo: string
}

export type SendToken = {
  token_address: string
  to: string
  amount: number
}
