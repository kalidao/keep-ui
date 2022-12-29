import { ethers } from 'ethers'
import { erc20ABI } from 'wagmi'

export const createPayload = async (template: string, params: any) => {
  switch (template) {
    case 'erc20':
      const iface = new ethers.utils.Interface(erc20ABI)
      console.log('erc20 params: ', params.to, ethers.utils.parseUnits(params.value, params.decimals))
      const data = iface.encodeFunctionData('transfer', [
        params.to,
        ethers.utils.parseUnits(params.value, params.decimals),
      ])
      return data
  }

  return 'error'
}
