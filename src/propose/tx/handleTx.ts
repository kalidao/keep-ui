import { BigNumber, ethers } from 'ethers'
import { erc721ABI } from 'wagmi'
import { KEEP_ABI } from '~/constants/'
import { KeepStore } from '~/dashboard/useKeepStore'

import customToast from '@design/Toast'

import { Call } from './types'
import { SendStore } from './useSendStore'

export const handleTx = (address: string, tx: SendStore) => {
  switch (tx.view) {
    case 'send_token':
      handleSendToken(tx)
      break
    case 'send_nft':
      handleSendNFT(address, tx)
      break
    case 'manage_signers':
      handleManageSigners(tx)
      break
    default:
      break
  }
}

const handleSendToken = (tx: SendStore) => {}

export const handleSendNFT = (address: string, tx: SendStore): `0xstring` => {
  // multirelay
  console.log(
    'tx.send_nft',
    tx.send_nft.filter((nft) => nft.checked),
  )

  const calls: Call[] = tx.send_nft
    .filter((nft) => nft.checked)
    .map((nft) => {
      let data = ''
      switch (nft.contractType) {
        case 'ERC721':
          data = safeTransferFrom721(address, nft.sendTo, Number(nft.tokenId))
          break
        case 'ERC1155':
          data = safeTransferFrom1155(address, nft.sendTo, Number(nft.tokenId), '1')
          break
        default:
          break
      }

      return {
        op: 0,
        to: nft.contractAddress,
        value: 0,
        data: data,
      }
    })

  const iface = new ethers.utils.Interface(KEEP_ABI)
  const data = iface.encodeFunctionData('multirelay', [calls])
  return data as `0xstring`
}

const handleManageSigners = (tx: SendStore) => {}

export const safeTransferFrom721 = (from: string, to: string, tokenId: number) => {
  console.log('tx.send_nft', from, to, tokenId)
  const iface = new ethers.utils.Interface(erc721ABI)

  const data = iface.encodeFunctionData('safeTransferFrom(address,address,uint256)', [
    from,
    to,
    BigNumber.from(tokenId.toString()),
  ])
  return data
}

//  address from,
// address to,
// uint256 id,
// uint256 amount,
// bytes calldata data
export const safeTransferFrom1155 = (from: string, to: string, tokenId: number, amount: string) => {
  const iface = new ethers.utils.Interface(KEEP_ABI)
  return iface.encodeFunctionData('safeTransferFrom(address, address, uint256, bytes)', [
    from,
    to,
    tokenId,
    BigNumber.from(amount),
    ethers.constants.HashZero,
  ])
}

export const multirelay = (calls: Call[]) => {
  const iface = new ethers.utils.Interface(KEEP_ABI)
  return iface.encodeFunctionData('multirelay', [calls])
}
