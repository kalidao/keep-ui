import { responsiveStyle, vars } from '@kalidao/reality'
import { style } from '@vanilla-extract/css'

export const empty = style([
  style({
    position: 'absolute',
    height: vars.space.full,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
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
