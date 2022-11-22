import { KEEP_ABI } from '~/constants/'

export const getKeepContractConfig = (address: string, chainId: number | undefined) => ({
  address: address,
  abi: KEEP_ABI,
  chainId: chainId,
})
