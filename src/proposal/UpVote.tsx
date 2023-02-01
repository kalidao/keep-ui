import { useDynamicContext } from '@dynamic-labs/sdk-react'
import { Button, IconCheck } from '@kalidao/reality'
import { ethers } from 'ethers'
import { useKeepStore } from '~/dashboard/useKeepStore'
import { useTxStore } from '~/dashboard/useTxStore'
import { tryTypedSigningV4 } from '~/utils/sign'
import { toOp } from '~/utils/toOp'

const UpVote = () => {
  const { authToken, user } = useDynamicContext()
  const keep = useKeepStore((state) => state)
  const tx = useTxStore((state) => state)

  const upvote = async () => {
    if (!keep.address || !keep.chainId || !tx.txHash || !tx.op || !tx.to || !tx.value || !tx.data || !tx.nonce) return

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

    if (!sign) return
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
      .then((res) => res.json())
      .catch((err) => console.log(err))
  }

  return (
    <Button size="small" shape="circle" variant="secondary" tone="green" onClick={upvote}>
      <IconCheck />
    </Button>
  )
}

export default UpVote
