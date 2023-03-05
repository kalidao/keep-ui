import { vars } from '@kalidao/reality'
import { style } from '@vanilla-extract/css'

export const command = style({
  display: 'flex',
  height: vars.space.full,
  width: vars.space.full,
  flexDirection: 'column',
  overflow: 'hidden',
  borderRadius: vars.radii['large'],
  background: vars.colors.background,
})

export const dialog = style([style({})])

// "overflow-hidden p-0 shadow-2xl [&_[dialog-overlay]]:bg-red-100"
export const content = style([
  style({
    overflow: 'hidden',
    padding: 0,
    boxShadow: vars.shadows[2],
  }),
])

export const inputWrapper = style([
  style({
    display: 'flex',
    alignItems: 'center',
    borderBottom: `1px solid ${vars.colors.foregroundSecondary}`,
    padding: vars.space[3],
  }),
])

export const inputIcon = style({
  marginRight: vars.space[2],
  height: vars.space[4],
  width: vars.space[4],
  flexShrink: 0,
  opacity: 0.5,
  color: vars.colors.text,
})

export const input = style([
  style({
    display: 'flex',
    height: vars.space[5],
    width: '100%',
    borderRadius: vars.radii['medium'],
    background: 'transparent',
    padding: vars.space[3],
    fontSize: vars.fontSizes.base,
    outline: 'none',
    color: vars.colors.text,
    border: 'none',
    selectors: {
      '&:placeholder': {
        color: vars.colors.textSecondary,
      },
      '&:disabled': {
        cursor: 'not-allowed',
        opacity: 0.5,
      },
    },
  }),
])

export const commandList = style({
  maxHeight: '300px',
  overflowY: 'auto',
  overflowX: 'hidden',
})

export const commandEmpty = style({
  // "py-6 text-center text-sm"
  padding: vars.space[6],
  textAlign: 'center',
  fontSize: vars.fontSizes.base,
})

export const commandGroup = style([
  style({
    overflow: 'hidden',
    padding: `${vars.space[3]} ${vars.space[2]}`,
    color: vars.colors.text,
    fontSize: vars.fontSizes.base,
    fontWeight: vars.fontWeights.semiBold,
    fontFamily: vars.fonts.sans,
  }),
])

export const separator = style({
  // "-mx-1 h-px bg-slate-100 dark:bg-slate-700"
  margin: `0 ${vars.space[1]}`,
  height: '1px',
  background: vars.colors.foregroundSecondary,
})

export const item = style([
  //  "relative flex cursor-default select-none items-center rounded-md py-1.5 px-2 text-sm font-medium outline-none aria-selected:bg-slate-100 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:aria-selected:bg-slate-700"
  style({
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    gap: vars.space[2],
    color: vars.colors.text,
    padding: `${vars.space[2]} ${vars.space[3]}`,
    fontSize: vars.fontSizes.base,
    fontWeight: vars.fontWeights.medium,
    outline: 'none',
    cursor: 'pointer',
    borderRadius: vars.radii['medium'],
    selectors: {
      '&:hover': {
        background: vars.colors.foregroundSecondary,
      },
      '&:focus': {
        background: vars.colors.foregroundSecondary,
      },
      '&[aria-selected]': {
        background: vars.colors.foregroundSecondary,
      },
      '&[data-disabled]': {
        pointerEvents: 'none',
        opacity: 0.5,
      },
    },
  }),
])

export const shortcut = style({
  // "ml-auto text-xs tracking-widest text-slate-500"
  marginLeft: 'auto',
  fontSize: vars.fontSizes.extraSmall,
  letterSpacing: '0.25em',
  color: vars.colors.textSecondary,
})
