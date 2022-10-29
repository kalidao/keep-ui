import { Operation } from '~/types'
import { ethers } from 'ethers'
import { ExternalProvider } from '@ethersproject/providers'

export type TxArgs = {
  op: Operation
  to: string
  value: string // in wei
  data: string
  nonce: number
}

export const trySigning = async (digest: string, user: string): Promise<string | undefined> => {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum as ExternalProvider)
    const signer = provider.getSigner()
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
