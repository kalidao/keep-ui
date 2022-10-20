import { Card, Stack, Heading, Text, Avatar } from '@kalidao/reality'

const Wrappr = () => {
  return (
    <Card padding="6">
      <Stack>
        <Stack direction={'horizontal'} align="center" justify={'space-between'}>
          <Heading>Wrappr</Heading>
          <Avatar shape="square" size="12" label="Wrappr" src="" placeholder />
        </Stack>
        <Text>Created on 11th July, 2022</Text>
      </Stack>
    </Card>
  )
}

export default Wrappr
