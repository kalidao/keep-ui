import { useDynamicContext } from '@dynamic-labs/sdk-react'
import { Button, IconCheck } from '@kalidao/reality'
import { ethers } from 'ethers'
import { useKeepStore } from '~/dashboard/useKeepStore'
import { useTxStore } from '~/dashboard/useTxStore'
import { tryTypedSigningV4 } from '~/utils/sign'
import { toOp } from '~/utils/toOp'

import toast from '@design/Toast'

const UpVote = () => {
  const { authToken, user } = useDynamicContext()
  const keep = useKeepStore((state) => state)
  const tx = useTxStore((state) => state)

  const upvote = async () => {
    console.log('upvote', keep.address, keep.chainId, tx.txHash, tx.op, tx.to, tx.value, tx.data)
    if (
      !keep.address ||
      !keep.chainId ||
      !tx.txHash ||
      !tx.op ||
      !tx.to ||
      !tx.value ||
      !tx.data ||
      tx.nonce != undefined
    ) {
      toast('error', 'Something went wrong, please try again later.')
      return
    }

    if (!tx.nonce && tx.nonce != 0) {
      toast('error', 'Invalid nonce.')
      return
    }

    const sign = await tryTypedSigningV4(
      {
        chainId: keep.chainId,
        address: keep.address,
      },
      {
        op: toOp(tx.op),
        to: tx.to,
        value: tx.value,
        data: tx.data,
        nonce: tx.nonce,
      },
      user?.walletPublicKey as string,
    )

    if (!sign) {
      toast('error', 'Something went wrong, please try again later.')
      return
    }

    const { v, r, s } = ethers.utils.splitSignature(sign)
    const body = {
      user: user?.walletPublicKey,
      v: v,
      r: r,
      s: s,
      type: 'yes',
    }

    const send = await fetch(`${process.env.NEXT_PUBLIC_KEEP_API}/txs/${tx?.txHash}/sign`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(body),
    })
      .then((res) => {
        if (res.status === 200) {
          toast('success', 'Successfully signed transaction.')
          return res.json()
        } else {
          toast('error', 'Something went wrong, please try again later.')
          return
        }
      })
      .catch((error: Error) => {
        console.error(error)
        toast('error', error.message)
        return
      })
  }

  return (
    <Button size="small" shape="circle" variant="secondary" tone="green" onClick={upvote}>
      <IconCheck />
    </Button>
  )
}

export default UpVote
