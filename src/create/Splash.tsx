import React, { useEffect, useState } from 'react'

import { Box } from '@kalidao/reality'
import { useThemeStore } from '~/hooks'

import * as styles from './create.css'

const c = 10

export const Splash = ({ type }: { type?: string }) => {
  const [n, setN] = useState(1)
  const [hue, setHue] = useState<number>()
  const mode = useThemeStore((state) => state.mode)

  useEffect(() => {
    setHue(Math.floor(Math.random() * 255))
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setN(n + 1)
    }, 10)

    return () => clearInterval(interval)
  })

  const toDegrees = (angle: number) => {
    return angle * (90 / Math.PI)
  }

  const getXY = (n: number) => {
    if (typeof window == 'undefined') return { x: 0, y: 0 }
    const angle = n * 137.5
    const r = c * Math.sqrt(n)

    const x = r * Math.cos(toDegrees(angle)) + window.innerWidth / 2
    const y = r * Math.sin(toDegrees(angle)) + window.innerHeight / 2

    return { x: x, y: y }
  }

  let circles = []
  for (let i = 1; i < n; ++i) {
    if (!hue) return null

    let strokeColor, fillColor
    if (mode === 'dark') {
      strokeColor = `hsl(${hue}, 100%, 10%)`
    } else {
      strokeColor = `hsl(${hue}, 100%, 70%)`
    }
    fillColor = `hsl(${hue}, 100%, ${99 - (i / n) * 100}%)`

    circles.push(<circle stroke={strokeColor} fill={fillColor} r={10} cx={getXY(i).x} cy={getXY(i).y} key={i} />)
  }

  if (type == 'loading') {
    return (
      <Box className={styles.splashLoading}>
        {typeof window === 'undefined' ? null : (
          <svg
            style={{ backgroundColor: 'transparent', minHeight: '90vh', width: '100%' }}
            viewBox={`0 0 ${window?.innerWidth} ${window?.innerHeight}`}
          >
            {circles}
          </svg>
        )}
      </Box>
    )
  }

  return (
    <Box className={styles.splashContainer}>
      {typeof window === 'undefined' ? null : (
        <svg
          style={{ backgroundColor: 'transparent', minHeight: '100%', width: '100%' }}
          viewBox={`0 0 ${window?.innerWidth} ${window?.innerHeight}`}
        >
          {circles}
        </svg>
      )}
    </Box>
  )
}
