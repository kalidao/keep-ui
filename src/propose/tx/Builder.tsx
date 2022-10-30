import React, { useState, useEffect } from 'react'
import { Stack, Heading, Input, Card } from '@kalidao/reality'
import { ChangeEvent } from 'react'

type Props = {
  value: string
  setValue: React.Dispatch<React.SetStateAction<string>>
  to: string
  setTo: React.Dispatch<React.SetStateAction<string>>
  data: string
  setData: React.Dispatch<React.SetStateAction<string>>
}

export const Builder = ({ to, setTo, value, setValue, data, setData }: Props) => {
  const [abi, setABI] = useState<[]>()
  const [functions, setFunctions] = useState([])
  const callTo = async (e: ChangeEvent<HTMLInputElement>) => {
    setTo(e.currentTarget.value)
    try {
      const res = await fetch(
        `https://api.polygonscan.com/api?module=contract&action=getabi&address=${e.currentTarget.value}&apikey=${process.env.NEXT_PUBLIC_POLYGONSCAN_API_KEY}`,
      ).then((res) => res.json())
      if (res.message == 'OK') {
        setABI(JSON.parse(res.result))
      }
    } catch (e) {
      console.error('e', e)
    }
  }

  let fns
  // if (abi && abi.length !== 0) {
  //   console.log('abi', abi)
  //   fns = abi.filter((x) => x?.type === 'function').sort((a, b) => a?.name.localeCompare(b.name))
  //   console.log('fns', fns)
  // }
  return (
    <Card padding="6">
      <Stack>
        <Heading level="2">Tx Builder</Heading>
        <Input
          label="To"
          description="The address to which this transaction is directed at."
          placeholder="0x"
          onChange={callTo}
        />
        <Input
          label="Value"
          type="number"
          description="The amount of ether to send with this transaction."
          placeholder="0.0"
        />
      </Stack>
    </Card>
  )
}
