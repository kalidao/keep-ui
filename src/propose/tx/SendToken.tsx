import React, { useState } from 'react'
import {
  Box,
  Stack,
  Input,
  Heading,
  Card,
  Text,
  IconArrowRight,
  Button,
  Tag,
  Skeleton,
  SkeletonGroup,
} from '@kalidao/reality'
import { ChangeEvent } from 'react'
import { useQuery } from 'wagmi'
import { fetcher } from '~/utils'
import { useRouter } from 'next/router'
import { Dialog } from '@headlessui/react'
import { dialog, dialogPanel } from '@design/dialog.css'
import CloseButton from '@design/CloseButton'
import { createPayload } from '../createPayload'
import { ethers } from 'ethers'
import { useTxStore } from './useTxStore'

export const SendToken = () => {
  const [amount, setAmount] = useState('')
  const [sendTo, setSendTo] = useState('')

  const router = useRouter()
  const { chainId, keep } = router.query
  const { data: treasury } = useQuery(['keep', 'nfts', keep, chainId], () =>
    fetcher(`${process.env.NEXT_PUBLIC_KEEP_API}/keeps/${chainId}/${keep}/treasury`),
  )
  const tokens = treasury?.items.filter((item: any) => ethers.BigNumber.from(item.balance).gt(ethers.BigNumber.from(0)))

  console.log('tokens', tokens)
  return (
    <>
      <Card padding="6">
        <Stack>
          <Heading level="2">Send Token</Heading>
          <SkeletonGroup loading={tokens ? false : true}>
            <Skeleton backgroundColor={'backgroundTertiary'} height="24" width="full" />
            <Skeleton backgroundColor={'backgroundTertiary'} height="24" width="full" />
            <Skeleton backgroundColor={'backgroundTertiary'} height="24" width="full" />
          </SkeletonGroup>
          {tokens?.map((token: any) => (
            <Token
              key={token.contract_address}
              name={token.contract_name}
              symbol={token.contract_ticker_symbol}
              address={token.contract_address as `0xstring`}
              balance={ethers.utils.formatUnits(token.balance, token.contract_decimals)}
              native={Boolean(token.native_token)}
              decimals={token.contract_decimals}
              sendTo={sendTo}
              setSendTo={setSendTo}
              amount={amount}
              setAmount={setAmount}
            />
          ))}
        </Stack>
      </Card>
    </>
  )
}

type TokenProps = {
  name: string
  symbol: string
  address: `0xstring`
  balance: string
  decimals: string
  native: boolean
  sendTo: string
  amount: string
  setAmount: React.Dispatch<React.SetStateAction<string>>
  setSendTo: React.Dispatch<React.SetStateAction<string>>
}

const Token = ({
  name,
  symbol,
  address,
  decimals,
  native,
  balance,
  sendTo,
  amount,
  setAmount,
  setSendTo,
}: TokenProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const setTo = useTxStore((state) => state.setTo)
  const setData = useTxStore((state) => state.setData)
  const setValue = useTxStore((state) => state.setValue)

  const send = () => {
    setIsOpen(true)
  }

  const handleConfirm = async () => {
    console.log('amount', address, sendTo, amount, ethers.utils.parseEther(amount))
    if (native) {
      setTo(sendTo as `0xstring`)
      setData(ethers.constants.HashZero)
      setValue(ethers.utils.parseUnits(amount, decimals).toString())
    } else {
      setTo(address)
      const data = await createPayload('erc20', {
        to: sendTo,
        value: amount,
        decimals: decimals,
      })

      if (data != 'error') {
        setData(data as `0xstring`)
      }
    }

    setIsOpen(false)
  }

  return (
    <>
      <Box key={address}>
        <Stack direction={'horizontal'} align="center" justify={'space-between'}>
          <Text>{name}</Text>
          <Text>{symbol}</Text>
          <Text>{balance}</Text>
          <Button prefix={<IconArrowRight />} onClick={() => send()}>
            Send
          </Button>
        </Stack>
      </Box>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className={dialog}>
        <Dialog.Panel className={dialogPanel}>
          <div aria-hidden="true" />
          <Stack direction={'horizontal'} align="center" justify="space-between">
            <Dialog.Title>
              <Heading>Send</Heading>
            </Dialog.Title>
            <CloseButton onClick={() => setIsOpen(false)} />
          </Stack>
          {/* <Dialog.Description><Text>Set the amount and the address you want to send to.</Text></Dialog.Description> */}
          <Stack>
            {/* TODO: Provide ENS if available! */}
            <Input
              label="To"
              name="sendTo"
              description={'Ensure the address is correct!'}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setSendTo(e.target.value)}
            />
            <Input
              label="Amount"
              name="amount"
              type="number"
              labelSecondary={
                <Tag>
                  {balance} {symbol} max
                </Tag>
              }
              units={symbol}
              min={0}
              max={balance}
              placeholder={balance}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setAmount(e.target.value)}
            />
            <Button width="full" onClick={handleConfirm}>
              Confirm
            </Button>
          </Stack>
        </Dialog.Panel>
      </Dialog>
    </>
  )
}
