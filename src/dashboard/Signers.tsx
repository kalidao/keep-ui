import { Avatar, Card, Heading, Stack, Text } from '@kalidao/reality'

const Signers = () => {
  const signers = ['shivanshi.eth', 'ross.eth', 'audsssy.eth', 'jordanteague.eth']
  return (
    <Card padding="6">
      <Stack space="4" align={'flex-start'}>
        <Heading transform="capitalize">Signers</Heading>
        <Stack space={'2'}>
          {signers &&
            signers.map((signer) => {
              return (
                <Stack direction="horizontal" align="center">
                  <Avatar src="" placeholder label={signer} />
                  <Text>{signer}</Text>
                </Stack>
              )
            })}
        </Stack>
      </Stack>
    </Card>
  )
}

export default Signers
