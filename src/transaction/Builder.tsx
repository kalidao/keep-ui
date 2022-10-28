import { Card, Heading, Stack, Text, Button, IconArrowRight } from '@kalidao/reality'
import { useState } from 'react'
import { erc20ABI, erc721ABI } from 'wagmi'
import { TransferERC20 } from './TransferERC20'
import { TransferNative } from './TransferNative'

type Props = {
  setValue: React.Dispatch<React.SetStateAction<string>>
  setData: React.Dispatch<React.SetStateAction<string>>
  setOp: React.Dispatch<React.SetStateAction<number>>
  op: number
  to: string
  value: string
}

const txs = [
  {
    id: 'transfer_native',
    name: 'Transfer Native Token',
    description: 'Transfer ETH or MATIC to another address.',
    op: 0,
    value: '0',
    abi: undefined,
  },
  {
    id: 'transfer_erc20',
    name: 'Transfer Token',
    description: 'Transfer tokens to another address.',
    op: 0,
    value: '0',
    abi: erc20ABI,
    functionName: 'transferFrom',
  },
  {
    id: 'transfer_nft',
    name: 'Transfer NFT',
    description: 'Transfer NFT to another address.',
    op: 0,
    value: '0',
    abi: erc721ABI,
  },
]

export const Builder = ({ to, op, value, setValue, setData, setOp }: Props) => {
  const [view, setView] = useState('options')

  const views = {
    options: <TxOptions setView={setView} />,
    transfer_erc20: <TransferERC20 setView={setView} setData={setData} setOp={setOp} />,
    transfer_native: <TransferNative setView={setView} setData={setData} setOp={setOp} setValue={setValue} />,
  }

  return <Stack direction={'horizontal'}>{views[view]}</Stack>
}

const TxOptions = ({ setView }: { setView: React.Dispatch<React.SetStateAction<string>> }) => {
  return (
    <>
      {txs.map((tx) => (
        <Tx setView={setView} key={tx.id} tx={tx} />
      ))}
    </>
  )
}

const Tx = ({ tx, setView }: { tx: any; setView: React.Dispatch<React.SetStateAction<string>> }) => {
  const clickHandler = () => {
    setView(tx.id)
  }

  return (
    <Card level="1" padding="6">
      <Stack direction={'horizontal'}>
        <Stack>
          <Heading level="2">{tx.name}</Heading>
          <Text>{tx.description}</Text>
        </Stack>
        <Button size="small" variant="secondary" onClick={clickHandler}>
          <IconArrowRight />
        </Button>
      </Stack>
    </Card>
  )
}
