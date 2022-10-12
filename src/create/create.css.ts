import { vars } from '@kalidao/reality'
import { style } from '@vanilla-extract/css'

export const container = style({
  background: vars.colors.backgroundSecondary,
  padding: vars.space[10],
  borderRadius: vars.radii.large,
  minWidth: vars.space[96],
  minHeight: vars.space[96],

  // position in center
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',

  // flex
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  gap: vars.space['2.5'],
})
