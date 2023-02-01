import { useState } from 'react'

import { useRouter } from 'next/router'

import { useDynamicContext } from '@dynamic-labs/sdk-react'
import { Dialog } from '@headlessui/react'
import { Button, Heading, IconClose, Stack, Text } from '@kalidao/reality'
import { ethers } from 'ethers'
import toast, { Toaster } from 'react-hot-toast'
import { useKeepStore } from '~/dashboard/useKeepStore'
import { useTxStore } from '~/dashboard/useTxStore'
import { tryTypedSigningV4 } from '~/utils/sign'

import { dialog, dialogPanel } from '@design/dialog.css'

const DownVote = () => {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const keep = useKeepStore((state) => state)
  const tx = useTxStore((state) => state)
  const { authToken, user } = useDynamicContext()

  console.log('user', user)

  const deleteTx = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_KEEP_API}/txs/${tx?.txHash}`, {
      method: 'POST',
    }).then((res) => res.json())

    console.log('res', res)

    if (res) {
      toast('Transaction deleted!')
      router.push(`/${keep?.chainId}/${keep?.address}`)
      return
    }
  }

  const downvote = async () => {
    if (!keep.address || !keep.chainId || !tx.nonce) return

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

    if (!sign) return
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
      .then((res) => res.json())
      .catch((err) => console.log(err))
  }

  return (
    <>
      <Button shape="circle" variant="secondary" tone="red" size="small" onClick={downvote}>
        <IconClose />
      </Button>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className={dialog}>
        <Dialog.Panel className={dialogPanel}>
          <div aria-hidden="true" />
          <Dialog.Title>
            <Heading>Are you sure you want to delete this proposal?</Heading>
          </Dialog.Title>
          <Dialog.Description>
            <Text>This action cannot be undone. All signatures will be deleted.</Text>
          </Dialog.Description>
          <Stack direction={'horizontal'} align="center" justify="center">
            <Button width="full" onClick={deleteTx} tone="red">
              Confirm
            </Button>
            <Button width="full" variant="tertiary" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
          </Stack>
        </Dialog.Panel>
      </Dialog>
      <Toaster />
    </>
  )
}

export default DownVote
