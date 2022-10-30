import { useState } from 'react'
import { Tag } from '@kalidao/reality'
import { NextRouter } from 'next/router'
import { Button, Stack, Heading, Text, IconClose } from '@kalidao/reality'
import { Dialog } from '@headlessui/react'
import { dialog, dialogPanel } from '@design/dialog.css'
import toast, { Toaster } from 'react-hot-toast'

type Props = {
  txHash: string
  router: NextRouter
  chainId: string
  keep: string
}

const Delete = ({ txHash, router, chainId, keep }: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const deleteTx = async () => {
    const res = await fetch(`http://localhost:3000/txs/${txHash}`, {
      method: 'POST',
    }).then((res) => res.json())

    console.log('res', res)

    if (res) {
      toast('Transaction deleted!')
      router.push(`/${chainId}/${keep}`)
      return
    }
  }

  return (
    <>
      <Button shape="circle" variant="secondary" tone="red" size="small" onClick={() => setIsOpen(true)}>
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

export default Delete
