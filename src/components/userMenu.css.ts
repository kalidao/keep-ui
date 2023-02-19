import { responsiveStyle, vars } from '@kalidao/reality'
import { style } from '@vanilla-extract/css'

export const userMenu = style([
  style({}),
  responsiveStyle({
    // small circle on mobile
    xs: {
      width: vars.space['9'],
      height: vars.space['9'],
      borderRadius: vars.radii.full,
      backgroundColor: vars.colors.backgroundSecondary,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    lg: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: vars.space.fit,
      height: vars.space.fit,

      backgroundColor: vars.colors.backgroundSecondary,
      borderRadius: vars.radii['4xLarge'],
      padding: vars.space[3],
      cursor: 'pointer',
      transition: 'background-color 0.2s ease-in-out',
      ':hover': {
        backgroundColor: vars.colors.backgroundTertiary,
      },
    },
  }),
])
