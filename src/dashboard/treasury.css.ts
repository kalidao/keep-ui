import { vars } from '@kalidao/reality'
import { style } from '@vanilla-extract/css'

export const tokenLinkCard = style({
  width: vars.space.full,

  padding: vars.space[3],
  borderRadius: vars.radii['2xLarge'],
  backgroundColor: vars.colors.background,
  color: vars.colors.text,
  textDecoration: 'none',
  transition: 'all 0.2s ease-in-out',
  ':hover': {
    backgroundColor: vars.colors.backgroundTertiary,
  },
})
