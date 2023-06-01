import { BigNumber, ethers } from 'ethers'
import { erc20ABI } from 'wagmi'
import { KALI_FACTORY_ABI, KALI_FACTORY_ADDRESS,  } from '~/constants'
import { getEnsAddress } from '~/utils/ens'
import { getProvider } from '~/utils/getProvider'

// import { SendStore } from './useSendStore'

export const createDaoPayload = (
    address:string,
    name: string,
    symbol:string,
  ): `0xstring` => {
    const iface = new ethers.utils.Interface(KALI_FACTORY_ADDRESS)
    const data = iface.encodeFunctionData('deployKali', [address, BigNumber.from('0'), ethers.utils.formatBytes32String(name), [], "", [BigNumber.from('86400'),BigNumber.from('1'), BigNumber.from('20'), BigNumber.from('60')]])
    
    return data as `0xstring`
  }