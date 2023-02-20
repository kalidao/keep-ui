import { vars } from '@kalidao/reality'
import { style } from '@vanilla-extract/css'

export const cardRoot = style({
  padding: vars.space[6],
  borderBottomWidth: vars.borderWidths['0.5'],
  borderColor: vars.colors.foregroundSecondary,
})
