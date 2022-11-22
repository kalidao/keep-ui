import { keyframes, style } from '@vanilla-extract/css'
import { vars } from '@kalidao/reality'

export const dialog = style({
  position: 'fixed',
  inset: 0,
  zIndex: 10,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  overflowY: 'auto',
  background: 'rgba(0,0,0,0.6)',
  transition: 'all 1s',
  backdropFilter: 'blur(10px)',
  // opacity: 25,
})

export const dialogContent = style({
  // flex flex-col bg-gray-800 text-white w-96 py-8 px-4 text-center
  display: 'flex',
  zIndex: 10,
  flexDirection: 'column',
  backgroundColor: vars.colors.accent,
  color: vars.colors.textPrimary,
  minHeight: '50rem',
  minWidth: '24rem',
  paddingRight: vars.space[6],
  paddingLeft: vars.space[6],
  paddingTop: vars.space[4],
  paddingBottom: vars.space[4],
  textAlign: 'center',
  border: '100px solid red',
})

export const dialogPanel = style({
  minWidth: vars.space[96],
  padding: vars.space[6],
  borderRadius: vars.radii['2xLarge'],
  backgroundColor: vars.colors.black,
  border: `1px solid ${vars.colors.foregroundSecondary}`,
})
