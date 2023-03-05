import { fetcher } from './fetcher'
import { Abi } from 'abitype/zod'

export const fetchContractAbi = async (address: string, chainId: number) => {
  const url =
    getApiPrefix(chainId) + `api?module=contract&action=getabi&address=${address}&apikey=${getApiToken(chainId)}`
  const response = await fetcher(url)
  if (response.status >= 1) {
  console.log('response', response)
  // convert string to array 
  const abi = Abi.parse(JSON.parse(response.result))
  console.log('abi', abi)
  return abi
  } else {
   console.error('Failed to fetch contract abi', response)
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
