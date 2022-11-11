import { ethers } from 'ethers'

export const getProvider = (chainId: number) => {
  if (chainId === 5) return new ethers.providers.JsonRpcProvider(process.env.NEXT_PUBLIC_QUICKNODE_HTTP)
  return new ethers.providers.InfuraProvider(chainId, process.env.NEXT_PUBLIC_INFURA_ID)
}
