import Link from 'next/link'

import { Box, IconDiscord, IconGitHub, IconTwitter, Stack } from '@kalidao/reality'

import { bodoni } from '../../pages/_app'
import * as styles from './layout.css'

const Footer = () => {
  return (
    <Box height="16" paddingTop="3" as="footer" position="relative" zIndex="10">
      <Stack direction={'vertical'} align="center" justify={'space-between'}>
        <Stack direction={'horizontal'} align="center" justify={'flex-start'}>
          <a href="https://twitter.com/kali__gg" target="_blank" rel="noopener noreferrer" className={styles.link}>
            <IconTwitter aria-label="Twitter" className={styles.iconLink} />
          </a>
          <a href="https://github.com/kalidao/" target="_blank" rel="noopener noreferrer" className={styles.link}>
            <IconGitHub aria-label="GitHub" className={styles.iconLink} />
          </a>
          <a href="http://discord.gg/UKCS9ghzUE" target="_blank" rel="noopener noreferrer" className={styles.link}>
            <IconDiscord aria-label="Discord" className={styles.iconLink} />
          </a>
        </Stack>
        <Stack direction={'horizontal'} align="center" justify={'flex-start'}>
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
          <Box className={styles.link}>/</Box>
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
