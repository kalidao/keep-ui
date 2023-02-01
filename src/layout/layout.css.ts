import { style } from '@vanilla-extract/css'
import { vars } from '@kalidao/reality'

export const layout = style({
  minHeight: '100vh',
  width: '100vw',
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

export const dashboardContainer = style({
  minHeight: '90vh',
  width: '100vw',
  position: 'relative',
  paddingRight: vars.space['5'],
  paddingLeft: vars.space['5'],
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'stretch',
  gap: vars.space[10],
})

export const container = style({
  minHeight: '90vh',
  width: '100vw',
  position: 'relative',
  paddingRight: vars.space['5'],
  paddingLeft: vars.space['5'],
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: vars.space[10],
})

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

export const leftbar = style({
  // twitter-like dashboard sidebar
  position: 'fixed',
  top: 0,
  bottom: 0,
  left: 0,
  width: '33vw',
  minWidth: '200px',
  maxWidth: '300px',
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: vars.space[10],
  padding: vars.space[10],
  backgroundColor: vars.colors.background,
  borderRight: `1px solid ${vars.colors.foregroundSecondary}`,
  zIndex: 10,
})

export const rightbar = style({
  // twitter-like dashboard sidebar
  position: 'fixed',
  top: 0,
  bottom: 0,
  right: 0,
  width: '30vw',
  minWidth: '200px',
  maxWidth: '300px',
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: vars.space[10],
  padding: vars.space[10],
  backgroundColor: vars.colors.background,
  borderLeft: `1px solid ${vars.colors.foregroundSecondary}`,
  zIndex: 10,
})
