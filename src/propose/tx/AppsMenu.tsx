import { Box, Text, Stack } from '@kalidao/reality'
import * as styles from './styles.css'
import { useTxStore } from './useTxStore'

export const AppsMenu = () => {
  const setView = useTxStore((state) => state.setView)

  return (
    <Stack>
      <Box className={styles.menuItem} as="button" onClick={() => setView('app_tribute')}>
        <Box className={styles.menuIcon}>📝</Box>
        <Text>Tribute</Text>
      </Box>
    </Stack>
  )
}
