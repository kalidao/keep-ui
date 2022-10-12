import { ChangeEvent, InputHTMLAttributes, useState } from 'react'
import { Card, Stack, Heading, Text, Button, IconArrowRight, IconArrowLeft, Input } from '@kalidao/reality'
import Back from './Back'
import { CreateProps } from './types'
import { ethers } from 'ethers'

export const Name = ({ store, setStore, setView }: CreateProps) => {
  const [name, setName] = useState<string>(store.name)

  const submit = () => {
    setStore({
      ...store,
      name: name,
    })
    setView(2)
  }

  // TODO: Name needs to be unique per chain. Add check.
  return (
    <Stack align="flex-start" justify="space-between" space="10">
      <Back setView={setView} to={0} />
      <Input
        label="Name"
        value={name}
        description="This will be the on-chain name of your multi-sig."
        type="text"
        inputMode="text"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.currentTarget.value)}
      />
      <Button suffix={<IconArrowRight />} width="full" onClick={submit}>
        Next
      </Button>
    </Stack>
  )
}
