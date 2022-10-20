import { Card, Stack, Heading, Text, Button, Avatar, IconArrowRight, Stat } from '@kalidao/reality'

const Treasury = () => {
  return (
    <Card padding="6">
      <Stack justify={'space-between'} space="13">
        <Heading>Treasury</Heading>
        <Stack direction={'horizontal'}>
          <Stat label="Balance" value="321" meta="USD" />
          <Stat label="NFTs" value="12" meta="ERC721" />
          <Stat label="NFTs" value="2" meta="ERC1271" />
        </Stack>
        <Stack direction={'horizontal'} align="center" justify={'space-between'}>
          <Text color="foregroundSecondary">Synced 1 minute ago.</Text>
          <Button size="small" variant="secondary">
            <IconArrowRight />
          </Button>
        </Stack>
      </Stack>
    </Card>
  )
}

export default Treasury
