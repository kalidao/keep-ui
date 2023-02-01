import { Box, Button, Divider, IconRefresh, Stack } from '@kalidao/reality'

import { bodoni } from '../../pages/_app'
import * as styles from './create.css'
import { useCreateStore } from './useCreateStore'

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
