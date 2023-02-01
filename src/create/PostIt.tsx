import { Box, Card, Divider, Heading, IconExclamationCircleSolid, Stack } from '@kalidao/reality'
import { useMediaQuery } from 'react-responsive'

export const PostIt = ({
  title,
  warning,
  children,
}: {
  title: string
  warning?: boolean
  children: React.ReactNode
}) => {
  const sm = useMediaQuery({ query: '(max-width: 640px)' })

  if (sm) {
    return null
  }

  if (warning) {
    return (
      <Card width="112" padding="6">
        <Stack>
          <Stack direction={'horizontal'}>
            <IconExclamationCircleSolid size="10" color="red" />
            <Heading level="2">{title}</Heading>
          </Stack>
          <Divider />
          <Box>{children}</Box>
        </Stack>
      </Card>
    )
  }
  return (
    <Card width="112" padding="6">
      <Stack>
        <Heading level="2">{title}</Heading>
        <Divider />
        <Box>{children}</Box>
      </Stack>
    </Card>
  )
}
