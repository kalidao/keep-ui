import React, { useState, useEffect } from 'react'
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
  IconClose,
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

type Props = {
  to: string
  setTo: React.Dispatch<React.SetStateAction<string>>
  data: string
  setData: React.Dispatch<React.SetStateAction<string>>
}

export const SendToken = ({ to, setTo, data, setData }: Props) => {
  const [amount, setAmount] = useState('')
  const [sendTo, setSendTo] = useState('')

  const router = useRouter()
  const { chainId, keep } = router.query
  const { data: treasury, isLoading } = useQuery(['keep', 'nfts', keep, chainId], () =>
    fetcher(`${process.env.NEXT_PUBLIC_KEEP_API}/keeps/${chainId}/${keep}/treasury`),
  )
  const tokens = treasury?.tokens
  console.log('tokens', keep, chainId, treasury)

  return (
    <>
      <Card padding="6">
        <Stack>
          <Heading level="2">Send Token</Heading>
          {/* TODO: ADD NATIVE TOKEN - ETH, MATIC */}
          <SkeletonGroup loading={tokens ? false : true}>
            <Skeleton backgroundColor={'backgroundTertiary'} height="24" width="full" />
            <Skeleton backgroundColor={'backgroundTertiary'} height="24" width="full" />
            <Skeleton backgroundColor={'backgroundTertiary'} height="24" width="full" />
          </SkeletonGroup>
          {tokens?.map((token: any) => (
            <Token
              key={token.token.contractAddress}
              name={token.token.name}
              symbol={token.token.symbol}
              address={token.token.contractAddress}
              balance={token.value}
              decimals={token.token.decimals}
              sendTo={sendTo}
              setSendTo={setSendTo}
              setTo={setTo}
              amount={amount}
              setAmount={setAmount}
              setData={setData}
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
  address: string
  balance: string
  decimals: string
  sendTo: string
  amount: string
  setAmount: React.Dispatch<React.SetStateAction<string>>
  setTo: React.Dispatch<React.SetStateAction<string>>
  setSendTo: React.Dispatch<React.SetStateAction<string>>
  setData: React.Dispatch<React.SetStateAction<string>>
}

const Token = ({
  name,
  symbol,
  address,
  decimals,
  balance,
  sendTo,
  setTo,
  amount,
  setAmount,
  setSendTo,
  setData,
}: TokenProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const send = (tokenAddress: string) => {
    setTo(address)
    setSendTo(tokenAddress)
    setIsOpen(true)
  }

  const handleConfirm = async () => {
    console.log('amount', address, sendTo, amount, ethers.utils.parseEther(amount))
    const data = await createPayload('erc20', {
      to: sendTo,
      value: amount,
      decimals: decimals,
    })

    if (data != 'error') {
      setData(data)
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
          <Button prefix={<IconArrowRight />} onClick={() => send(address)}>
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
              labelSecondary={<Tag>{balance} DAI max</Tag>}
              units={symbol}
              min={0}
              max={balance}
              placeholder={balance}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setAmount(e.currentTarget.value)}
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
