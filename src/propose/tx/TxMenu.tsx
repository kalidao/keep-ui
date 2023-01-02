import { Stack, Box, Text, IconTokens, IconMenu } from '@kalidao/reality'
import { ThemeStore, useTxStore } from './useTxStore'
import * as styles from './styles.css'

interface MenuItem {
  icon: React.ReactNode
  label: string
  view: ThemeStore['view']
}

export const TxMenu = () => {
  const setView = useTxStore((state) => state.setView)

  const txs: MenuItem[] = [
    {
      icon: <IconTokens className={styles.menuIcon} />,
      label: 'Send Token',
      view: 'send_token',
    },
    {
      icon: <IconMenu className={styles.menuIcon} />,
      label: 'Apps & Services',
      view: 'app',
    },
  ]

  return (
    <Stack>
      {txs.map((tx) => (
        <Box key={tx.view} as="button" onClick={() => setView(tx.view)} className={styles.menuItem}>
          {tx.icon}
          <Text font="sans" size="extraLarge">
            {tx.label}
          </Text>
        </Box>
      ))}
    </Stack>
  )
}
