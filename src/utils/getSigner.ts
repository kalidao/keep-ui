import { ethers } from 'ethers'
import ExternalProvider from 'ethers/providers/external'

const EIP712_NOT_SUPPORTED_ERROR_MSG = 'EIP-712 not supported by your wallet.'

export const getEIP712Signer = async (version?: string) => {
  return new Promise((resolve, reject) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum as ExternalProvider)

    provider.send(signedTypedData, (err, signature) => {
      if (err) {
        reject(err)
        return
      }

      if (signature?.result == null) {
        reject(new Error(EIP712_NOT_SUPPORTED_ERROR_MSG))
        return
      }

      const sig = adjustV('eth_signTypedData', signature.result)

      resolve(sig.replace(EMPTY_DATA, ''))
    })
  })
}

export const getEthSigner = async () => {}
