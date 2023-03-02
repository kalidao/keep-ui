import { ethers } from 'ethers'
import { erc20ABI } from 'wagmi'
import { KEEP_ABI, MINT_KEY } from '~/constants'
import { TRIBUTE_ROUTER_ADDRESS } from '~/constants'

export const createPayload = (template: string, params: any): `0xstring` | string => {
  let iface, data
  switch (template) {
    case 'erc20':
      iface = new ethers.utils.Interface(erc20ABI)
      data = iface.encodeFunctionData('transfer', [params.to, ethers.utils.parseUnits(params.value, params.decimals)])
      return data as `0xstring`
    case 'add_tribute':
      iface = new ethers.utils.Interface(KEEP_ABI)
      const descriptionPayload = ethers.utils.defaultAbiCoder.encode(['string'], [params?.description])
      data = iface.encodeFunctionData('mint', [TRIBUTE_ROUTER_ADDRESS, MINT_KEY, 1, descriptionPayload])
      return data as `0xstring`
    case 'remove_tribute':
      iface = new ethers.utils.Interface(KEEP_ABI)
      data = iface.encodeFunctionData('burn', [TRIBUTE_ROUTER_ADDRESS, MINT_KEY, 1])
  }

  return 'error'
}
