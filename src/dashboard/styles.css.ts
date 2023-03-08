import { responsiveStyle, vars } from '@kalidao/reality'
import { style } from '@vanilla-extract/css'

export const signers = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space[3],
})

export const tabRoot = style([
  responsiveStyle({
    xs: {
      width: '100vw',
    },
    lg: {
      width: '60vw',
    },
  }),
])

export const tabContent = style([
  style({
    position: 'relative',
    minHeight: '100vh',
  }),
])

export const tabList = style({
  display: 'flex',
  flexDirection: 'row',

  borderBottom: `1px solid ${vars.colors.foregroundSecondary}`,
})

export const tabTrigger = style({
  all: 'unset',
  padding: vars.space[3],
  cursor: 'pointer',
  transition: 'all 0.1s ease-in-out',
  fontWeight: vars.fontWeights.semiBold,
  color: vars.colors.textSecondary,

  selectors: {
    // hover
    '&:hover': {
      backgroundColor: vars.colors.foregroundSecondary,
    },
    '&:focus': {
      outline: 'none',
      backgroundColor: vars.colors.foregroundSecondary,
    },
    '&:active': {
      backgroundColor: vars.colors.foregroundSecondary,
    },
    // data state active
    '&[data-state="active"]': {
      borderBottom: `2px solid ${vars.colors.accent}`,
    },
  },
})
