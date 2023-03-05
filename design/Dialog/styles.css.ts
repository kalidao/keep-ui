import { responsiveStyle, vars } from '@kalidao/reality'
import { style } from '@vanilla-extract/css'

export const portal = style([
  style({
    // fixed inset-0 z-50 flex items-start justify-center sm:items-center
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 50,
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
  }),
  responsiveStyle({
    sm: {
      alignItems: 'center',
    },
  }),
])

export const overlay = style([
  // fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-all duration-100 data-[state=closed]:animate-out data-[state=open]:fade-in data-[state=closed]:fade-out
  style({
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 50,
    background: vars.colors.background,
    backgroundColor: 'transparent',
    backdropFilter: 'blur(8px)',

    transition: 'all 0.1s ease-in-out',
    selectors: {
      '&[data-state=open]': {
        animation: 'fade-in 0.2s ease-in-out',
      },
      '&[data-state=closed]': {
        animation: 'fade-out 0.2s ease-in-out',
      },
    },
  }),
])

export const content = style([
  style({
    position: 'fixed',
    zIndex: 50,
    display: 'grid',
    width: vars.space.full,
    gap: vars.space[4],
    borderBottomLeftRadius: vars.radii['large'],
    borderBottomRightRadius: vars.radii['large'],
    border: `1px solid ${vars.colors.foregroundSecondary}`,
    background: vars.colors.background,
    padding: vars.space[6],
    animation: 'fade-in-90 0.2s ease-in-out, slide-in-from-bottom-10 0.2s ease-in-out',
    selectors: {
      '&[data-state=open]': {
        border: `1px solid ${vars.colors.foregroundSecondaryHover}`,
        animation: 'fade-in-90 0.2s ease-in-out, slide-in-from-bottom-0 0.2s ease-in-out',
      },
      '&[data-state=closed]': {
        animation: 'fade-out 0.2s ease-in-out, slide-out-to-bottom-10 0.2s ease-in-out',
      },
    },
  }),
  responsiveStyle({
    sm: {
      maxWidth: vars.space[96],
      borderRadius: vars.radii['large'],
      animation: 'fade-in-90 0.2s ease-in-out, zoom-in-90 0.2s ease-in-out, slide-in-from-bottom-0 0.2s ease-in-out',
      selectors: {
        '&[data-state=open]': {
          animation:
            'fade-in-90 0.2s ease-in-out, zoom-in-90 0.2s ease-in-out, slide-in-from-bottom-0 0.2s ease-in-out',
        },
        '&[data-state=closed]': {
          animation: 'fade-out 0.2s ease-in-out, zoom-out-90 0.2s ease-in-out, slide-out-to-bottom-10 0.2s ease-in-out',
        },
      },
    },
  }),
])

export const close = style([
  style({
    all: 'unset',
    position: 'absolute',
    top: vars.space[3],
    right: vars.space[3],
    borderRadius: vars.radii.full,
    height: vars.space[6],
    width: vars.space[6],
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    opacity: 0.7,
    transition: 'opacity 0.2s ease-in-out',
    ':hover': {
      opacity: 1,
      scale: 1.1,
      transition: 'opacity 0.2s ease-in-out, scale 0.2s ease-in-out',
    },
    ':focus': {
      outline: 'none',
      boxShadow: `0 0 0 1px ${vars.colors.backgroundTertiary}`,
    },
    ':disabled': {
      pointerEvents: 'none',
    },
    selectors: {
      '&[data-state=open]': {
        background: vars.colors.accent,
      },
    },
  }),
])

export const header = style([
  style({
    display: 'flex',
    flexDirection: 'column',
    gap: vars.space[2],
    textAlign: 'center',
  }),
  responsiveStyle({
    sm: {
      textAlign: 'left',
    },
  }),
])

export const footer = style([
  style({
    display: 'flex',
    flexDirection: 'column-reverse',
  }),
  responsiveStyle({
    sm: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      gap: vars.space[2],
    },
  }),
])

export const title = style([
  style({
    color: vars.colors.textPrimary,
    fontSize: vars.fontSizes.large,
    fontWeight: vars.fontWeights.semiBold,
    fontFamily: vars.fonts.sans,
  }),
])

export const description = style([
  style({
    color: vars.colors.text,
    fontSize: vars.fontSizes.base,
    fontWeight: vars.fontWeights.normal,
    fontFamily: vars.fonts.sans,
  }),
])

export const trigger = style({
  all: 'unset',
})
