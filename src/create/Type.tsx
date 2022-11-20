import { Card, Stack, Heading, Text, Button, IconArrowRight, Tag } from '@kalidao/reality'
import { CreateProps } from './types'

export const Type = ({ store, setStore, setView }: CreateProps) => {
  const navigate = (to: number) => {
    setStore({
      ...store,
      type: to,
    })
    setView(1)
  }

  return (
    <Stack>
      <Card padding="6" borderRadius={'2xLarge'} hover>
        <Stack direction={'horizontal'} align="center" justify={'space-between'}>
          <Stack>
            <Heading level="2">Multisig</Heading>
            <Text>Group wallet represented by NFTs</Text>
          </Stack>
          <Button shape="circle" variant="primary" tone="green" onClick={() => navigate(0)}>
            <IconArrowRight />
          </Button>
        </Stack>
      </Card>
      <Card padding="6" borderRadius={'2xLarge'}>
        <Stack direction={'horizontal'} align="center" justify={'space-between'}>
          <Stack>
            <Heading level="2">Multisig + DAO</Heading>
            <Text>Group wallet with governance token</Text>
          </Stack>
          <Button disabled={true} shape="circle" variant="primary" tone="green" onClick={() => navigate(0)}>
            <IconArrowRight />
          </Button>
        </Stack>
      </Card>
    </Stack>
  )
}
