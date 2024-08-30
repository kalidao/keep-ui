'use client'

import React, { useEffect, useState } from 'react'

const c = 10

export const Splash = ({ type }: { type?: string }) => {
  const [n, setN] = useState(1)
  const [hue, setHue] = useState<number>()

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
    strokeColor = `hsl(${hue}, 100%, 70%)`
    fillColor = `hsl(${hue}, 100%, ${99 - (i / n) * 100}%)`

    circles.push(<circle stroke={strokeColor} fill={fillColor} r={10} cx={getXY(i).x} cy={getXY(i).y} key={i} />)
  }

  if (type == 'loading') {
    return (
      <div className="min-h-[90vh] w-1/2 bg-transparent flex flex-col items-center justify-center md:hidden md:w-0">
        {typeof window === 'undefined' ? null : (
          <svg
            className="bg-transparent min-h-[90vh] w-full"
            viewBox={`0 0 ${window?.innerWidth} ${window?.innerHeight}`}
          >
            {circles}
          </svg>
        )}
      </div>
    )
  }

  return (
    <div className="min-h-screen w-[32.5vw] bg-transparent absolute z-[9999] inset-0 md:hidden md:w-0">
      {typeof window === 'undefined' ? null : (
        <svg
          className="bg-transparent min-h-screen w-full dark:stroke-[hsl(${hue},100%,10%)] stroke-[hsl(${hue},100%,70%)]"
          viewBox={`0 0 ${window?.innerWidth} ${window?.innerHeight}`}
        >
          {circles}
        </svg>
      )}
    </div>
  )
}
