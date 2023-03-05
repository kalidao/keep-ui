import { BigNumber, ethers } from 'ethers'
import { erc20ABI } from 'wagmi'
import { KEEP_ABI, SIGN_KEY } from '~/constants'
import { getProvider } from '~/utils/getProvider'

import { SendStore } from './useSendStore'

const encodeTransfer = async (chainId: number, contractAddress: string, to: string, amount: number) => {
  try {
    const provider = getProvider(chainId)
    const contract = new ethers.Contract(contractAddress, KEEP_ABI, provider)
    const decimals = await contract.decimals()

    const amountInWei = ethers.utils.parseUnits(amount.toString(), decimals).toString()
    console.log('token transfer', contractAddress, to, amount, amountInWei, decimals)
    const iface = new ethers.utils.Interface(erc20ABI)
    const data = iface.encodeFunctionData('transfer', [to, amountInWei])
    return data
  } catch (e) {
    console.error('Transfer', e)
    throw new Error('Error creating transfer payload')
  }
}

export const createSendTokenPayload = async (chainId: number, transfers: any[]) => {
  let calls = []
  for (let i = 0; i < transfers.length; i++) {
    const transfer = transfers[i]
    const { custom_token_address, token_address, to, amount } = transfer
    let address = ''
    if (token_address === 'custom') address = custom_token_address
    else address = token_address

    if (address == ethers.constants.AddressZero) {
      calls.push({
        op: 0,
        to: to,
        value: ethers.utils.parseEther(transfer.amount.toString()).toString(),
        data: ethers.constants.HashZero,
      })
    } else {
      const data = await encodeTransfer(chainId, address, to, amount)

      calls.push({
        op: 0,
        to: address,
        value: 0,
        data,
      })
    }
  }

  console.log('token transfers', calls)

  const data = multirelay(calls)

  return data
}

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

const multirelay = (calls: any[]): `0xstring` => {
  const iface = new ethers.utils.Interface(KEEP_ABI)
  const data = iface.encodeFunctionData('multirelay', [calls])
  return data as `0xstring`
}
