import { vars } from '@kalidao/reality'
import { style } from '@vanilla-extract/css'

export const toolboxRoot = style([
  style({
    display: 'flex',
  }),
])

export const menuItem = style({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  gap: vars.space[4],
  width: '100%',
  height: '100%',
  padding: vars.space[6],
  borderRadius: vars.radii['2xLarge'],

  boxShadow: vars.shadows[0.5],
  cursor: 'pointer',
  transition: 'all 0.2s ease-in-out',
  backgroundColor: vars.colors.backgroundTertiary,

  ':hover': {
    backgroundColor: vars.colors.background,
  },
})

export const menuIcon = style({
  width: vars.space[8],
  height: vars.space[8],

  color: vars.colors.text,

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.2s ease-in-out',

  ':hover': {
    backgroundColor: vars.colors.backgroundTertiary,
  },
})
