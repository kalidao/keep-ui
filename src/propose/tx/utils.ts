import { BigNumber, ethers } from 'ethers'
import { KEEP_ABI, SIGN_KEY } from '~/constants'

import { SendStore } from './useSendStore'

const compareSigner = (a: string, b: string) => {
  return a.toLowerCase() === b.toLowerCase()
}
const compareSigners = (a: string[], b: string[]) => {
  return a.length === b.length && a.every((v, i) => compareSigner(v, b[i]))
}

export const createManageSignersPayload = (
  address: string,
  manage_signers: SendStore['manage_signers'],
  currentSigners: string[],
  threshold: number,
): `0xstring` => {
  console.log('manage_signers', manage_signers)
  const newSigners = manage_signers.signers

  const iface = new ethers.utils.Interface(KEEP_ABI)
  let calls = []
  if (threshold !== manage_signers.threshold) {
    calls.push({
      op: 0,
      to: address,
      value: 0,
      data: iface.encodeFunctionData('setQuorum', [manage_signers.threshold]),
    })
  }
  console.log('newSigners', newSigners)
  console.log('currentSigners', currentSigners)
  const isSignerChanged = !compareSigners(newSigners, currentSigners)
  console.log('isSignerChanged', isSignerChanged)
  if (isSignerChanged) {
    // if signer is in newSigners but not in currentSigners, add it (use compareSigner)
    const signersToAdd = newSigners.filter((signer) => {
      const isSignerInCurrentSigners = currentSigners.some((currentSigner) => {
        return compareSigner(signer, currentSigner)
      })

      if (!isSignerInCurrentSigners) {
        return signer
      }
    })
    const signersToRemove = currentSigners.filter((signer) => {
      const isSignerInNewSigners = newSigners.some((newSigner) => {
        return compareSigner(signer, newSigner)
      })
      if (!isSignerInNewSigners) {
        return signer
      }
    })

    console.log('signersToAdd', signersToAdd)
    console.log('signersToRemove', signersToRemove)

    signersToAdd.forEach((signer) => {
      calls.push({
        op: 0,
        to: address,
        value: 0,
        data: iface.encodeFunctionData('mint', [
          signer,
          BigNumber.from(SIGN_KEY),
          BigNumber.from('1'),
          ethers.constants.HashZero,
        ]),
      })
    })

    signersToRemove.forEach((signer) => {
      calls.push({
        op: 0,
        to: address,
        value: 0,
        data: iface.encodeFunctionData('burn', [signer, BigNumber.from(SIGN_KEY), BigNumber.from('1')]),
      })
    })
  }

  console.log('calls', calls)

  // multiexecute encoding
  const data = iface.encodeFunctionData('multirelay', [calls])
  return data as `0xstring`
}
