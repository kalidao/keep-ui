import { vars } from '@kalidao/reality'
import { keyframes, style } from '@vanilla-extract/css'

export const slideUpAndFade = keyframes({
  from: {
    opacity: 0,
    transform: 'translateY(2px)',
  },
  to: {
    opacity: 1,
    transform: 'translateY(0)',
  },
})

export const slideRightAndFade = keyframes({
  from: {
    opacity: 0,
    transform: 'translateX(-2px)',
  },
  to: {
    opacity: 1,
    transform: 'translateX(0)',
  },
})

export const slideDownAndFade = keyframes({
  from: {
    opacity: 0,
    transform: 'translateY(-2px)',
  },
  to: {
    opacity: 1,
    transform: 'translateY(0)',
  },
})

export const slideLeftAndFade = keyframes({
  from: {
    opacity: 0,
    transform: 'translateX(2px)',
  },
  to: {
    opacity: 1,
    transform: 'translateX(0)',
  },
})

export const keepCard = style({
  height: '100px',
})

export const TooltipContent = style({
  // .TooltipContent {
  //   border-radius: 4px;
  //   padding: 10px 15px;
  //   font-size: 15px;
  //   line-height: 1;
  //   color: var(--violet11);
  //   background-color: white;
  //   box-shadow: hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
  //   user-select: none;
  //   animation-duration: 400ms;
  //   animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
  //   will-change: transform, opacity;
  // }
  // .TooltipContent[data-state='delayed-open'][data-side='top'] {
  //   animation-name: slideDownAndFade;
  // }
  // .TooltipContent[data-state='delayed-open'][data-side='right'] {
  //   animation-name: slideLeftAndFade;
  // }
  // .TooltipContent[data-state='delayed-open'][data-side='bottom'] {
  //   animation-name: slideUpAndFade;
  // }
  // .TooltipContent[data-state='delayed-open'][data-side='left'] {
  //   animation-name: slideRightAndFade;
  // }
  borderRadius: vars.radii['2xLarge'],
  padding: vars.space[3],
  fontSize: vars.fontSizes.base,
  fontFamily: vars.fonts.sans,
  lineHeight: 1,
  color: vars.colors.text,
  backgroundColor: vars.colors.background,
  boxShadow: `rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px`,
  userSelect: 'none',
  animationDuration: '400ms',
  animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
  willChange: 'transform, opacity',

  selectors: {
    '&[data-state="delayed-open"][data-side="top"]': {
      animationName: slideDownAndFade,
    },
    '&[data-state="delayed-open"][data-side="right"]': {
      animationName: slideLeftAndFade,
    },
    '&[data-state="delayed-open"][data-side="bottom"]': {
      animationName: slideUpAndFade,
    },
    '&[data-state="delayed-open"][data-side="left"]': {
      animationName: slideRightAndFade,
    },
  },
})

export const TooltipArrow = style({
  fill: vars.colors.background,
})
