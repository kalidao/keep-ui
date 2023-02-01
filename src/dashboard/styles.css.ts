import { vars } from '@kalidao/reality'
import { style } from '@vanilla-extract/css'

export const socialIcon = style({
  padding: vars.space[2],
  borderRadius: vars.radii.full,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',

  ':hover': {
    border: `1px solid ${vars.colors.foreground}`,
  },
})

export const signers = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space[3],

  // add scroll if overflow
  overflowY: 'scroll',
  scrollbarColor: vars.colors.accent,
  scrollbarWidth: vars.space[1],
})

export const tabRoot = style({
  width: '60vw',
})

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
