import Link from 'next/link'

import { Box, Stack } from '@kalidao/reality'
import { timestampToTimepassed } from '~/utils/prettyDate'

import { bodoni } from '../../pages/_app'
import * as styles from './layout.css'

const Footer = () => {
  return (
    <Box padding="6" as="footer" position="relative" zIndex="10">
      <Stack direction={'horizontal'} align="center" justify={'space-between'}>
        <Box style={bodoni.style} className={styles.text}>
          Live for{' '}
          <Link
            href="https://etherscan.io/tx/0xfa3952776ce00e6206939688953841e54423060d52c9eac2e4f30831cc50b1a4"
            style={{
              ...bodoni.style,
              fontStyle: 'italic',
            }}
            className={styles.link}
          >
            {timestampToTimepassed(1667552951)}
          </Link>
        </Box>
        <Stack direction={'horizontal'}>
          <Link
            href="https://app.kali.gg/privacy"
            style={{
              ...bodoni.style,
              fontStyle: 'italic',
            }}
            className={styles.link}
          >
            Privacy Policy
          </Link>
          <Box className={styles.text}>|</Box>
          <Link
            href="https://app.kali.gg/tos"
            style={{
              ...bodoni.style,
              fontStyle: 'italic',
            }}
            className={styles.link}
          >
            Terms of Service
          </Link>
        </Stack>
      </Stack>
    </Box>
  )
}

export default Footer
