import { style } from '@vanilla-extract/css'
import { vars } from '@kalidao/reality'

export const socialIcon = style({
  padding: vars.space[2],
  borderRadius: vars.radii.full,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',

  ':hover': {
    border: `1px solid ${vars.colors.foreground}`,
  },
})

export const signers = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space[3],

  // add scroll if overflow
  overflowY: 'scroll',
  scrollbarColor: vars.colors.accent,
  scrollbarWidth: vars.space[1],
})
