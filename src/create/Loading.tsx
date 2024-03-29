import { Box, Divider, Stack } from '@kalidao/reality'

import { bodoni } from '../../pages/_app'
import { Splash } from './Splash'
import * as styles from './create.css'
import { useCreateStore } from './useCreateStore'

export const Loading = () => {
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
            <Splash type="loading" />
          </Box>
        </Stack>
      </Stack>
    </Box>
  )
}
