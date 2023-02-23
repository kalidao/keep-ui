import Image from 'next/image'

import { Box } from '@kalidao/reality'
import { useThemeStore } from '~/hooks'

import * as styles from './styles.css'

const Empty = () => {
  const mode = useThemeStore((state) => state.mode)

  return (
    <Box className={styles.empty}>
      <Image
        src={mode === 'dark' ? '/images/castle_dark.webp' : '/images/castle.webp'}
        alt="castle"
        fill={true}
        style={{
          objectFit: 'cover',
          objectPosition: 'center',
          // decrease opacity
          opacity: 0.6,
        }}
      />
    </Box>
  )
}

export default Empty
