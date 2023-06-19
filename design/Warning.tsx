import React from 'react'

import { Card, IconExclamation, Stack, Text } from '@kalidao/reality'

const WarningCard = ({ children }: { children: React.ReactNode }) => (
  <Card padding="2" backgroundColor="yellow">
    <Stack direction="horizontal" justify="center" align="center">
      <IconExclamation />
      <Text weight="bold">{children}</Text>
    </Stack>
  </Card>
)

export default WarningCard
