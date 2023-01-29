import { vars } from '@kalidao/reality'
import { style } from '@vanilla-extract/css'

export const root = style({
  // sticky top banner root
  position: 'sticky',
  top: 0,
  left: 0,
  right: 0,
  height: '5vh',
  width: vars.space.full,
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: vars.space['5'],
  backgroundColor: vars.colors.accent,
})

export const text = style({
  color: vars.colors.textPrimary,
})

export const sr = style({
  position: 'absolute',
  width: '1px',
  height: '1px',
  padding: '0',
  margin: '-1px',
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  whiteSpace: 'nowrap',
  borderWidth: '0',
})
