import { Collapsible } from '@design/Collapsible'
import { ButtonCard, Stack, Box, IconExclamationCircle, Text, IconChevronDown } from '@kalidao/reality'

const ViewTx = ({ tx }: { tx: any }) => {
  return (
    <ButtonCard
      buttonText={'This will add the Tribute app.'}
      prefix={<IconExclamationCircle color="accent" />}
      width="180"
    >
      <Stack>
        <Stack direction={'horizontal'} justify="space-between" align="center">
          <Text>Type</Text>
          <Text weight="bold">{tx?.op?.toUpperCase()}</Text>
        </Stack>
        <Stack direction={'horizontal'} justify="space-between" align="center">
          <Text>Nonce</Text>
          <Text weight="bold">{tx?.nonce}</Text>
        </Stack>
        <Stack direction={'horizontal'} justify="space-between" align="center">
          <Text>To</Text>
          <Text weight="bold">{tx?.to}</Text>
        </Stack>
        <Stack direction={'horizontal'} justify="space-between" align="center">
          <Text>Value</Text>
          <Text weight="bold">{tx?.value}</Text>
        </Stack>
        <Collapsible
          trigger={
            <Box width="full" display={'flex'} flexDirection={'row'} justifyContent="space-between" alignItems="center">
              <Text wordBreak="break-word">Data</Text>
              <IconChevronDown />
            </Box>
          }
        >
          <Box>
            <Text weight="bold" wordBreak="break-word">
              {tx?.data}
            </Text>
          </Box>
        </Collapsible>
      </Stack>
    </ButtonCard>
  )
}

export default ViewTx
