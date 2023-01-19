import chains from '~/constants/chains.json'

export const getExplorerLink = (value: string, type: 'tx' | 'address', chainId: number) => {
  const prefix = getPrefix(chainId)
  if (prefix) {
    return `${prefix}/${type}/${value}`
  }
  return ''
}

export const getPrefix = (chainId: number) => {
  const chain = chains.find((chain) => chain.chainId === chainId)
  return chain?.explorers?.[0]?.url
}
