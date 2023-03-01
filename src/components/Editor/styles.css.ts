import { vars } from '@kalidao/reality'
import { style } from '@vanilla-extract/css'

export const root = style([
  style({
    backgroundColor: vars.colors.background,
    color: vars.colors.text,
    borderRadius: vars.radii['large'],
    paddingTop: vars.space[1],
    paddingBottom: vars.space[2],
    paddingLeft: vars.space[3],
    paddingRight: vars.space[3],
    border: `1px solid ${vars.colors.foregroundSecondary}`,

    ':hover': {
      outline: `1px solid ${vars.colors.accentSecondary}`,
    },

    ':focus': {
      outline: 'none',
      border: `1px solid ${vars.colors.accent}`,
    },
  }),
])

export const menuButton = style([
  style({
    all: 'unset',
    backgroundColor: vars.colors.background,
    color: vars.colors.text,
    padding: vars.space[2],
    marginRight: vars.space[2],
    marginLeft: vars.space[2],
    marginBottom: vars.space[1],
    borderRadius: vars.radii.full,
    border: `1px solid ${vars.colors.accentSecondary}`,
  }),
])

export const activeMenuButton = style([
  menuButton,
  style({
    backgroundColor: vars.colors.accentSecondary,
    borderColor: vars.colors.accentSecondaryHover,
  }),
])

export const emojiMenuRoot = style({
  //    10 column, 1fr width
  display: 'flex',
  flexDirection: 'row',

  gap: vars.space[1],
})

export const emojiMenuButton = style([
  style({
    all: 'unset',
    backgroundColor: vars.colors.background,
    outline: `1px solid ${vars.colors.foregroundSecondary}`,
    fontFamily: vars.fonts.sans,
    fontSize: vars.fontSizes['extraSmall'],
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: vars.space[1],
    borderRadius: vars.radii.medium,
    padding: vars.space[2],
    width: vars.space.full,
    height: vars.space.full,
  }),
])

export const activeEmojiMenuButton = style([
  emojiMenuButton,
  style({
    outline: `1px solid ${vars.colors.accent}`,
  }),
])

export const taskList = style([])
