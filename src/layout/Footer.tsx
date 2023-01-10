import { Box, Stack } from '@kalidao/reality'
import Link from 'next/link'
import * as styles from './layout.css'
import { bodoni } from '../../pages/_app'

const Footer = () => {
  return (
    <Box padding="6" as="footer" position="relative" zIndex="10">
      <Stack direction={'horizontal'} align="center" justify={'space-between'}>
        <Box className={styles.text}>
          Built by{' '}
          <Link href="https://twitter.com/kali__gg" style={bodoni.style} className={styles.link}>
            KaliCo.
          </Link>
        </Box>
        <Stack direction={'horizontal'}>
          <Link href="https://app.kali.gg/privacy" style={bodoni.style} className={styles.link}>
            Privacy Policy
          </Link>
          <Box className={styles.text}>|</Box>
          <Link href="https://app.kali.gg/tos" style={bodoni.style} className={styles.link}>
            Terms of Service
          </Link>
        </Stack>
      </Stack>
    </Box>
  )
}

export default Footer
