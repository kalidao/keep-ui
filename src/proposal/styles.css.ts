import { style } from '@vanilla-extract/css'
import { vars } from '@kalidao/reality'

export const viewTxRoot = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'space-between',
  justifyContent: 'space-between',
  gap: vars.space[2],
  width: '100%',
  height: '100%',

  border: `1px solid ${vars.colors.foregroundSecondary}`,
  borderRadius: vars.radii['large'],

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
  borderRadius: vars.radii['large'],

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
