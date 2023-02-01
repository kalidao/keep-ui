import { style } from '@vanilla-extract/css'

export const communityGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
  gridGap: '1rem',
  width: '34vw',
  paddingTop: '1rem',
})
