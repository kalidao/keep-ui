import { Collapsible } from '@design/Collapsible'
import { ButtonCard, Stack, Box, IconExclamationCircle, Text, IconChevronDown } from '@kalidao/reality'

const ViewTx = ({ tx }: { tx: any }) => {
  return (
    <ButtonCard
      buttonText={''}
      prefix={<IconExclamationCircle color="accent" />}
      width={{
        xs: '80',
        md: '128',
        lg: '180',
        xl: '180',
      }}
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
        <Collapsible label="Data">
          <Box
            backgroundColor={'background'}
            padding="2"
            borderRadius={'2xLarge'}
            width={{
              xs: '40',
              md: '64',
              lg: '80',
            }}
          >
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
