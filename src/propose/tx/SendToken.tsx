import React, { useState, useEffect } from 'react'
import { Stack, Input, Heading, Card, Text, IconArrowRight, Button, IconClose } from '@kalidao/reality'
import { ChangeEvent } from 'react'
import { useQuery } from 'wagmi'
import { fetcher } from '~/utils'
import { useRouter } from 'next/router'
import { Dialog } from '@headlessui/react'
import { dialog, dialogPanel } from '@design/dialog.css'
import CloseButton from '@design/CloseButton'

type Props = {
  value: string
  setValue: React.Dispatch<React.SetStateAction<string>>
  to: string
  setTo: React.Dispatch<React.SetStateAction<string>>
  data: string
  setData: React.Dispatch<React.SetStateAction<string>>
}

export const SendToken = ({ to, setTo, value, setValue, data, setData }: Props) => {
  const [amount, setAmount] = useState('')
  const [sendTo, setSendTo] = useState('')

  const router = useRouter()
  const { chainId, keep } = router.query
  const { data: treasury } = useQuery(['keep', 'nfts'], () =>
    fetcher(`http://localhost:3000/keeps/${chainId}/${keep}/treasury`),
  )
  const tokens = treasury?.tokens
  console.log('tokens', tokens)

  return (
    <>
      <Card padding="6">
        <Stack>
          <Heading level="2">Send Token</Heading>
          {tokens?.map((token: any) => (
            <Token
              name={token.token.name}
              symbol={token.token.symbol}
              address={token.token.contractAddress}
              balance={token.value}
              decimals={token.token.decimals}
              setTo={setTo}
              setAmount={setAmount}
              setSendTo={setSendTo}
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
  setTo: React.Dispatch<React.SetStateAction<string>>
  setAmount: React.Dispatch<React.SetStateAction<string>>
  setSendTo: React.Dispatch<React.SetStateAction<string>>
  setData: React.Dispatch<React.SetStateAction<string>>
}

const Token = ({ name, symbol, address, balance, setTo, setAmount, setSendTo, setData }: TokenProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const send = (tokenAddress: string) => {
    setTo(tokenAddress)
    setIsOpen(true)
  }

  return (
    <>
      <Card padding="6" level="2" key={address}>
        <Stack direction={'horizontal'} align="center" justify={'space-between'}>
          <Text>{name}</Text>
          <Text>{symbol}</Text>
          <Text>{balance}</Text>
          <Button prefix={<IconArrowRight />} onClick={() => send(address)}>
            Send
          </Button>
        </Stack>
      </Card>
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
              onChange={(e: ChangeEvent<HTMLInputElement>) => setAmount(e.currentTarget.value)}
            />
            <Button width="full" onClick={() => setIsOpen(false)}>
              Confirm
            </Button>
          </Stack>
        </Dialog.Panel>
      </Dialog>
    </>
  )
}
