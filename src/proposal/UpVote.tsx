import { Button, IconCheck } from '@kalidao/reality'
import { useKeepStore } from '~/dashboard/useKeepStore'
import { useTxStore } from '~/dashboard/useTxStore'
import { usePreflight } from '~/hooks/usePreflight'

import toast from '@design/Toast'

import { signAndSend } from './utils'

const UpVote = () => {
  const keep = useKeepStore((state) => state)
  const tx = useTxStore((state) => state)
  const { fly } = usePreflight(keep.chainId)

  const upvote = async () => {
    if (
      !keep.address ||
      !keep.chainId ||
      !tx.txHash ||
      !tx.to ||
      !tx.op ||
      !tx.value ||
      !tx.data ||
      tx.nonce === undefined
    ) {
      toast('error', 'Something went wrong, please try again later.')
      return
    }

    if (!tx.nonce && tx.nonce != 0) {
      toast('error', 'Invalid nonce.')
      return
    }

    await signAndSend(
      {
        chainId: keep.chainId,
        address: keep.address,
      },
      {
        op: tx.op,
        to: tx.to,
        value: tx.value,
        data: tx.data,
        nonce: tx.nonce,
        hash: tx.txHash,
      },
      true,
    )
  }

  return (
    <Button size="small" shape="circle" variant="secondary" tone="green" onClick={upvote}>
      <IconCheck />
    </Button>
  )
}

export default UpVote
