import { Heading, Card, Stack, Input, Textarea, Button, IconArrowLeft } from '@kalidao/reality'
import { useState } from 'react'
import { Builder } from './Builder'
type Props = {
  setView: React.Dispatch<React.SetStateAction<string>>
}

const Transaction = ({ setView }: Props) => {
  const [data, setData] = useState('')
  const [value, setValue] = useState('0')
  const [op, setOp] = useState(0)
  const [to, setTo] = useState('')
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

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
        <Button>Submit</Button>
      </Card>
    </Stack>
  )
}

export default Transaction
