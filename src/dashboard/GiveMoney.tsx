import { useState } from 'react'
import { useRouter } from 'next/router'
import { Button, Stack, Heading, Text, IconClose, Input } from '@kalidao/reality'
import { Dialog } from '@headlessui/react'
import { dialog, dialogPanel } from '@design/dialog.css'
import toast, { Toaster } from 'react-hot-toast'
import { useKeepStore } from '~/dashboard/useKeepStore'
import { useTxStore } from '~/dashboard/useTxStore'
import { useDynamicContext } from '@dynamic-labs/sdk-react'
import { ethers, BigNumber } from 'ethers'
import { tryTypedSigningV4 } from '~/utils/sign'
import { useSendTransaction, usePrepareSendTransaction } from 'wagmi'

const GiveMoney = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [amount, setAmount] = useState('0')
  const keep = useKeepStore((state) => state)
  const { config, error } = usePrepareSendTransaction({
    request: { to: keep.address ? keep.address : ethers.constants.AddressZero, value: ethers.utils.parseEther(amount) },
    chainId: keep.chainId,
    enabled: !!keep.address,
  })
  const { data, isLoading, isSuccess, sendTransaction } = useSendTransaction(config)

  console.log('send tx', error)
  return (
    <>
      <Button shape="circle" variant="transparent" size="small" onClick={() => setIsOpen(true)}>
        🧧
      </Button>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className={dialog}>
        <Dialog.Panel className={dialogPanel}>
          <Dialog.Title>
            <Heading>Gift</Heading>
          </Dialog.Title>
          <Dialog.Description>
            <Input
              label="Amount"
              min={0}
              type="number"
              labelSecondary="ETH"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </Dialog.Description>
          <Stack direction={'horizontal'} align="center" justify="center">
            <Button width="full" tone="green" disabled={!sendTransaction} onClick={() => sendTransaction?.()}>
              Send
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

export default GiveMoney
