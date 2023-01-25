import { style } from '@vanilla-extract/css'
import { vars } from '@kalidao/reality'

export const row = style({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  background: `linear-gradient(35deg, ${vars.colors.backgroundTertiary} 0%, ${vars.colors.backgroundSecondary} 100%)`,
  padding: vars.space[3],
  borderRadius: vars.radii['large'],
})
