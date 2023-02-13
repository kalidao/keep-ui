import { responsiveStyle, vars } from '@kalidao/reality'
import { style } from '@vanilla-extract/css'

export const socialIcon = style({
  all: 'unset',
  padding: vars.space[1],
  borderRadius: vars.radii.full,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',

  ':hover': {
    transform: 'scale(1.1)',
  },
})

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

export const signers = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space[3],

  // add scroll if overflow
  overflowY: 'scroll',
  scrollbarColor: vars.colors.accent,
  scrollbarWidth: vars.space[1],
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
