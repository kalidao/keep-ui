import { vars } from '@kalidao/reality'
import { style } from '@vanilla-extract/css'

export const arrow = style({
  fill: vars.colors.backgroundSecondary,
})

export const content = style({
  minWidth: 220,
  background: vars.colors.background,

  borderRadius: vars.radii['2xLarge'],
  padding: vars.space[2],
  boxShadow: `${vars.shadows[1]} ${vars.colors.foregroundTertiary}`,
  zIndex: 9999,
})

export const subtrigger = style([
  style({
    all: 'unset',

    fontFamily: vars.fonts.sans,
    fontSize: vars.fontSizes.base,
    lineHeight: vars.lineHeights.normal,
    color: vars.colors.text,
    borderRadius: vars.radii['large'],

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',

    height: vars.space[10],

    position: 'relative',

    paddingLeft: vars.space[6],
    padding: vars.space[1],
    userSelect: 'none',

    ':hover': {
      color: vars.colors.foreground,
      background: vars.colors.accentSecondaryHover,
    },

    ':focus': {
      color: vars.colors.foreground,
      background: vars.colors.accentSecondaryHover,
    },

    selectors: {
      '&[data-state=open]': {
        backgroundColor: vars.colors.accentSecondary,
      },
    },
  }),
])

export const subcontent = style([
  content,
  style({
    display: 'flex',
    flexDirection: 'column',
    gap: vars.space[1],
  }),
])

export const item = style({
  all: 'unset',

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

  lineHeight: vars.lineHeights.normal,
  padding: vars.space[3],
  borderRadius: vars.radii.full,
  marginRight: vars.space[1],
  color: vars.colors.foreground,

  selectors: {
    '&[data-state=open]': {
      scale: '1.1',
      transition: 'scale 200ms ease',
    },
  },
})
export const label = style({
  paddingLeft: vars.space[6],
  fontSize: vars.fontSizes.base,

  lineHeight: vars.lineHeights[2],
  color: vars.colors.text,
  fontStyle: 'italic',
  width: vars.space.full,
})

export const itemLink = style({
  all: 'unset',
})
