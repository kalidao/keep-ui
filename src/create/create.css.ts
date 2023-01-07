import { vars } from '@kalidao/reality'
import { style } from '@vanilla-extract/css'

export const container = style({
  background: vars.colors.background,
  padding: vars.space[20],
  borderRadius: vars.radii.large,
  minHeight: '90vh',
  width: '62.5vw',

  // // position in center
  position: 'absolute',
  top: '0',
  bottom: '0',
  right: '0',

  zIndex: '1',
  // transform: 'translate(-50%, -50%)',

  // flex
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  gap: vars.space['2.5'],

  '@media': {
    // media query for mobile css
    '(max-width: 768px)': {
      width: '100vw',
      position: 'relative',
      padding: vars.space[1],
    },
  },
})

export const typeContainer = style({
  background: vars.colors.background,
  padding: vars.space[20],
  borderRadius: vars.radii.large,
  minHeight: '90vh',
  minWidth: '62.5vw',

  // // position in center
  position: 'absolute',
  top: '0',
  right: '0',
  zIndex: '1',
  // transform: 'translate(-50%, -50%)',

  // flex
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: vars.space['2.5'],
})

export const typeShell = style({
  display: 'flex',
  flexDirection: 'column',

  gap: vars.space['3'],
  width: '42.1vw',
})

export const splashContainer = style({
  minHeight: '100vh',
  width: '32.5vw',
  background: vars.colors.accent,

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
