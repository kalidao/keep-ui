import { vars } from '@kalidao/reality'
import { style } from '@vanilla-extract/css'

export const container = style({
  background: vars.colors.background,
  padding: vars.space[20],
  borderRadius: vars.radii.large,
  minHeight: '90vh',
  minWidth: '50vw',

  // // position in center
  position: 'absolute',
  top: '0',
  right: '0',
  zIndex: '1',
  // transform: 'translate(-50%, -50%)',

  // flex
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'stretch',
  gap: vars.space['2.5'],
})

export const typeContainer = style({
  background: vars.colors.background,
  padding: vars.space[20],
  borderRadius: vars.radii.large,
  minHeight: '90vh',
  minWidth: '50vw',

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
  alignItems: 'stretch',
  gap: vars.space['2.5'],
})

export const splashContainer = style({
  minHeight: '100vh',
  position: 'absolute',
  zIndex: '9999',
  top: 0,
  bottom: 0,
  left: 0,
  right: '50%',
})
