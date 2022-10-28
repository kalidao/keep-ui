import { Card, Stack, Input, Textarea, Button } from '@kalidao/reality'

const Preview = () => {
  return (
    <Card level="2" padding="6">
      <Stack>
        <Input label="Title" description="It is a required." placeholder="I am a title of sorts." />
        <Textarea
          label="Description"
          description="You can use this field for context."
          placeholder="I am a signaling silly lil things for my silly lil community."
        />
        <Button>Submit</Button>
      </Stack>
    </Card>
  )
}

export default Preview
