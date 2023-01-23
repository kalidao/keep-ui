import { Box, Stack, Button, IconRefresh, Divider } from '@kalidao/reality'
import { useCreateStore } from './useCreateStore'
import * as styles from './create.css'
import { bodoni } from '../../pages/_app'

export const Error = () => {
  const state = useCreateStore((state) => state)

  return (
    <Box className={styles.shell}>
      <Stack direction={'horizontal'}>
        <Stack>
          <Stack direction={'horizontal'} align={'center'} justify="center">
            <Box
              fontSize="headingOne"
              color="text"
              style={{
                ...bodoni.style,
                fontStyle: 'italic',
              }}
            >
              {state.loadingMessage}
            </Box>
          </Stack>
          <Divider />
          <Box className={styles.form}>
            <Stack direction={'horizontal'} align="center" justify="center">
              <Button as="a" href="/create" size="large" variant="transparent" prefix={<IconRefresh />}>
                Try again
              </Button>
            </Stack>
          </Box>
        </Stack>
      </Stack>
    </Box>
  )
}
