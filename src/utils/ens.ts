import { ethers } from 'ethers'
import { getProvider } from './getProvider'

export const validateEns = async (ens: string) => {}

export const getEnsAddress = async (ens: string) => {
  if (!ens) return null
  if (ethers.utils.isAddress(ens)) return ens
  if (!ens.endsWith('.eth')) return null
  try {
    const provider = getProvider(1)
    const address = await provider.resolveName(ens)
    return address
  } catch (e) {
    return null
  }
}
