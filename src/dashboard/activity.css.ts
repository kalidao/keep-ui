import { vars } from '@kalidao/reality'
import { style } from '@vanilla-extract/css'

export const cardRoot = style({
  padding: vars.space[6],
  borderBottomWidth: vars.borderWidths['0.5'],
  borderColor: vars.colors.foregroundSecondary,

  ':hover': {
    transform: 'translateY(5px)',
    borderColor: vars.colors.foregroundSecondaryHover,
    transition: 'all 0.1s ease-in',
  },

  ':active': {
    transform: 'translateY(0px)',
    backgroundColor: vars.colors.backgroundSecondary,
    borderColor: vars.colors.foregroundSecondary,
    transition: 'all 0.1s ease-in',
  },
})
