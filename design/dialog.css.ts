import { vars } from '@kalidao/reality'
import { style } from '@vanilla-extract/css'

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
  backgroundColor: 'transparent',
  // opacity: 25,
})

export const dialogContent = style({
  // flex flex-col bg-gray-800 text-white w-96 py-8 px-4 text-center
  display: 'flex',
  zIndex: 10,
  flexDirection: 'column',
  backgroundColor: vars.colors.backgroundTertiary,
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
  minWidth: vars.space.viewWidth,
  minHeight: vars.space.viewHeight,
  padding: vars.space[6],
  borderRadius: vars.radii['2xLarge'],
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  

  border: `1px solid ${vars.colors.foregroundSecondary}`,
})

export const dialogBox = style({
  minWidth: vars.space[96],
  padding: vars.space[6],
  borderRadius: vars.radii['2xLarge'],
  border: `1px solid ${vars.colors.foregroundSecondary}`,
})