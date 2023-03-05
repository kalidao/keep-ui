import { responsiveStyle, vars } from '@kalidao/reality'
import { style } from '@vanilla-extract/css'

export const proposeButton = style([
  style({
    all: 'unset',
    backgroundColor: vars.colors.accentSecondary,
    color: vars.colors.foreground,
    borderColor: vars.colors.accentSecondary,
    borderWidth: vars.borderWidths['0.5'],
    borderStyle: vars.borderStyles.solid,

    ':hover': {
      backgroundColor: vars.colors.accentSecondary,

      transform: 'scale(1.05)',
      transition: 'all 0.1 linear',
    },
    ':focus': {
      backgroundColor: vars.colors.accentSecondary,
      borderColor: vars.colors.accentSecondaryHover,
      transform: 'scale(1.05)',
      transition: 'all 0.1 linear',
    },
    ':active': {
      backgroundColor: vars.colors.accentSecondary,

      transform: 'scale(1.05)',
      transition: 'all 0.1 linear',
    },
  }),
  responsiveStyle({
    xs: {
      borderRadius: vars.radii.full,
      padding: vars.space[2],
    },
    lg: {
      display: 'flex',

      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      gap: vars.space[3],

      borderRadius: vars.radii['4xLarge'],
      paddingTop: vars.space[4],
      paddingBottom: vars.space[4],
      paddingLeft: vars.space[3],
      paddingRight: vars.space[3],
    },
  }),
])
