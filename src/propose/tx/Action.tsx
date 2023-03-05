import { Box, Card, Divider, Heading, Stack } from '@kalidao/reality'

import { actions } from './Toolbox'
import { useSendStore } from './useSendStore'

export const Action = () => {
  const tx = useSendStore((state) => state)
  const action = actions.find((a) => a.value === tx.action) || null

  if (action) {
    if (action.value === 'none') return null
    return (
      <Box
        padding="3"
        width={{
          xs: '3/4',
          lg: 'full',
        }}
        minHeight="96"
      >
        <Stack>
          <Stack direction={'horizontal'} align="center">
            <Box color="text">{action.icon}</Box>
            <Heading level="2" color="text">
              {action.label}
            </Heading>
          </Stack>
          <Divider />
          {action.component}
        </Stack>
      </Box>
    )
  }

  return null
}
