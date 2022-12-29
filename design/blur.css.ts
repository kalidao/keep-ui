import { style } from '@vanilla-extract/css'
import { vars } from '@kalidao/reality'

export const blur = style({
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

export const highBackground = style({
  minHeight: '40vh',
  borderRadius: vars.radii['2xLarge'],
  padding: vars.space['6'],
  width: '100%',
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
