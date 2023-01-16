import { style } from '@vanilla-extract/css'
import { vars } from '@kalidao/reality'

export const pill = style({
  // "text-zinc-400 relative overflow-hidden rounded-full py-1.5 px-4 text-sm leading-6 ring-1 ring-zinc-100/10 hover:ring-zinc-100/30 duration-150"
  // convert the above tailwind classes to vanilla-extract
  all: 'unset',
  color: vars.colors.textTertiary,
  position: 'relative',
  overflow: 'hidden',
  borderRadius: vars.radii['2xLarge'],
  padding: vars.space['2'],
  paddingRight: vars.space['4'],
  paddingLeft: vars.space['4'],
  fontSize: '14px',
  fontWeight: 400,
  lineHeight: '24px',
  border: `1px solid ${vars.colors.foregroundTertiary}`,
  ':hover': {
    border: `1px solid ${vars.colors.foregroundSecondary}`,
  },
  transition: 'all 150ms',

  ':after': {
    content: '""',
    position: 'absolute',
    top: '0',
    right: '0',
    bottom: '0',
    left: '0',
    transform: 'translateX(-100%)',
    transition: 'transform 150ms',
  },
})

export const subheading = style({
  fontWeight: 600,
  fontSize: '32px',
  color: vars.colors.text,
})

export const features = style({
  minHeight: '100vh',
  padding: vars.space['10'],
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
})

export const feature = style({
  display: 'flex',
  flexDirection: 'row',
  gap: vars.space['10'],
  alignItems: 'flex-start',
  justifyContent: 'center',
  textAlign: 'start',
  marginTop: vars.space['64'],
  marginBottom: vars.space['64'],
})

export const featureReverse = style({
  display: 'flex',
  flexDirection: 'row-reverse',
  gap: vars.space['10'],
  alignItems: 'flex-start',
  justifyContent: 'center',
  textAlign: 'start',
})

export const keep = style({
  color: vars.colors.textTertiary,
  textTransform: 'lowercase',
})

export const featureTitle = style({
  fontWeight: 600,
  fontSize: '48px',
  color: vars.colors.text,
  textDecoration: 'underline',
})

export const featureDescription = style({
  fontWeight: 400,
  fontSize: '20px',
  color: vars.colors.textSecondary,
})

export const featureStyled = style({
  fontWeight: 400,
  fontSize: '80px',
  color: vars.colors.text,

  ':hover': {
    color: vars.colors.accent,
  },
})

export const featureImage = style({
  maxWidth: '100%',
  height: 'auto',
  objectFit: 'cover',
  aspectRatio: '20/10',
  borderRadius: vars.radii['2xLarge'],
  boxShadow: `${vars.colors.foregroundTertiary} 0px 54px 55px, ${vars.colors.foregroundSecondary} 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, ${vars.colors.foregroundSecondaryHover} 0px 12px 13px, ${vars.colors.foregroundSecondary} 0px -3px 5px`,
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

export const heading = style({
  fontWeight: 600,
  fontSize: '180px',
  color: vars.colors.textPrimary,
  minHeight: '200px',
  minWidth: '200px',
})

export const hero = style({
  position: 'absolute',
  top: '10%',
  left: '10%',
  right: '10%',
  margin: '-50px 0 0 -50px',
  display: 'flex',
  flexDirection: 'row',
  gap: vars.space['10'],

  paddingLeft: vars.space['5'],
  paddingBottom: vars.space['5'],
  borderRadius: vars.radii['2xLarge'],
})

export const intro = style({
  minHeight: '40vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  border: `1px solid rgba(255, 255, 255, 0.2)`,
})

export const introHeading = style({
  fontWeight: 600,
  fontSize: '48px',
  color: vars.colors.text,
})

export const introBlurb = style([
  style({
    color: vars.colors.foreground,
    fontSize: '18px',
    fontWeight: 400,

    fontStyle: 'italic',
    width: '60vw',

    padding: vars.space['6'],
    paddingRight: vars.space['10'],
    paddingLeft: vars.space['10'],
  }),
])
