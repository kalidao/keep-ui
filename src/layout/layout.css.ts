import { style } from '@vanilla-extract/css'
import { vars } from '@kalidao/reality'

export const layout = style({
  minHeight: '100vh',
  paddingRight: vars.space['5'],
  paddingLeft: vars.space['5'],
})

export const header = style({
  height: '10vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  zIndex: 10,
  position: 'relative',
  paddingRight: vars.space['5'],
  paddingLeft: vars.space['5'],
})

export const dashboardHeader = style({
  minHeight: '10vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingRight: vars.space['5'],
  paddingLeft: vars.space['5'],
})

export const container = style({
  minHeight: '90vh',
  position: 'relative',
  paddingRight: vars.space['5'],
  paddingLeft: vars.space['5'],
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
