import { Heading, Card, Stack, Input, Textarea, Button, IconArrowLeft } from '@kalidao/reality'
import { ethers } from 'ethers'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useAccount, useContractRead } from 'wagmi'
import { KEEP_ABI, KEEP_HELPER_ABI, KEEP_HELPER_ADDRESS } from '~/constants'
import { Builder } from './Builder'
type Props = {
  setView: React.Dispatch<React.SetStateAction<string>>
}

const Transaction = ({ setView }: Props) => {
  const router = useRouter()
  const { address: author } = useAccount()
  const { chainId, keep } = router.query
  const [data, setData] = useState('')
  const [value, setValue] = useState('0')
  const [op, setOp] = useState(0)
  const [to, setTo] = useState('')
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const { data: nonce, refetch: refetchNonce } = useContractRead({
    address: keep as `0xstring`,
    abi: KEEP_ABI,
    functionName: 'nonce',
  })
  const {
    data: txDigest,
    refetch: refetchDigest,
    error: txDigestError,
  } = useContractRead({
    address: KEEP_HELPER_ADDRESS,
    abi: KEEP_HELPER_ABI,
    functionName: 'computeKeepDigest',
    enabled: false,
    args: [
      chainId ? ethers.BigNumber.from(chainId) : ethers.BigNumber.from(137),
      keep as `0xstring`,
      op,
      to as `0xstring`,
      value ? ethers.utils.parseEther(value) : ethers.BigNumber.from(0),
      data as `0xstring`,
      nonce ? ethers.BigNumber.from(nonce) : ethers.BigNumber.from(0),
    ],
  })

  const handleTx = async () => {
    const { data: nonce } = await refetchNonce()
    const { data: digest } = await refetchDigest()
    console.log('nonce', nonce)
    console.log('digest', digest)

    if (!nonce) return
    const body = {
      op: op,
      to: to,
      data: data,
      nonce: nonce.toString(),
      value: ethers.utils.parseEther(value).toString(),
      txHash: txDigest,
      title: title,
      content: content,
      authorAddress: author,
    }
    console.log('body', body)

    const send = await fetch(`http://localhost:3000/keeps/${chainId}/${keep}/addTx`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }).then((res) => res.json())

    console.log('send', send)
  }
  console.log('tx digest', txDigest, txDigestError)
  // TODO: Signal for Guilds
  return (
    <Stack direction={'horizontal'} justify="space-between">
      <Button shape="circle" variant="tertiary" size="small" onClick={() => setView('preview')}>
        <IconArrowLeft />
      </Button>
      <Card level="2" padding="6" width="full">
        <Input
          label="Title"
          description="It is a required."
          placeholder="I am a title of sorts."
          onChange={(e) => setTitle(e.currentTarget.value)}
        />
        <Textarea
          label="Description"
          description="You can use this field for context."
          placeholder="I am signaling silly lil things for my silly lil community."
          onChange={(e) => setContent(e.currentTarget.value)}
        />
        <Heading level="2">Build the Transaction</Heading>
        <Input
          label="To"
          description="The address to which this transaction is directed at."
          placeholder="0x"
          onChange={(e) => setTo(e.currentTarget.value)}
        />
        <Builder value={value} op={op} to={to} setValue={setValue} setData={setData} setOp={setOp} />
        <Button onClick={handleTx}>Submit</Button>
      </Card>
    </Stack>
  )
}

export default Transaction
