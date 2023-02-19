import { responsiveStyle, vars } from '@kalidao/reality'
import { style } from '@vanilla-extract/css'

export const layout = style({
  minHeight: '100vh',
  width: '100vw',
  display: 'flex',
  flexDirection: 'row',
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
      width: '100vw',
    },
    lg: {
      width: '60vw',
    },
  }),
])

export const container = style([
  style({
    minHeight: '100vh',
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

export const link = style({
  lineHeight: vars.lineHeights.normal,
  color: vars.colors.text,
  textDecoration: 'none',
  fontStyle: 'italic',

  ':hover': {
    color: vars.colors.accent,
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
      width: vars.space.viewWidth,
      height: vars.space[15],
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'justify-between',
      paddingTop: vars.space[2],
      paddingBottom: vars.space[2],

      backgroundColor: vars.colors.backgroundSecondary,
    },
    lg: {
      // left bar on large screens
      // twitter-like dashboard sidebar
      position: 'sticky',
      display: 'flex',
      top: 0,
      bottom: 0,
      left: 0,
      width: '30vw',
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
    position: 'sticky',
    top: 0,
    bottom: 0,
    right: 0,
    width: '30vw',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingRight: vars.space[5],
    paddingTop: vars.space[5],
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
    ':hover': {
      backgroundColor: vars.colors.backgroundSecondary,
      borderColor: vars.colors.backgroundTertiary,
      borderWidth: '1px',
      borderStyle: 'solid',
      transform: 'scale(1.05)',
      transition: 'all 0.1 linear ',
    },
  }),
  responsiveStyle({
    xs: {
      all: 'unset',

      gap: vars.space[3],
      color: vars.colors.text,
      borderRadius: vars.radii.full,
      padding: vars.space[2],
    },
    lg: {
      all: 'unset',
      display: 'flex',

      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      gap: vars.space[3],
      color: vars.colors.text,

      borderRadius: vars.radii['4xLarge'],
      paddingTop: vars.space[4],
      paddingBottom: vars.space[4],
      paddingLeft: vars.space[3],
      paddingRight: vars.space[3],
    },
  }),
])

export const navCTA = style([
  nav,
  style({
    backgroundColor: vars.colors.accent,
    color: vars.colors.background,
    ':hover': {
      backgroundColor: vars.colors.accentSecondary,
      borderColor: vars.colors.accentSecondary,
      borderWidth: '1px',
      borderStyle: 'solid',
      transform: 'scale(1.05)',
      transition: 'all 0.1 linear ',
    },
  }),
])

export const navSVG = style([
  style({
    width: vars.space[5],
    height: vars.space[5],
    fill: vars.colors.textPrimary,
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
