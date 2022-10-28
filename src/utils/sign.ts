import { getEIP712Signer } from '~/utils/getSigner'
import { Operation } from '~/types'
import { ethers } from 'ethers'

export type TxArgs = {
  op: Operation
  to: string
  value: string // in wei
  data: string
  nonce: number
}

export const trySigning = async (keep: string, user: string): Promise<string | undefined> => {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const digest = '' // get digest from helper
    const signature = await signer.provider.send('eth_sign', [user, digest])

    const verifiedUser = ethers.utils.computeAddress(ethers.utils.recoverPublicKey(digest, signature)) // verify signature

    if (verifiedUser.toLowerCase() !== user.toLowerCase()) {
      alert(`Signed by: ${verifiedUser}\r\nExpected: ${user}`)
      return
    }
    return signature
  } catch (e) {
    console.error(e)
    return
  }
}
