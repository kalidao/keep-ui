import { Box, Card, Stack, Heading, Text, Button, IconArrowRight } from '@kalidao/reality'
import * as styles from './create.css'
import { Splash } from './Splash'
import { useCreateStore } from './useCreateStore'

export const Type = () => {
  const setType = useCreateStore((state) => state.setType)
  const setView = useCreateStore((state) => state.setView)

  const navigate = (to: number) => {
    setType(to)
    setView('identity')
  }

  return (
    <>
      <Splash />
      <Box className={styles.typeShell}>
        <Stack align={'center'}>
          <Card padding="6" borderRadius={'2xLarge'} width="180" hover>
            <Stack direction={'horizontal'} align="center" justify={'space-between'}>
              <Stack>
                <Heading level="2">Multisig</Heading>
                <Text>Group wallet with NFT signer keys.</Text>
              </Stack>
              <Button shape="circle" variant="primary" tone="green" onClick={() => navigate(0)}>
                <IconArrowRight />
              </Button>
            </Stack>
          </Card>
          <Card padding="6" borderRadius={'2xLarge'} width="180">
            <Stack direction={'horizontal'} align="center" justify={'space-between'}>
              <Stack>
                <Heading level="2">Multisig + DAO</Heading>
                <Text>Group wallet with governance token.</Text>
              </Stack>
              <Button disabled={true} shape="circle" variant="primary" tone="green" onClick={() => navigate(1)}>
                <IconArrowRight />
              </Button>
            </Stack>
          </Card>
        </Stack>
      </Box>
    </>
  )
}
