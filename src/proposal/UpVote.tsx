import { Button, IconCheck } from '@kalidao/reality'
import { ethers } from 'ethers'
import { useSignTypedData, useSigner } from 'wagmi'
import { useKeepStore } from '~/dashboard/useKeepStore'
import { useTxStore } from '~/dashboard/useTxStore'
import { toOp } from '~/utils/toOp'

import toast from '@design/Toast'

import { sendSign } from './utils'

const UpVote = () => {
  const keep = useKeepStore((state) => state)
  const tx = useTxStore((state) => state)
  const { signTypedDataAsync } = useSignTypedData({
    domain: {
      name: 'Keep',
      version: '1',
      chainId: keep.chainId,
      verifyingContract: keep.address,
    },
    types: {
      Execute: [
        { name: 'op', type: 'uint8' },
        { name: 'to', type: 'address' },
        { name: 'value', type: 'uint256' },
        { name: 'data', type: 'bytes' },
        { name: 'nonce', type: 'uint120' },
      ],
    },
    value: {
      op: toOp(tx.op),
      to: tx.to as `0xstirng`,
      value: ethers.BigNumber.from(tx.value ?? '0'),
      data: (tx.data as `0xstring`) ?? ethers.constants.HashZero,
      nonce: ethers.BigNumber.from(tx.nonce ?? '0'),
    },
  })
  const { refetch: refetchSigner } = useSigner()

  const upvote = async () => {
    try {
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
        throw new Error('Something went wrong, please try again later.')
      }

      if (!tx.nonce && tx.nonce != 0) {
        throw new Error('Invalid nonce.')
      }

      const signer = await (await refetchSigner()).data

      if (!signer) {
        throw new Error('Please connect your wallet.')
      }

      const signature = await signTypedDataAsync()

      await sendSign(tx.txHash, signature, true)
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast('error', error.message)
      } else {
        toast('error', 'An unexpected error occurred.')
      }
    }
  }

  return (
    <Button size="small" shape="circle" variant="secondary" tone="green" onClick={upvote}>
      <IconCheck />
    </Button>
  )
}

export default UpVote
