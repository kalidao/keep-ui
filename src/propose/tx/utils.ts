import { BigNumber, ethers } from 'ethers'
import { KEEP_ABI, SIGN_KEY } from '~/constants'

import { SendStore } from './useSendStore'

export const createManageSignersPayload = (
  address: string,
  manage_signers: SendStore['manage_signers'],
  currentSigners: string[],
  threshold: number,
): `0xstring` => {
  const newSigners = manage_signers.signers.filter((signer) => ethers.utils.isAddress(signer))
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
  if (manage_signers.signers != currentSigners) {
    const signersToAdd = newSigners.filter((signer) => !currentSigners.includes(signer))
    const signersToRemove = currentSigners.filter((signer) => !manage_signers.signers.includes(signer))
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

  // multiexecute encoding
  const data = iface.encodeFunctionData('multiexecute', [calls])
  return data as `0xstring`
}
