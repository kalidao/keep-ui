import { vars } from '@kalidao/reality'
import { style } from '@vanilla-extract/css'

export const toolboxRoot = style([
  style({
    display: 'flex',
  }),
])

export const menuItem = style({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  gap: vars.space[4],
  width: '100%',
  height: '100%',
  padding: vars.space[6],
  borderRadius: vars.radii['2xLarge'],

  boxShadow: vars.shadows[0.5],
  cursor: 'pointer',
  transition: 'all 0.2s ease-in-out',
  backgroundColor: vars.colors.backgroundTertiary,

  ':hover': {
    backgroundColor: vars.colors.background,
  },
})

export const menuIcon = style({
  width: vars.space[8],
  height: vars.space[8],

  color: vars.colors.text,

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.2s ease-in-out',

  ':hover': {
    backgroundColor: vars.colors.backgroundTertiary,
  },
})

export const ToolbarRoot = style({
  display: 'flex',
  padding: vars.space[6],
  borderRadius: vars.radii['2xLarge'],
  backgroundColor: `linear-gradient(315deg, ${vars.colors.backgroundTertiary}, ${vars.colors.groupBackground})`,
  boxShadow: `7px 7px 14px ${vars.colors.foregroundTertiary}, -7px -7px 14px ${vars.colors.foregroundSecondary}`,
})

export const Item = style({
  all: 'unset',
  flex: '0 0 auto',
  color: vars.colors.text,
  height: vars.space[8],
  padding: `0 ${vars.space[4]}`,
  borderRadius: vars.radii['2xLarge'],
  display: 'inline-flex',
  fontSize: vars.fontSizes.base,
  lineHeight: 1,
  alignItems: 'center',
  justifyContent: 'center',

  ':hover': {
    backgroundColor: vars.colors.accentTertiary,
    color: vars.colors.foreground,
  },

  ':focus': {
    position: 'relative',
    color: vars.colors.foreground,
  },
})

export const ToolbarToggleItem = style([
  Item,
  style({
    backgroundColor: 'transparent',
    marginLeft: vars.space[2],

    selectors: {
      '&:first-child': {
        marginLeft: 0,
      },

      '&[data-state="on"]': {
        border: `1px solid ${vars.colors.accent}`,
        color: vars.colors.accent,
      },
    },
  }),
])

export const ToolbarSeparator = style({
  width: '1px',
  backgroundColor: vars.colors.foregroundSecondary,
  margin: `0 ${vars.space[4]}`,
})

export const ToolbarLink = style([
  Item,
  style({
    backgroundColor: 'transparent',
    color: vars.colors.accentSecondary,
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',

    ':hover': {
      backgroundColor: 'transparent',
      color: vars.colors.accent,
      cursor: 'pointer',
    },
  }),
])

export const ToolbarButton = style([
  Item,
  style({
    paddingLeft: vars.space[4],
    paddingRight: vars.space[4],
    color: vars.colors.textPrimary,
    backgroundColor: vars.colors.accentSecondary,

    cursor: 'url(/golden_key.png), pointer',

    ':hover': {
      backgroundColor: vars.colors.accentSecondaryHover,
    },
  }),
])
