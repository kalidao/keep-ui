import { ethers } from 'ethers'

import { getProvider } from './getProvider'

export const validateEns = async (ens: string) => {
  try {
    if (ethers.utils.isAddress(ens)) return ens
    const provider = getProvider(1)
    const address = await provider.resolveName(ens)
    return address
  } catch (e) {
    return ens
  }
}

export const isAddressOrEns = async (addressOrEns: string) => {
  console.log("isAddressOrEns", addressOrEns)
  if (ethers.utils.isAddress(addressOrEns)) return true
  if (!addressOrEns.endsWith('.eth')) return false
  const ens = await validateEns(addressOrEns)
  return !!ens
}

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
