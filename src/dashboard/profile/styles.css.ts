import { responsiveStyle, vars } from '@kalidao/reality'
import { style } from '@vanilla-extract/css'

export const profileContainer = style([
  style({
    // display="flex"  width="full" flexDirection={'column'} alignItems="center" justifyContent={'center'}
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  }),
  responsiveStyle({
    xs: {
      width: '100vw',
    },
    lg: {
      width: '60vw',
    },
  }),
])

export const labelledLink = style({
  all: 'unset',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: vars.space[1],
  color: vars.colors.textSecondary,
  padding: vars.space[1],
  paddingLeft: vars.space[2],
  paddingRight: vars.space[2],
  borderRadius: vars.radii.full,
  cursor: 'pointer',
  transition: 'all 0.1s ease-in-out',

  ':hover': {
    transform: 'scale(1.05)',
  },
})

export const infoBar = style([
  style({
    width: vars.space.full,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  }),
  style({
    backgroundColor: vars.colors.backgroundSecondary,
    padding: vars.space[3],
  }),
])

export const socialIcon = style({
  height: vars.space[4],
  width: vars.space[4],
  color: vars.colors.textTertiary,
  fill: vars.colors.textTertiary,
  border: 'none',

  ':hover': {
    color: vars.colors.text,
  },
})
