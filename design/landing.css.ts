import { keyframes, style } from '@vanilla-extract/css'
import { vars } from '@kalidao/reality'
import { serif } from './app.css'

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

export const subheading = style({
  fontFamily: serif,
  fontWeight: 600,
  fontSize: '32px',
  color: vars.colors.text,
})

export const features = style({
  padding: vars.space['10'],
})

export const feature = style({
  minHeight: '80vh',
  display: 'flex',
  flexDirection: 'row',
  gap: vars.space['10'],
  alignItems: 'flex-start',
  justifyContent: 'center',
  textAlign: 'start',
})

export const featureReverse = style({
  minHeight: '80vh',
  display: 'flex',
  flexDirection: 'row-reverse',
  gap: vars.space['10'],
  alignItems: 'flex-start',
  justifyContent: 'center',
  textAlign: 'start',
})

export const featureTitle = style({
  fontFamily: serif,
  fontWeight: 600,
  fontSize: '48px',
  textDecoration: 'underline',
  color: vars.colors.text,
})

export const featureDescription = style({
  fontFamily: vars.fonts.sans,
  fontWeight: 400,
  fontSize: '20px',
  color: vars.colors.text,
})

export const featureStyled = style({
  fontFamily: serif,
  fontWeight: 400,
  fontSize: '80px',
  fontStyle: 'italic',
  color: vars.colors.text,
})

export const featureImage = style({
  maxWidth: '100%',
  height: 'auto',
  objectFit: 'cover',
  aspectRatio: '20/10',
  borderRadius: vars.radii['2xLarge'],
  boxShadow: `${vars.colors.foregroundTertiary} 0px 54px 55px, ${vars.colors.foregroundSecondary} 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, ${vars.colors.foregroundSecondaryHover} 0px 12px 13px, ${vars.colors.foregroundSecondary} 0px -3px 5px`,
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
  fontFamily: serif,
  fontWeight: 600,
  fontSize: '180px',
  color: vars.colors.textPrimary,
  minHeight: '200px',
  minWidth: '200px',
})

export const heroBorder = keyframes({
  '0%': {
    borderLeft: `1px solid ${vars.colors.foreground}`,
    borderBottom: `1px solid ${vars.colors.foreground}`,
  },
  '50%': {
    borderLeft: `1px solid ${vars.colors.foreground}`,
    borderBottom: `1px solid ${vars.colors.foreground}`,
  },
  '100%': {
    borderLeft: `1px solid ${vars.colors.background}`,
    borderBottom: `1px solid ${vars.colors.background}`,
  },
})

export const hero = style({
  position: 'absolute',
  top: '10%',
  left: '10%',
  right: '10%',
  margin: '-50px 0 0 -50px',
  display: 'flex',
  flexDirection: 'row',
  gap: vars.space['10'],

  paddingLeft: vars.space['5'],
  paddingBottom: vars.space['5'],
  borderRadius: vars.radii['2xLarge'],
})

export const lineAnimation = keyframes({
  '0%': {
    transform: 'translateX(-100%)',
  },
  '100%': {
    transform: 'translateX(100%)',
  },
})
export const line = style({
  width: vars.space['1'],
  backgroundColor: vars.colors.textPrimary,
  height: '100vh',

  position: 'absolute',
  // position on the center of the screen
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',

  // line animates into existence from the top to the bottom
  animation: `${lineAnimation} 10s ease-in-out infinite`,
})
