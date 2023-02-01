import { vars } from '@kalidao/reality'
import { style } from '@vanilla-extract/css'

export const link = style({
  all: 'unset',
  color: vars.colors.foregroundSecondary,

  ':hover': {
    cursor: 'pointer',
    color: vars.colors.accent,
  },
})
