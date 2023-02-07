import { fetcher } from './fetcher'

export const fetchContractAbi = async (address: string, chainId: number) => {
  const url =
    getApiPrefix(chainId) + `api?module=contract&action=getabi&address=${address}&apikey=${getApiToken(chainId)}`
  const response = await fetcher(url)
  if (response.status === '1') {
    return JSON.parse(response.result)
  } else {
    return null
  }
}

export const getApiPrefix = (chainId: number) => {
  switch (chainId) {
    case 1:
      return 'https://api.etherscan.io/'
    case 137:
      return 'https://api.polygonscan.com/'
    default:
      return 'https://api.etherscan.io/'
  }
}

export const getApiToken = (chainId: number) => {
  switch (chainId) {
    case 1:
      return process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY
    case 137:
      return process.env.NEXT_PUBLIC_POLYGONSCAN_API_KEY
    default:
      return process.env.ETHERSCAN_API_KEY
  }
}
