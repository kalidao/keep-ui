import chains from '~/constants/chains.json'

export const getChainName = (chainId: number) => {
  const chain = chains.find((chain) => chain.chainId === chainId)
  return chain ? chain.name : 'Unknown'
}
