import { vars } from '@kalidao/reality'
import { style } from '@vanilla-extract/css'

import { contentShow, pulse } from '@design/animation.css'

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',

  background: vars.colors.background,
  color: '$mauve12',
  borderRadius: '20px',

  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',

  width: '90vw',
  maxWidth: '600px',
  height: '90vh',
  padding: 25,

  animation: `${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1) forwards, ${pulse} 10s linear 0ms infinite alternate`,
})
export const form = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',

  width: '100%',
  height: '100%',
})
export const formHeader = style({
  display: 'flex',
  flexDirection: 'column',
  paddingRight: 4,
  paddingLeft: 4,
  flex: '0 1 auto',
})
export const formContent = style({
  flex: '1 1 auto',
  overflowY:'scroll',
})
export const formFooter = style({
  display: 'flex',
  gap: '0.5rem',
  // width: '100%',
  // marginLeft: 'auto',
  justifyContent: 'end',
  flex: '0 1 3.5rem',
})

export const select = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: vars.space[3],

  backgroundColor: vars.colors.background,
  borderWidth: vars.borderWidths.px,
  borderColor: vars.colors.foregroundSecondary,
  borderRadius: vars.radii.large,
  color: vars.colors.text,

  fontSize: vars.fontSizes.small,
  height: vars.space[12],

  lineHeight: vars.lineHeights.normal,

  ':hover': {
    color: vars.colors.foreground,
    backgroundColor: vars.colors.backgroundSecondary,
    borderColor: vars.colors.accent,
  },
  ':focus': {
    color: vars.colors.foreground,
    backgroundColor: vars.colors.backgroundSecondary,
    borderColor: vars.colors.accent,
    boxShadow: 'none',
    outline: 'none',
  },
  ':active': {
    color: vars.colors.foreground,
    backgroundColor: vars.colors.backgroundSecondary,
    borderColor: vars.colors.accent,
  },
})
