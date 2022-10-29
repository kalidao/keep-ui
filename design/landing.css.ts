import { keyframes, style } from '@vanilla-extract/css'
import { vars } from '@kalidao/reality'
import { colors } from '@kalidao/reality/dist/types/tokens/color'

export const heading = style({
  fontSize: '180px',
  color: vars.colors.textPrimary,
})

export const subheading = style({
  fontSize: '90px',
  color: vars.colors.textSecondary,
})

export const preview = style({
  height: '40vh',
  borderRadius: vars.radii['2xLarge'],
  width: '100%',
  zIndex: 100,
  position: 'relative',
  display: 'inline-block',
  overflow: 'hidden',
  background: vars.colors.backgroundSecondary,
  backgroundImage: `linear-gradient(to bottom right, ${vars.colors.background}, ${vars.colors.backgroundSecondary}, ${vars.colors.backgroundTertiary}, ${vars.colors.backgroundSecondary})`,

  ':after': {
    position: 'absolute',
    top: '0',
    right: '0',
    bottom: '0',
    left: '0',
    transform: 'translateX(-100%)',
  },
})
