import { Box, Card, Stack, Input, Textarea, Button } from '@kalidao/reality'
import { preview } from '@design/blur.css'

const Preview = () => {
  return (
    <Box className={preview} padding="6">
      {/* <Card level="2" padding="6">
        <Stack>
          <Input label="Title" description="It is a required." placeholder="I am a title of sorts." />
          <Textarea
            label="Description"
            description="You can use this field for context."
            placeholder="I am a signaling silly lil things for my silly lil community."
          />
          <Button>Submit</Button>
        </Stack>
      </Card> */}
    </Box>
  )
}

export default Preview
