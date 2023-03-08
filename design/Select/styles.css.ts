import { vars } from '@kalidao/reality'
import { style } from '@vanilla-extract/css'

export const trigger = style({
  display: 'flex',
  minHeight: vars.space[10],
  width: '100%',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderRadius: vars.radii['large'],
  border: 'none',
  background: 'transparent',
  padding: vars.space[2],

  gap: vars.space[2],

  fontFamily: vars.fonts.sans,
  fontSize: vars.fontSizes['base'],
  color: vars.colors.text,

  ':focus': {
    outline: 'none',
    border: `1px solid ${vars.colors.foregroundSecondary}`,
    boxShadow: `0 0 0 3px ${vars.colors.foregroundSecondary}`,
  },
  ':disabled': {
    cursor: 'not-allowed',
    opacity: '0.5',
  },
  selectors: {
    '&::placeholder': {
      color: vars.colors.textSecondary,
    },
  },
})

export const content = style({
  position: 'relative',
  zIndex: 50,
  overflow: 'hidden',
  borderRadius: vars.radii['large'],
  fontFamily: vars.fonts.sans,
  border: `1px solid ${vars.colors.foregroundSecondary}`,
  background: vars.colors.background,
  color: vars.colors.textPrimary,
  boxShadow: '0 0 0 1px rgba(0, 0, 0, 0.05), 0 1px 2px 0 rgba(0, 0, 0, 0.1)',
  animation: 'fade-in-80 0.2s ease-in-out',
})

export const item = style({
  position: 'relative',
  display: 'flex',
  cursor: 'default',
  userSelect: 'none',
  alignItems: 'center',
  borderRadius: vars.radii.medium,
  padding: vars.space[3],

  fontFamily: vars.fonts.sans,
  fontSize: vars.fontSizes['base'],
  fontWeight: vars.fontWeights['medium'],
  outline: 'none',

  ':focus': {
    background: vars.colors.foregroundSecondary,
  },
  selectors: {
    '&[data-disabled]': {
      pointerEvents: 'none',
      opacity: '0.5',
    },
  },
})

export const triggerIcon = style({
  height: vars.space[5],
  width: vars.space[5],
  opacity: 0.5,
})

export const separator = style({
  marginLeft: `-${vars.space[1]}`,
  marginRight: `-${vars.space[1]}`,
  marginTop: vars.space[1],
  marginBottom: vars.space[1],
  height: '1px',
  background: vars.colors.foregroundSecondary,
})

export const label = style({
  paddingTop: vars.space[1],
  paddingBottom: vars.space[1],
  paddingRight: vars.space[2],
  paddingLeft: vars.space[8],
  fontFamily: vars.fonts.sans,
  fontSize: vars.fontSizes['base'],
  fontWeight: vars.fontWeights['semiBold'],
  color: vars.colors.textPrimary,
})

export const check = style({
  height: vars.space[5],
  width: vars.space[5],
  marginRight: vars.space[2],
  backgroundColor: vars.colors.green,
  color: vars.colors.white,
  borderRadius: vars.radii['full'],
  padding: vars.space[1],
})

export const value = style({
  color: vars.colors.textSecondary,
})
