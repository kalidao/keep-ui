import { useDynamicContext } from '@dynamic-labs/sdk-react'
import { Button, IconClose } from '@kalidao/reality'
import { ethers } from 'ethers'
import { useKeepStore } from '~/dashboard/useKeepStore'
import { useTxStore } from '~/dashboard/useTxStore'
import { tryTypedSigningV4 } from '~/utils/sign'

import toast from '@design/Toast'

import { signAndSend } from './utils'

const DownVote = () => {
  const keep = useKeepStore((state) => state)
  const tx = useTxStore((state) => state)

  const downvote = async () => {
    if (
      !keep.address ||
      !keep.chainId ||
      !tx.txHash ||
      !tx.op === undefined ||
      !tx.to ||
      !tx.value === undefined ||
      !tx.data ||
      tx.nonce === undefined
    ) {
      toast('error', 'Something went wrong, please try again later.')
      return
    }

    await signAndSend(
      {
        chainId: keep.chainId,
        address: keep.address,
      },
      {
        op: 'call',
        to: ethers.constants.AddressZero,
        value: '0',
        data: ethers.constants.HashZero,
        nonce: tx.nonce,
        hash: tx.txHash,
      },
      false,
    )
  }

  return (
    <Button shape="circle" variant="secondary" tone="red" size="small" onClick={downvote}>
      <IconClose />
    </Button>
  )
}

export default DownVote
