import { vars } from '@kalidao/reality'
import { style } from '@vanilla-extract/css'

export const cardRoot = style({
  padding: vars.space[6],
  borderBottomWidth: vars.borderWidths['0.5'],
  borderColor: vars.colors.foregroundSecondary,
  overflow: 'hidden',
  ':hover': {
    transform: 'translate3D(0,-1px,0) scale(1.01)',
  
    transition: 'all 0.2s ease-in',
  },

  ':active': {
    backgroundColor: vars.colors.backgroundSecondary,
    borderColor: vars.colors.foregroundSecondary,
    transition: 'all 0.2s ease-in',
  },
})
