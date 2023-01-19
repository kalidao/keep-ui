import { style } from '@vanilla-extract/css'
import { responsiveStyle, vars } from '@kalidao/reality'

export const pill = style({
  all: 'unset',
  color: vars.colors.textSecondary,
  backgroundColor: vars.colors.backgroundSecondary,
  position: 'relative',
  overflow: 'hidden',
  borderRadius: vars.radii['2xLarge'],
  padding: vars.space['2'],
  paddingRight: vars.space['4'],
  paddingLeft: vars.space['4'],
  fontSize: '14px',
  fontWeight: 400,
  lineHeight: '24px',
  textAlign: 'center',
  alignItems: 'center',

  border: `1px solid ${vars.colors.foregroundSecondary}`,
  ':hover': {
    border: `1px solid ${vars.colors.foregroundSecondaryHover}`,
    transition: 'all 150ms',
  },
})

export const subheading = style([
  style({
    fontWeight: 600,
    color: vars.colors.text,
  }),
  responsiveStyle({
    xs: {
      fontSize: '24px',
    },
    sm: {
      fontSize: '40px',
    },
    md: {
      fontSize: '48px',
    },
    lg: {
      fontSize: '56px',
    },
    xl: {
      fontSize: '64px',
    },
  }),
])

export const features = style({
  minHeight: '100vh',
  padding: vars.space['10'],
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
})

export const feature = style([
  style({
    display: 'flex',
    flexDirection: 'row',
    gap: vars.space['10'],
    alignItems: 'flex-start',
    justifyContent: 'center',
    textAlign: 'start',
    marginTop: vars.space['64'],
    marginBottom: vars.space['64'],
  }),
  responsiveStyle({
    xs: {
      flexDirection: 'column',
    },
    sm: {
      flexDirection: 'column',
    },
  }),
])

export const featureReverse = style([
  style({
    display: 'flex',
    flexDirection: 'row-reverse',
    gap: vars.space['10'],
    alignItems: 'flex-start',
    justifyContent: 'center',
    textAlign: 'start',
  }),
  responsiveStyle({
    xs: {
      flexDirection: 'column',
    },
    sm: {
      flexDirection: 'column',
    },
  }),
])

export const keep = style({
  color: vars.colors.textTertiary,
  textTransform: 'lowercase',
})

export const featureTitle = style([
  style({
    fontWeight: 600,
    fontSize: '48px',
    color: vars.colors.text,
    textDecoration: 'underline',
  }),
  responsiveStyle({
    xs: {
      fontSize: '32px',
    },
    sm: {
      fontSize: '40px',
    },
    md: {
      fontSize: '48px',
    },
    lg: {
      fontSize: '56px',
    },
    xl: {
      fontSize: '64px',
    },
  }),
])

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

export const heading = style([
  style({
    fontWeight: 600,
    color: vars.colors.textPrimary,
  }),
  responsiveStyle({
    xs: {
      fontSize: '80px',
    },
    sm: {
      fontSize: '100px',
    },
    md: {
      fontSize: '120px',
    },
    lg: {
      fontSize: '140px',
    },
    xl: {
      fontSize: '160px',
    },
  }),
])

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
  responsiveStyle({
    xs: {
      width: '100vw',
      fontSize: '13px',
    },
    sm: {
      width: '100vw',
      fontSize: '15px',
    },
    md: {
      width: '90vw',
      fontSize: '17px',
    },
    lg: {
      width: '80vw',
      fontSize: '19px',
    },
    xl: {
      width: '70vw',
      fontSize: '21px',
    },
  }),
])
