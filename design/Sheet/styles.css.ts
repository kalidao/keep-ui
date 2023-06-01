import { responsiveStyle, vars } from '@kalidao/reality'
import { keyframes, style, styleVariants } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'

export const trigger = style({
  all: 'unset',
})
export const animateIn = keyframes({
  '0%': {
    opacity: 0,
  },
  '100%': {
    opacity: 1,
  },
})

export const animateOut = keyframes({
  '0%': {
    opacity: 1,
  },
  '100%': {
    opacity: 0,
  },
})

export const slideInFromTop = keyframes({
  '0%': {
    opacity: 0,
    transform: 'translateY(-100%)',
  },
  '100%': {
    opacity: 1,
    transform: 'translateY(0)',
  },
})

export const slideInFromBottom = keyframes({
  '0%': {
    opacity: 0,
    transform: 'translateY(100%)',
  },
  '100%': {
    opacity: 1,
    transform: 'translateY(0)',
  },
})

export const slideInFromLeft = keyframes({
  '0%': {
    opacity: 0,
    transform: 'translateX(-100%)',
  },
  '100%': {
    opacity: 1,
    transform: 'translateX(0)',
  },
})

export const slideInFromRight = keyframes({
  '0%': {
    opacity: 0,
    transform: 'translateX(100%)',
  },
  '100%': {
    opacity: 1,
    transform: 'translateX(0)',
  },
})

const basePortal = style([
  style({
    // fixed inset-0 z-50 flex
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 50,
    display: 'flex',
  }),
])

export const portalChildren = styleVariants({
  top: [
    basePortal,
    {
      alignItems: 'flex-start',
    },
  ],
  bottom: [
    basePortal,
    {
      alignItems: 'flex-end',
    },
  ],
  left: [
    basePortal,
    {
      justifyContent: 'flex-start',
    },
  ],
  right: [
    basePortal,
    {
      justifyContent: 'flex-end',
    },
  ],
  center: [
    basePortal,
    {
      justifyContent: 'center',
    },
  ],
})

export const sheetOverlay = style([
  style({
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 50,
    background: 'transparent',
    backdropFilter: 'blur(10px)',
    transition: 'all 100ms',
    selectors: {
      '&[data-state=closed]': {
        animation: `${animateOut} 100ms`,
      },
      '&[data-state=open]': {
        animation: `${animateIn} 100ms`,
      },
    },
  }),
])

export const portalContent = recipe({
  base: {
    // position: 'fixed',
    display: 'flex',
    flexDirection: 'column',
    zIndex: 50,
    gap: vars.space[3],
    scale: 1,
    background: vars.colors.background,
    backgroundImage: `linear-gradient(to bottom right, ${vars.colors.background}, ${vars.colors.backgroundSecondary}, ${vars.colors.backgroundTertiary}, ${vars.colors.backgroundSecondary})`,

    padding: vars.space[6],
    opacity: 1,
    border: `1px solid ${vars.colors.backgroundTertiary}`,
    selectors: {
      '&[data-state=closed]': {
        animation: `${animateOut} 100ms`,
      },
      '&[data-state=open]': {
        animation: `${animateIn} 100ms`,
      },
    },

    overflow: 'auto',
  },

  variants: {
    position: {
      top: {
        animation: `${animateIn} 300ms, ${slideInFromTop} 300ms`,
        width: '100vw',
      },
      bottom: {
        animation: `${animateIn} 300ms, ${slideInFromBottom} 300ms`,
        width: '100vw',
      },
      left: {
        animation: `${animateIn} 300ms, ${slideInFromLeft} 300ms`,
        height: '100vh',
      },
      right: {
        animation: `${animateIn} 300ms, ${slideInFromRight} 300ms`,
        height: '100vh',
      },
    },
    size: {
      fit: {},
      base: {},
      sm: {},
      lg: {},
      xl: {},
      full: {},
    },
  },

  compoundVariants: [
    {
      variants: {
        position: 'top',
        size: 'fit',
      },
      style: {
        maxHeight: '100vh',
      },
    },
    {
      variants: {
        position: 'bottom',
        size: 'fit',
      },
      style: {
        maxHeight: '100vh',
      },
    },
    {
      variants: {
        position: 'top',
        size: 'base',
      },
      style: {
        height: '33.333333%',
      },
    },
    {
      variants: {
        position: 'bottom',
        size: 'base',
      },
      style: {
        height: '33.333333%',
      },
    },
    {
      variants: {
        position: 'top',
        size: 'sm',
      },
      style: {
        height: '25%',
      },
    },
    {
      variants: {
        position: 'bottom',
        size: 'sm',
      },
      style: {
        height: '25%',
      },
    },
    {
      variants: {
        position: 'top',
        size: 'lg',
      },
      style: {
        height: '50%',
      },
    },
    {
      variants: {
        position: 'bottom',
        size: 'lg',
      },
      style: {
        height: '50%',
      },
    },
    {
      variants: {
        position: 'top',
        size: 'xl',
      },
      style: {
        height: '83.333333%',
      },
    },
    {
      variants: {
        position: 'bottom',
        size: 'xl',
      },
      style: {
        height: '83.333333%',
      },
    },
    {
      variants: {
        position: 'top',
        size: 'full',
      },
      style: {
        height: '100vh',
      },
    },
    {
      variants: {
        position: 'bottom',
        size: 'full',
      },
      style: {
        height: '100vh',
      },
    },
    {
      variants: {
        position: 'right',
        size: 'fit',
      },
      style: {
        maxWidth: '100vw',
      },
    },
    {
      variants: {
        position: 'left',
        size: 'fit',
      },
      style: {
        maxWidth: '100vw',
      },
    },
    {
      variants: {
        position: 'right',
        size: 'base',
      },
      style: {
        width: '33.333333%',
      },
    },
    {
      variants: {
        position: 'left',
        size: 'base',
      },
      style: {
        width: '33.333333%',
      },
    },
    {
      variants: {
        position: 'right',
        size: 'sm',
      },
      style: {
        width: '25%',
      },
    },
    {
      variants: {
        position: 'left',
        size: 'sm',
      },
      style: {
        width: '25%',
      },
    },
    {
      variants: {
        position: 'right',
        size: 'lg',
      },
      style: {
        width: '50%',
      },
    },
    {
      variants: {
        position: 'left',
        size: 'lg',
      },
      style: {
        width: '50%',
      },
    },
    {
      variants: {
        position: 'right',
        size: 'xl',
      },
      style: {
        width: '83.333333%',
      },
    },
    {
      variants: {
        position: 'left',
        size: 'xl',
      },
      style: {
        width: '83.333333%',
      },
    },
    {
      variants: {
        position: 'right',
        size: 'full',
      },
      style: {
        width: '100vw',
      },
    },
    {
      variants: {
        position: 'left',
        size: 'full',
      },
      style: {
        width: '100vw',
      },
    },
  ],

  defaultVariants: {
    position: 'right',
    size: 'base',
  },
})

export const portalClose = style([
  style({
    all: 'unset',
    position: 'absolute',
    top: vars.space[3],
    right: vars.space[3],
    cursor: 'pointer',
    color: vars.colors.red,

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

      backgroundColor: `${vars.colors.red}80`,
    },
    ':focus': {
      outline: 'none',
      backgroundColor: `${vars.colors.red}80`,
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
    gap: vars.space[3],
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
    marginBottom: vars.space[10],
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

export type PortalChildrenVariants = keyof typeof portalChildren
export type PortalContentVariants = keyof typeof portalContent
