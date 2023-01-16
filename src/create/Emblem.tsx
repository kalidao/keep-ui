import { useCreateStore } from './useCreateStore'
import { Box } from '@kalidao/reality'

export const Emblem = () => {
  const state = useCreateStore((state) => state)

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
          <style>
            @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap'); @import
            url('https://fonts.googleapis.com/css2?family=Silkscreen&display=swap');
          </style>
          <rect width="800%" height="800%" transform="translate(-120,-480)" fill="url(%23a)" />
          <pattern
            id="dot-grid-pattern"
            patternUnits="userSpaceOnUse"
            width="20"
            height="20"
            patternTransform="scale(1) rotate(0)"
          >
            <rect x="0" y="0" width="100%" height="100%" fill="hsla(0, 0%, 100%, 1)" />
            <path
              d="M 10,-2.55e-7 V 20 Z M -1.1677362e-8,10 H 20 Z"
              stroke-width="0.5"
              stroke={state.bgColor}
              fill="none"
            />
          </pattern>
          <rect width="800%" height="800%" transform="translate(-40,0)" fill="url(%23a)" />
        </defs>
        {/* add shadow to rect */}
        <filter id="blur">
          <feGaussianBlur stdDeviation="10" />
        </filter>
        <rect width="400" height="500" fill={state.borderColor} rx="20" />
        {/* enclose the image id=avatar in a stylised box */}
        <g id="avatar">
          <rect x="20" y="300" width="360" height="180" fill={state.bgColor} rx="20" />
          <rect x="20" y="40" width="360" height="300" fill={state.bgColor} />
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
            fill: state.borderTextColor,
          }}
        >
          {state.name}
        </text>
        <text
          x="270"
          y="30"
          style={{
            fontFamily: "'Silkscreen', cursive",
            fontSize: '20px',
            fontWeight: 'bold',
            fill: state.borderTextColor,
          }}
        >
          SIGNER 🗝
        </text>

        <text
          id="quorum_label"
          x="220"
          y="80"
          style={{
            fontFamily: "'Silkscreen', cursive",
            fontSize: '20px',
            fontWeight: 'bold',
            fill: state.innerTextColor,
          }}
        >
          Required
        </text>

        <text
          id="quorum"
          x="220"
          y="110"
          style={{
            fontFamily: "'Silkscreen', cursive",
            fontSize: '20px',
            fontWeight: 'bold',
            fill: state.innerTextColor,
          }}
        >
          {state.threshold} of {state.signers.length}
        </text>

        <rect
          id="txs_notification_bg"
          x="30"
          y="165"
          width="340"
          height="260"
          fill="url(#dot-grid-pattern)"
          rx="15"
          opacity={'0.5'}
        />
        {/* add txs_notification title at the top of the background */}
        <text
          x="40"
          y="190"
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '20px',
            fontWeight: 'bold',
            fill: state.innerTextColor,
          }}
        >
          {/* write title copy for an example multisig tx like token transfer */}
          Pay Alice
        </text>
        {/* add nonce top-right  */}
        <text
          x="310"
          y="190"
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '20px',
            fontWeight: 'bold',
            fill: state.innerTextColor,
          }}
        >
          #13
        </text>
        {/* add a divider  */}
        <rect x="30" y="200" width="340" height="5" fill={state.bgColor} />
        {/* add txs_notification description in foreignObject 'p' below the title */}
        <foreignObject x="40" y="200" width="320" height="260">
          <p
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '13px',
              fontWeight: '400',
              color: state.innerTextColor,
              whiteSpace: 'pre-wrap',
              overflow: 'clip',
              textAlign: 'justify',
            }}
          >
            {/* write description copy for paying alice for dao contribution */}
            In order to pay Alice for her contribution to the DAO, you need to sign this transaction.
          </p>
        </foreignObject>
        <rect x="30" y="390" width="340" height="3" fill={state.bgColor} />
        {/* notifity how many signers have signed this tx */}
        <text
          id="signers_label"
          x="40"
          y="415"
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '20px',
            fontWeight: 'bold',
            fill: state.innerTextColor,
          }}
        >
          0 of {state.signers.length} signed
        </text>
        <text
          id="txs_notification_label"
          x="250"
          y="455"
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '20px',
            fontWeight: 'bold',
            // fill color should be the opposite of the accent color
            fill: state.innerTextColor,
          }}
        >
          1 Pending
          <animate
            attributeName="fill"
            values={state.innerTextColor + ';' + state.bgColor + ';' + state.innerTextColor}
            dur="0.8s"
            repeatCount="indefinite"
          />
        </text>
      </svg>
    </Box>
  )
}
