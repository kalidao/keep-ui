import { vars } from '@kalidao/reality'
import { style } from '@vanilla-extract/css'

export const communityGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gridGap: '1rem',
  width: vars.space.full,
  padding: vars.space[3],
})
