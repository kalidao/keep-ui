import { useDynamicContext } from '@dynamic-labs/sdk-react'
import { Button, IconClose } from '@kalidao/reality'
import { ethers } from 'ethers'
import { useKeepStore } from '~/dashboard/useKeepStore'
import { useTxStore } from '~/dashboard/useTxStore'
import { tryTypedSigningV4 } from '~/utils/sign'

import toast from '@design/Toast'

const DownVote = () => {
  const keep = useKeepStore((state) => state)
  const tx = useTxStore((state) => state)
  const { authToken, user } = useDynamicContext()

  const downvote = async () => {
    console.log('downvote', keep, tx)
    if (!keep.address || !keep.chainId || tx.nonce === undefined) {
      toast('error', 'Something went wrong, please try again later.')
      return
    }

    const sign = await tryTypedSigningV4(
      {
        chainId: keep.chainId,
        address: keep.address,
      },
      {
        op: 0,
        to: ethers.constants.AddressZero,
        value: '0',
        data: ethers.constants.HashZero,
        nonce: tx.nonce,
      },
      user?.walletPublicKey as string,
    )

    console.log('downvote sign', sign)

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
      type: 'no',
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
        } else {
          toast('error', 'Something went wrong, please try again later.')
        }
      })
      .catch((error: Error) => {
        toast('error', error.message)
        return
      })
  }

  return (
    <Button shape="circle" variant="secondary" tone="red" size="small" onClick={downvote}>
      <IconClose />
    </Button>
  )
}

export default DownVote
