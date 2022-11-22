import { keyframes, style } from '@vanilla-extract/css'
import { vars } from '@kalidao/reality'

export const subheading = style({
  fontSize: '32px',
  color: vars.colors.textSecondary,
})

const breathe = keyframes({
  '0%': {
    fontVariationSettings: "'wght' 100, 'slnt' 10",
    fontSize: '180pxvw',
  },
  '25%': {
    fontVariationSettings: "'wght' 200, 'slnt' 100",
    fontSize: '200px',
  },
  '50%': {
    fontVariationSettings: "'wght' 300, 'slnt' 100",
    fontSize: '200px',
  },
  '75%': {
    fontVariationSettings: "'wght' 400, 'slnt' 100",
    fontSize: '200px',
  },
  '100%': {
    fontVariationSettings: "'wght' 500, 'slnt' 200",
    fontSize: '180px',
  },
})

export const preview = style({
  height: '40vh',
  borderRadius: vars.radii['2xLarge'],
  width: '100%',
  zIndex: 100,
  position: 'relative',
  display: 'inline-block',
  overflow: 'hidden',
  background: vars.colors.backgroundSecondary,
  backgroundImage: `linear-gradient(to bottom right, ${vars.colors.background}, ${vars.colors.backgroundSecondary}, ${vars.colors.backgroundTertiary}, ${vars.colors.backgroundSecondary})`,

  ':after': {
    position: 'absolute',
    top: '0',
    right: '0',
    bottom: '0',
    left: '0',
    transform: 'translateX(-100%)',
  },
})

export const heading = style({
  all: 'unset',
  fontFamily: vars.fonts.sans,
  fontWeight: 100,
  fontSize: '180px',
  color: vars.colors.textPrimary,
  minHeight: '200px',
  minWidth: '200px',

  ':hover': {
    animation: `${breathe} 1s infinite alternate`,
  },

  // '@media': {
  //   '(prefers-reduced-motion)': {
  //     transitionProperty: 'font-weight'
  //   },
  // }
})

export const hero = style({
  position: 'absolute',
  top: '10%',
  left: '10%',
  right: '10%',
  margin: '-50px 0 0 -50px',
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space['2'],
})
