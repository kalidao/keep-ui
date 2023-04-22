import { vars, responsiveStyle } from '@kalidao/reality'
import { style } from '@vanilla-extract/css'

export const communityGrid = style([style({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  padding: vars.space[3],
  gap: vars.space[2]
}),
responsiveStyle({
  sm: {
    width: '100vw',
  },
  md: {
    width: '63vw'
  },
})])
