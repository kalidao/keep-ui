import { vars } from '@kalidao/reality'
import { style } from '@vanilla-extract/css'

export const container = style({
  minHeight: '90vh',
  minWidth: '100vw',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: vars.colors.background,
})

export const typeContainer = style({})

export const typeShell = style({
  position: 'absolute',
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
})

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
