import { vars } from '@kalidao/reality'
import { style } from '@vanilla-extract/css'

export const container = style({
  background: vars.colors.background,
  padding: vars.space[20],
  borderRadius: vars.radii.large,
  height: '100%',
  width: '50%',

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
  gap: vars.space['2.5'],
})
