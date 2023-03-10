import { vars } from '@kalidao/reality'
import { style } from '@vanilla-extract/css'

export const root = style({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
})

export const btn = style([
  style({
    color: vars.colors.textSecondary,
    padding: vars.space['0.5'],
    borderRadius: vars.radii['full'],

    ':hover': {
      color: vars.colors.text,
      background: vars.colors.textSecondary,
    },
  }),
])

export const score = style([
  style({
    color: vars.colors.textTertiary,
    padding: vars.space['0.5'],
  }),
])
