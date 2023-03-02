import { NextRequest } from 'next/server'

import { ImageResponse } from '@vercel/og'

export const config = {
  runtime: 'edge',
}

const normalBodoni = fetch(new URL('../../assets/BodoniModa_48pt-Regular.ttf', import.meta.url)).then((res) =>
  res.arrayBuffer(),
)

const italicBodoni = fetch(new URL('../../assets/BodoniModa_48pt-SemiBoldItalic.ttf', import.meta.url)).then((res) =>
  res.arrayBuffer(),
)

export default async function handler(req: NextRequest) {
  const { searchParams } = new URL(req.url)

  // ?title=<title>
  const hasTitle = searchParams.has('title')
  const title = hasTitle ? searchParams.get('title')?.slice(0, 100) : 'Keep'

  // ?hue
  const hasHue = searchParams.has('hue')
  const hue = hasHue ? searchParams.get('hue') : Math.floor(Math.random() * 255)

  const fontData = await normalBodoni
  const italicFontData = await italicBodoni

  const n = 500
  const c = 10
  const width = 600
  const height = 600

  const toDegrees = (angle: number) => {
    return angle * (90 / Math.PI)
  }

  const getXY = (n: number) => {
    const angle = n * 137.5
    const r = c * Math.sqrt(n)

    const x = r * Math.cos(toDegrees(angle)) + width / 2
    const y = r * Math.sin(toDegrees(angle)) + height / 2

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

  return new ImageResponse(
    (
      <div
        style={{
          background: '#000',
          width: '100%',
          height: '100%',
          display: 'flex',
          textAlign: 'center',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 100px',
        }}
      >
        <svg
          style={{ backgroundColor: 'transparent', minHeight: height, width: width }}
          viewBox={`0 0 ${width} ${height}`}
        >
          {circles}
        </svg>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <h1
            style={{
              fontSize: '64px',
              color: '#fff',
              fontFamily: 'Bodoni Moda',
              fontWeight: 400,
              fontStyle: 'italic',
            }}
          >
            {title}
          </h1>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 600,
      emoji: 'blobmoji',
      fonts: [
        {
          name: 'Bodoni Moda',
          data: fontData,
          style: 'normal',
        },
        {
          name: 'Bodoni Moda',
          data: italicFontData,
          style: 'italic',
        },
      ],
    },
  )
}
