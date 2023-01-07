import { style } from '@vanilla-extract/css'
import { vars } from '@kalidao/reality'
import { serif } from '@design/app.css'

export const arrow = style({
  fill: vars.colors.backgroundSecondary,
})

export const content = style({
  minWidth: 220,
  background: vars.colors.background,
  fontFamily: serif,
  borderRadius: vars.radii.none,
  padding: vars.space[2],
  boxShadow: `${vars.shadows[1]} ${vars.colors.foregroundTertiary}`,
  zIndex: 9999,
})

export const item = style({
  all: 'unset',
  fontFamily: serif,
  fontSize: vars.fontSizes.base,
  lineHeight: vars.lineHeights.normal,
  color: vars.colors.foreground,
  borderRadius: vars.radii.none,
  display: 'flex',
  alignItems: 'center',
  height: vars.space[10],
  padding: vars.space[1],
  position: 'relative',
  paddingLeft: vars.space[6],
  userSelect: 'none',

  ':hover': {
    color: vars.colors.foreground,
    background: vars.colors.backgroundTertiary,
  },

  ':focus': {
    color: vars.colors.foreground,
    background: vars.colors.backgroundSecondary,
  },
})

export const itemText = style({
  fontFamily: serif,
  fontSize: vars.fontSizes.base,
  lineHeight: vars.lineHeights.normal,
  color: vars.colors.text,
})

export const separator = style({
  backgroundColor: vars.colors.foregroundSecondary,
  height: 1,
  margin: 5,
})

export const icon = style({
  position: 'relative',
  color: vars.colors.foreground,
  top: 1,

  selectors: {
    '&[data-state=open]': {
      transform: 'rotate(180deg)',
      transition: 'transform 250ms ease',
    },
  },
})

export const trigger = style({
  all: 'unset',
  fontFamily: serif,
  lineHeight: vars.lineHeights.normal,
  padding: vars.space[3],
  borderRadius: vars.radii.full,
  marginRight: vars.space[1],

  transition: 'transform 250ms ease',
  selectors: {
    '&[data-state=open]': {
      transform: 'rotate(180deg)',
    },
  },
})
export const label = style({
  paddingLeft: vars.space[6],
  fontSize: vars.fontSizes.base,
  fontFamily: serif,
  lineHeight: vars.lineHeights[2],
  color: vars.colors.text,
  fontStyle: 'italic',
  width: vars.space.full,
})

export const itemLink = style({
  all: 'unset',
})
