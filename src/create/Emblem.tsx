import { useCreateStore } from './useCreateStore'
import { Box } from '@kalidao/reality'
export const Emblem = () => {
  const state = useCreateStore((state) => state)

  const oppColor = (color: string) => {
    const hex = color.replace('#', '')
    const r = parseInt(hex.substring(0, 2), 16)
    const g = parseInt(hex.substring(2, 4), 16)
    const b = parseInt(hex.substring(4, 6), 16)
    const o = Math.round(((parseInt(hex.substring(6, 8), 16) || 255) / 255) * 100) / 100
    const brightness = Math.round((r * 299 + g * 587 + b * 114) / 1000)
    return brightness > 125 ? '#000000' : '#ffffff'
  }

  return (
    <Box padding={'10'}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 400 500"
        width="400"
        height="500"
      >
        <defs>
          <style>@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500');</style>

          <pattern id="net-pattern" width="10" height="10" patternUnits="userSpaceOnUse">
            {/* diamonds polygon net pattern */}
            {/* add white bg recentage */}
            <rect width="10" height="10" fill={state.bgColor} />
            <polygon points="0,5 5,0 10,5 5,10" fill={state.accentColor} opacity={'0.1'} />
          </pattern>
        </defs>
        {/* add shadow to rect */}
        <filter id="blur">
          <feGaussianBlur stdDeviation="10" />
        </filter>
        <rect width="400" height="500" fill={state.bgColor} rx="20" />
        <rect width="400" height="500" fill={state.bgColor} rx="20" opacity={'0.1'} filter="url(#blur)" />
        {/* enclose the image id=avatar in a stylised box */}
        <g id="avatar">
          <rect x="20" y="300" width="360" height="180" fill={state.accentColor} rx="20" />
          <rect x="20" y="40" width="360" height="300" fill={state.accentColor} />
          {/* define a circular clip path for avatar  */}
          <clipPath id="avatarClip">
            <circle cx="90" cy="100" r="50" />
          </clipPath>
          <image
            x="40"
            y="50"
            width="100"
            height="100"
            xlinkHref={state.avatar}
            preserveAspectRatio="xMidYMid slice"
            id="avatar"
            rx="20"
            clipPath="url(#avatarClip)"
          />
        </g>

        <text
          x="20"
          y="30"
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '20px',
            fontWeight: 'bold',
            fill: state.textColor,
          }}
        >
          {state.name}
        </text>
        <text
          x="270"
          y="30"
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '20px',
            fontWeight: 'bold',
            fill: state.textColor,
          }}
        >
          SIGNER 🗝
        </text>
        {/* add a black graph net pattern as background for quorum   */}

        <rect x="20" y="380" width="360" height="30" fill="url(#net-pattern)" />
        <text
          id="quorum_label"
          x="40"
          y="400"
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '20px',
            fontWeight: 'bold',
            fill: state.textColor,
          }}
        >
          QUORUM
        </text>
        <text
          id="quorum"
          x="280"
          y="400"
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '20px',
            fontWeight: 'bold',
            fill: state.textColor,
          }}
        >
          {state.threshold} of {state.signers.length}
        </text>
        {/*  */}

        <text
          x="70"
          y="450"
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '20px',
            fontWeight: 'bold',
            // fill color should be the opposite of the accent color
            fill: oppColor(state.accentColor),
          }}
        >
          You're all caught up.
        </text>
      </svg>
    </Box>
  )
}
