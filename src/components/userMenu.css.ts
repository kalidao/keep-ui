import { vars } from '@kalidao/reality'
import { style } from '@vanilla-extract/css'

export const userMenu = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  backgroundColor: vars.colors.backgroundSecondary,
  borderRadius: vars.radii['4xLarge'],
  padding: vars.space[3],
  cursor: 'pointer',
  transition: 'background-color 0.2s ease-in-out',
  ':hover': {
    backgroundColor: vars.colors.backgroundTertiary,
  },
})
