import { ethers } from 'ethers'
import { toOp } from './toOp'

export type TxArgs = {
  op: string
  to: string
  value: string // in wei
  data: string
  nonce: number
}

export type Keep = {
  chainId: number
  address: string
}

export const trySigning = async (digest: string, user: string): Promise<string | undefined> => {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum as ethers.providers.ExternalProvider)
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

export const tryTypedSigningV4 = async (keep: Keep, txArgs: TxArgs, user: string): Promise<string | undefined> => {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum as ethers.providers.ExternalProvider)
    const signer = provider.getSigner()
    const domain = getDomain(keep.chainId, keep.address)
    const types = getTypes()

    const values = {
      op: 0,
      to: txArgs.to,
      value: txArgs.value,
      data: txArgs.data,
      nonce: ethers.BigNumber.from(txArgs.nonce),
    }
    console.log('signature stuff', domain, types, values)
    const sig = await signer._signTypedData(domain, types, values)

    // const signature = await signer.provider.send('eth_signTypedData_v4', [user, JSON.stringify(message)])

    // const verifiedUser = ethers.utils.computeAddress(ethers.utils.recoverPublicKey(digest, signature)) // verify signature
    const verifiedUser = ethers.utils.verifyTypedData(domain, types, values, sig) // verify signature
    if (verifiedUser.toLowerCase() !== user.toLowerCase()) {
      alert(`Signed by: ${verifiedUser}\r\nExpected: ${user}`)
      return
    }
    return sig
  } catch (e) {
    console.error(e)
    return
  }
}

export const tryTypedSigning = async (keep: Keep, txArgs: TxArgs, user: string): Promise<string | undefined> => {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum as ethers.providers.ExternalProvider)
    const signer = provider.getSigner()
    const domain = {
      name: 'Keep',
      version: '1',
      chainId: keep.chainId,
      verifyingContract: keep.address,
    }
    const types = {
      Execute: [
        { name: 'op', type: 'uint8' },
        { name: 'to', type: 'address' },
        { name: 'value', type: 'uint256' },
        { name: 'data', type: 'bytes' },
        { name: 'nonce', type: 'uint120' },
      ],
    }
    const values = {
      op: toOp(txArgs.op),
      to: txArgs.to,
      value: ethers.BigNumber.from(txArgs.value),
      data: txArgs.data,
      nonce: ethers.BigNumber.from(txArgs.nonce),
    }
    console.log('domain', domain)
    console.log('types', types)
    console.log('values', values)

    const signature = await signer._signTypedData(domain, types, values)

    const verifiedUser = ethers.utils.verifyTypedData(domain, types, values, signature) // verify signature

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

const getDomain = (chainId: number, verifyingContract: string) => {
  return {
    name: 'Keep',
    version: '1',
    chainId,
    verifyingContract,
  }
}

const getTypes = () => {
  // Execute(uint8 op,address to,uint256 value,bytes data,uint120 nonce)
  return {
    // EIP712Domain: [
    //   { name: 'name', type: 'string' },
    //   { name: 'version', type: 'string' },
    //   { name: 'chainId', type: 'uint256' },
    //   { name: 'verifyingContract', type: 'address' },
    // ],
    Execute: [
      { name: 'op', type: 'uint8' },
      { name: 'to', type: 'address' },
      { name: 'value', type: 'uint256' },
      { name: 'data', type: 'bytes' },
      { name: 'nonce', type: 'uint120' },
    ],
  }
}
