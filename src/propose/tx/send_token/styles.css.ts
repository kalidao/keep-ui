import { vars } from '@kalidao/reality'
import { style } from '@vanilla-extract/css'

export const row = style({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  background: `linear-gradient(35deg, ${vars.colors.backgroundTertiary} 0%, ${vars.colors.backgroundSecondary} 100%)`,
  padding: vars.space[3],
  borderRadius: vars.radii['large'],
})

export const tokenItem = style({
  minHeight: vars.space[10],
  paddingTop: vars.space[2],
  paddingBottom: vars.space[2],
})

export const btn = style({
  display: 'flex',
  color: vars.colors.textSecondary,
  ':hover': {
    cursor: 'pointer',
    color: vars.colors.text,
    transition: 'color 0.2s ease-in-out',
  },
  ':focus': {
    textShadow: `0 0 0.5rem ${vars.colors.textSecondary}`,
  },
  ':active': {
    textShadow: `0 0 0.5rem ${vars.colors.textSecondary}`,
  },
})
