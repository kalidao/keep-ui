import { useState } from 'react'

import { useRouter } from 'next/router'

import { useDynamicContext } from '@dynamic-labs/sdk-react'
import { Dialog } from '@headlessui/react'
import { Button, Heading, IconClose, IconEth, Input, Stack, Text } from '@kalidao/reality'
import { BigNumber, ethers } from 'ethers'
import toast, { Toaster } from 'react-hot-toast'
import { usePrepareSendTransaction, useSendTransaction } from 'wagmi'
import { useKeepStore } from '~/dashboard/useKeepStore'

import { dialog, dialogPanel } from '@design/dialog.css'

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

  return (
    <>
      <Button suffix={<IconEth />} size="small" variant="transparent" onClick={() => setIsOpen(true)}>
        Fund
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
