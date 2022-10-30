import { ethers } from 'ethers'
import { KEEP_HELPER_ABI, KEEP_HELPER_ADDRESS } from '~/constants'

export const getTxHash = async (
  chainId: number,
  keep: string,
  op: number,
  to: string,
  value: string,
  data: string,
  nonce: string,
) => {
  try {
    const provider = new ethers.providers.InfuraProvider(chainId, process.env.NEXT_PUBLIC_INFURA_ID)
    const contract = new ethers.Contract(KEEP_HELPER_ADDRESS, KEEP_HELPER_ABI, provider)
    const txHash = await contract.computeKeepDigest(chainId, keep, op, to, value, data, nonce)
    return txHash
  } catch (error) {
    console.error(error)
    return 'error'
  }
}
