import { vars, responsiveStyle } from '@kalidao/reality'
import { style } from '@vanilla-extract/css'

export const container = style({
  minHeight: '90vh',
  minWidth: '100vw',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: vars.colors.background,
})

export const typeContainer = style({})

export const typeShell = style([
  style({
    width: '67.5vw',
    // position the type container to the right of the splash container
    right: 0,
    top: 0,
    bottom: 0,

    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'center',
    gap: vars.space['10'],
    backgroundColor: vars.colors.background,
  }),
  responsiveStyle({
    xs: {
      width: '100vw',
      position: 'relative',
      right: 'auto',
      left: 'auto',
      top: 'auto',
      bottom: 'auto',
    },
    sm: {
      width: '100vw',
      position: 'relative',
      right: 'auto',
      left: 'auto',
      top: 'auto',
      bottom: 'auto',
    },
    md: {
      width: '100vw',
      position: 'relative',
      right: 'auto',
      left: 'auto',
      top: 'auto',
      bottom: 'auto',
    },
    lg: {
      width: '67.5vw',
      position: 'absolute',
      right: 0,
      top: 0,
      bottom: 0,
    },
    xl: {
      width: '67.5vw',
      position: 'absolute',
      right: 0,
      top: 0,
      bottom: 0,
    },
  }),
])

export const splashContainer = style({
  minHeight: '100vh',
  width: '32.5vw',
  background: 'transparent',

  position: 'absolute',
  zIndex: '9999',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,

  '@media': {
    // media query for mobile css
    '(max-width: 768px)': {
      display: 'none',
      width: '0',
    },
  },
})

export const splashLoading = style({
  minHeight: '90vh',
  width: '50vw',
  background: 'transparent',

  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',

  '@media': {
    // media query for mobile css
    '(max-width: 768px)': {
      display: 'none',
      width: '0',
    },
  },
})

export const shell = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-start',
  gap: vars.space['3'],
  width: '100vw',
  height: '100%',
  backgroundColor: vars.colors.background,
})

export const form = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  gap: vars.space['3'],
  minWidth: '50vw',
  height: '100%',
})

export const preview = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: vars.space['3'],
  width: '100%',
  height: '100%',
})

export const successGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',

  gap: vars.space['5'],
  width: '100%',
  height: '100%',
  marginTop: vars.space['5'],
  marginBottom: vars.space['5'],
})

export const successMessage = style({
  all: 'unset',

  ':hover': {
    cursor: 'pointer',
    // transform the card up and to the right a bit when it's hovered
    transform: 'translate(4px, -4px)',
  },
})
