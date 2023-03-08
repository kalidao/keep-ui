import { ethers } from 'ethers'
import { KEEP_HELPER_ABI, KEEP_HELPER_ADDRESS } from '~/constants'
import { getProvider } from '~/utils/getProvider'

export const getTxHash = async (
  chainId: number,
  keep: string,
  op: number,
  to: string,
  value: string,
  data: string,
  nonce: string,
) => {
  try {
    const provider = getProvider(137)
    const contract = new ethers.Contract(KEEP_HELPER_ADDRESS, KEEP_HELPER_ABI, provider)
    const txHash = await contract.computeKeepDigest(chainId, keep, op, to, value, data, nonce)
    return txHash
  } catch (error) {
    console.error(error)
    return 'error'
  }
}

const EXECUTE_TYPEHASH = ethers.utils.id('Execute(uint8 op,address to,uint256 value,bytes data,uint120 nonce)')
const DOMAIN_TYPEHASH = ethers.utils.id(
  'EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)',
)
const DOMAIN_NAME = '0x8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f'
const DOMAIN_VERSION = '0x21d66785fec14e4da3d76f3866cf99a28f4da49ec8782c3cab7cf79c1b6fa66b'

export const computeKeepDigest = (
  chainId: number,
  keep: string,
  op: number,
  to: string,
  value: string,
  data: string,
  nonce: number,
) => {
  try {
    const KEEP_DOMAIN_SEPARATOR = ethers.utils.solidityPack(
      ['bytes32', 'bytes32', 'bytes32', 'uint256', 'address'],
      [DOMAIN_TYPEHASH, DOMAIN_NAME, DOMAIN_VERSION, chainId, keep],
    )
    const EXECUTE_HASH = ethers.utils.solidityKeccak256(
      ['bytes'],
      [
        ethers.utils.solidityPack(
          ['bytes32', 'uint8', 'address', 'uint256', 'bytes32', 'uint120'],
          [EXECUTE_TYPEHASH, op, to, value, ethers.utils.solidityKeccak256(['bytes'], [data]), nonce],
        ),
      ],
    )

    const digest = ethers.utils.solidityKeccak256(
      ['bytes'],
      [ethers.utils.solidityPack(['string', 'bytes32', 'bytes32'], ['\x19\x01', KEEP_DOMAIN_SEPARATOR, EXECUTE_HASH])],
    )

    return digest
  } catch (e) {
    console.error(e)
    return 'error'
  }
}
