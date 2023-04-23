import { vars } from '@kalidao/reality'
import { style } from '@vanilla-extract/css'

export const viewTxRoot = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'space-between',
  justifyContent: 'space-between',
  gap: vars.space[2],
  width: '100%',
  height: '100%',
})

export const viewTxBox = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'space-between',
  justifyContent: 'space-between',
  gap: vars.space[2],
  width: '100%',
  height: '100%',
  marginTop: vars.space[1],

  border: `1px solid ${vars.colors.foregroundSecondary}`,
  borderRadius: vars.radii['2xLarge'],

  paddingRight: vars.space[6],
  paddingLeft: vars.space[6],
  paddingTop: vars.space[4],
  paddingBottom: vars.space[4],
})

export const viewTxTrigger = style({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'space-between',
  justifyContent: 'space-between',
  width: '100%',
  height: '100%',

  border: `1px solid ${vars.colors.foregroundSecondary}`,
  borderRadius: vars.radii['2xLarge'],

  paddingRight: vars.space[6],
  paddingLeft: vars.space[6],
  paddingTop: vars.space[4],
  paddingBottom: vars.space[4],

  ':hover': {
    cursor: 'pointer',
    backgroundColor: vars.colors.backgroundSecondary,
    border: `1px solid ${vars.colors.foregroundSecondaryHover}`,
  },

  ':active': {
    cursor: 'pointer',
    backgroundColor: vars.colors.backgroundTertiary,
  },
})

export const progressRoot = style({
  // position: relative;
  // overflow: hidden;
  // background: var(--blackA9);
  // border-radius: 99999px;
  // width: 300px;
  // height: 25px;

  // /* Fix overflow clipping in Safari */
  // /* https://gist.github.com/domske/b66047671c780a238b51c51ffde8d3a0 */
  // transform: translateZ(0);
  position: 'relative',
  overflow: 'hidden',
  background: vars.colors.backgroundSecondary,
  borderRadius: vars.radii['large'],
  width: '100%',
  height: '25px',
  transform: 'translateZ(0)',
})

export const progressYesIndicator = style({
  // background-color: white;
  // width: 100%;
  // height: 100%;
  // transition: transform 660ms cubic-bezier(0.65, 0, 0.35, 1);
  backgroundColor: vars.colors.green,
  width: '100%',
  height: '100%',
  transition: 'transform 660ms cubic-bezier(0.65, 0, 0.35, 1)',
})

export const progressNoIndicator = style({
  // background-color: white;
  // width: 100%;
  // height: 100%;
  // transition: transform 660ms cubic-bezier(0.65, 0, 0.35, 1);
  backgroundColor: vars.colors.red,
  width: '100%',
  height: '100%',
  transition: 'transform 660ms cubic-bezier(0.65, 0, 0.35, 1)',
})

export const executedTxLink = style({
  ':hover': {
    textDecoration: 'underline',
  },
  ':active': {
    textDecoration: 'underline',
  },
  // if link used, change color
  ':visited': {
    color: vars.colors.accent,
  },
})
