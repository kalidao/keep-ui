const KEEP = require('~/constants/abis/Keep.json')

export const getKeepContractConfig = (address: string, chainId: number | undefined) => ({
  address: address,
  abi: KEEP,
  chainId: chainId,
})
