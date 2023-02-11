export const getBlockchainByChainId = (chainId: number) => {
  // 'arbitrum' | 'avalanche' | 'bsc' | 'eth' | 'fantom' | 'polygon' | 'syscoin' | 'optimism';
  switch (chainId) {
    case 137:
      return 'polygon'
    case 1:
      return 'eth'
    default:
      return 'polygon'
  }
}
