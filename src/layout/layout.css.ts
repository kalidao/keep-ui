import { responsiveStyle, vars } from '@kalidao/reality'
import { style } from '@vanilla-extract/css'

export const layout = style({
  minHeight: '100vh',
  width: 'calc(100vw - 16px)',
  display: 'flex',
  flexDirection: 'row',
  marginLeft: 'auto',
  marginRight: 'auto',
})

export const header = style({
  height: '10vh',
  width: vars.space.full,

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',

  zIndex: 10,
})

export const dashboardHeader = style({
  minHeight: '10vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingRight: vars.space['5'],
  paddingLeft: vars.space['5'],
})

export const dashboardContainer = style([
  responsiveStyle({
    xs: {
      width: '100%',
    },
    lg: {
      width: '60%',
    },
  }),
])

export const container = style([
  style({
    minHeight: '100vh',
  }),
  responsiveStyle({
    xs: {
      width: '100%',
      paddingBottom: vars.space[15],
    },
    lg: {
      width: '60%',
    },
  }),
])

export const splashContainer = style({
  minHeight: '100vh',
  position: 'absolute',
  zIndex: '9999',
  top: 0,
  bottom: 0,
  left: 0,
  right: '50%',
})

export const text = style({
  fontSize: vars.fontSizes.small,
  lineHeight: vars.lineHeights.normal,
  color: vars.colors.text,
})

export const iconLink = style({
  height: vars.space[4],
  width: vars.space[4],
  color: vars.colors.textTertiary,
  fill: vars.colors.textTertiary,

  ':hover': {
    color: vars.colors.text,
  },
})
export const link = style({
  lineHeight: vars.lineHeights.normal,
  fontSize: vars.fontSizes.label,
  color: vars.colors.textSecondary,
  textDecoration: 'none',

  ':hover': {
    scale: '1.05',
    transition: 'all 0.1 linear',
  },

  ':active': {
    scale: '1.05',
    transition: 'all 0.1 linear',
  },
})

export const leftbar = style([
  style({}),
  responsiveStyle({
    xs: {
      // bottom bar on mobile
      position: 'fixed',
      top: 'auto',
      bottom: 0,
      left: 0,
      right: 0,
      width: vars.space.full,
      height: vars.space[15],
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'stretch',
      justifyContent: 'stretch',
      paddingTop: vars.space[2],
      paddingBottom: vars.space[2],
      paddingLeft: vars.space[3],
      paddingRight: vars.space[3],
      backgroundColor: vars.colors.backgroundSecondary,
      borderTop: `1px solid ${vars.colors.foregroundSecondary}`,
      zIndex: 10,
    },
    lg: {
      // left bar on large screens
      // twitter-like dashboard sidebar
      position: 'sticky',
      display: 'flex',
      top: 0,
      bottom: 0,
      left: 0,
      width: '20%',
      minWidth: '200px',
      maxWidth: '300px',
      height: '100vh',

      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: vars.space[10],
      padding: vars.space[10],
      backgroundColor: vars.colors.background,
      borderRight: `1px solid ${vars.colors.foregroundSecondary}`,
      zIndex: 10,
    },
  }),
])

export const rightbar = style([
  style({
    // twitter-like dashboard sidebar
    // position: 'sticky',
    position: 'fixed',
    top: 0,
    bottom: 0,
    right: 0,
    width: '20%',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',

    padding: vars.space[5],
    backgroundColor: vars.colors.background,
    borderLeft: `1px solid ${vars.colors.foregroundSecondary}`,
    zIndex: 10,
  }),
  responsiveStyle({
    xs: {
      display: 'none',
    },
    lg: {
      display: 'flex',
    },
  }),
])

export const nav = style([
  style({
    width: vars.space.fit,

    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    color: vars.colors.text,
    backgroundColor: vars.colors.background,
    

    ':hover': {
      backgroundColor: vars.colors.backgroundSecondary,
      transform: 'scale(1.05)',
      transition: 'all 0.1 linear',
    },

    ':focus': {
      backgroundColor: vars.colors.backgroundSecondary,
      transform: 'scale(1.05)',
      transition: 'all 0.1 linear',
    },

    ':active': {
      backgroundColor: vars.colors.backgroundSecondary,
      transform: 'scale(1.05)',
      transition: 'all 0.1 linear',
    },
  }),
  responsiveStyle({
    xs: {
      all: 'unset',

      borderRadius: vars.radii.full,
      padding: vars.space[2],
    },
    lg: {
      all: 'unset',
      display: 'flex',
      cursor: 'pointer',

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

export const navCTA = style([
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

export const navSVG = style([
  style({
    width: vars.space[5],
    height: vars.space[5],
    fill: vars.colors.text,

    ':hover': {
      scale: '1.05',
      transition: 'all 0.1 linear',
    },
  }),
])

export const navText = style([
  style({
    color: vars.colors.text,
  }),
  responsiveStyle({
    xs: {
      display: 'none',
    },
    lg: {
      display: 'block',
    },
  }),
])
