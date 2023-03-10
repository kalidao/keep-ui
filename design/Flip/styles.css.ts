import { vars } from '@kalidao/reality'
import { style } from '@vanilla-extract/css'

export const root = style([
  style({
    color: vars.colors.textTertiary,

    ':hover': {
      scale: 1.05,
    },

    ':focus': {
      scale: 1.05,
      color: vars.colors.text,
    },

    ':active': {
      transition: 'all 0.2s ease-in-out',
      scale: 0.95,
      color: vars.colors.text,
    },
  }),
])
