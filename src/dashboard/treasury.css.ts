import { vars } from '@kalidao/reality'
import { style } from '@vanilla-extract/css'

export const tokenLink = style({
  ':hover': {
    backgroundColor: vars.colors.backgroundTertiary,
  },
  ':visited': {
    backgroundColor: vars.colors.backgroundTertiary,
    textDecoration: 'none',
  },
  ':active': {
    backgroundColor: vars.colors.backgroundTertiary,
    textDecoration: 'none',
  },
})

export const tokenCard = style({
  width: vars.space.full,
  padding: vars.space[3],
  borderRadius: vars.radii['2xLarge'],
  backgroundColor: vars.colors.background,
  color: vars.colors.text,
})

export const tokenLinkCard = style([tokenLink, tokenCard])
