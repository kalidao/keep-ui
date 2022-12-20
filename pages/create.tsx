import React, { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import { Stack, Button, Box, IconGrid } from '@kalidao/reality'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import Head from 'next/head'
import Footer from '~/layout/Footer'
import { layout, header, container, splashContainer, dashboardHeader } from '~/layout/layout.css'
import Link from 'next/link'
import Create from '~/create'
import Image from 'next/image'

const c = 8

const Home: NextPage = () => {
  const [n, setN] = useState(1000)
  const [hue, setHue] = useState<number>()
  const toDegrees = (angle: number) => {
    return angle * (180 / Math.PI)
  }

  useEffect(() => {
    // set the color to a random value between 0 and 255
    setHue(Math.floor(Math.random() * 255))
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setN(n + 1)
    }, 1)

    return () => clearInterval(interval)
  })

  const getXY = (n: number) => {
    if (typeof window == 'undefined') return { x: 0, y: 0 }
    const angle = n * 137.5
    const r = c * Math.sqrt(n)

    const x = r * Math.cos(toDegrees(angle)) + window.innerWidth / 2
    const y = r * Math.sin(toDegrees(angle)) + window.innerHeight / 2

    return { x: x, y: y }
  }

  let circles = []
  for (let i = 0; i < n; ++i) {
    if (!hue) return null
    // use hue to create colors with different saturation and lightness for phyllotaxis pattern animation
    const strokeColor = `hsl(${hue}, 100%, 50%)`
    // fill color becomes darker as the circles get closer to the center
    const fillColor = `hsl(${hue}, 100%, ${100 - (i / n) * 100}%)`

    circles.push(<circle stroke={strokeColor} fill={fillColor} r={7} cx={getXY(i).x} cy={getXY(i).y} key={i} />)
  }

  return (
    <Box className={layout} backgroundColor="black" position={'relative'}>
      <Head>
        <title>Keep - Home</title>
        <meta name="description" content={'This is the homepage of Keep.'} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box className={header}>
        <Stack direction={'horizontal'}>
          <Link href="/explore">
            <Button shape="circle" size="small" variant="secondary" as="a">
              <IconGrid />
            </Button>
          </Link>
          <ConnectButton />
        </Stack>
      </Box>
      <Box>
        <Box className={splashContainer}>
          {typeof window === 'undefined' ? null : (
            <svg
              style={{ backgroundColor: 'black' }}
              preserveAspectRatio="xMinYMin meet"
              viewBox={`10 10 ${window?.innerWidth} ${window?.innerHeight}`}
            >
              {circles}
            </svg>
          )}
        </Box>
        <Create />
      </Box>
      <Footer />
    </Box>
  )
}

export default Home
