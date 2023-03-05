import { vars } from '@kalidao/reality'
import { style } from '@vanilla-extract/css'

import {
  animateIn,
  slideInFromBottom,
  slideInFromLeft,
  slideInFromRight,
  slideInFromTop,
} from '@design/Sheet/styles.css'
import { fadeIn } from '@design/animation.css'

// convert below css to vanilla-extract
// @import '@radix-ui/colors/blackA.css';
// @import '@radix-ui/colors/mauve.css';
// @import '@radix-ui/colors/violet.css';

// /* reset */
// button,
// fieldset,
// input {
//   all: unset;
// }

// .PopoverContent {
//   border-radius: 4px;
//   padding: 20px;
//   width: 260px;
//   background-color: white;
//   box-shadow: hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
//   animation-duration: 400ms;
//   animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
//   will-change: transform, opacity;
// }
// .PopoverContent:focus {
//   box-shadow: hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px,
//     0 0 0 2px var(--violet7);
// }
// .PopoverContent[data-state='open'][data-side='top'] {
//   animation-name: slideDownAndFade;
// }
// .PopoverContent[data-state='open'][data-side='right'] {
//   animation-name: slideLeftAndFade;
// }
// .PopoverContent[data-state='open'][data-side='bottom'] {
//   animation-name: slideUpAndFade;
// }
// .PopoverContent[data-state='open'][data-side='left'] {
//   animation-name: slideRightAndFade;
// }

// .PopoverArrow {
//   fill: white;
// }

// .PopoverClose {
//   font-family: inherit;
//   border-radius: 100%;
//   height: 25px;
//   width: 25px;
//   display: inline-flex;
//   align-items: center;
//   justify-content: center;
//   color: var(--violet11);
//   position: absolute;
//   top: 5px;
//   right: 5px;
// }
// .PopoverClose:hover {
//   background-color: var(--violet4);
// }
// .PopoverClose:focus {
//   box-shadow: 0 0 0 2px var(--violet7);
// }

// .IconButton {
//   font-family: inherit;
//   border-radius: 100%;
//   height: 35px;
//   width: 35px;
//   display: inline-flex;
//   align-items: center;
//   justify-content: center;
//   color: var(--violet11);
//   background-color: white;
//   box-shadow: 0 2px 10px var(--blackA7);
// }
// .IconButton:hover {
//   background-color: var(--violet3);
// }
// .IconButton:focus {
//   box-shadow: 0 0 0 2px black;
// }

// .Fieldset {
//   display: flex;
//   gap: 20px;
//   align-items: center;
// }

// .Label {
//   font-size: 13px;
//   color: var(--violet11);
//   width: 75px;
// }

// .Input {
//   width: 100%;
//   display: inline-flex;
//   align-items: center;
//   justify-content: center;
//   flex: 1;
//   border-radius: 4px;
//   padding: 0 10px;
//   font-size: 13px;
//   line-height: 1;
//   color: var(--violet11);
//   box-shadow: 0 0 0 1px var(--violet7);
//   height: 25px;
// }
// .Input:focus {
//   box-shadow: 0 0 0 2px var(--violet8);
// }

// .Text {
//   margin: 0;
//   color: var(--mauve12);
//   font-size: 15px;
//   line-height: 19px;
//   font-weight: 500;
// }

// @keyframes slideUpAndFade {
//   from {
//     opacity: 0;
//     transform: translateY(2px);
//   }
//   to {
//     opacity: 1;
//     transform: translateY(0);
//   }
// }

// @keyframes slideRightAndFade {
//   from {
//     opacity: 0;
//     transform: translateX(-2px);
//   }
//   to {
//     opacity: 1;
//     transform: translateX(0);
//   }
// }

// @keyframes slideDownAndFade {
//   from {
//     opacity: 0;
//     transform: translateY(-2px);
//   }
//   to {
//     opacity: 1;
//     transform: translateY(0);
//   }
// }

// @keyframes slideLeftAndFade {
//   from {
//     opacity: 0;
//     transform: translateX(2px);
//   }
//   to {
//     opacity: 1;
//     transform: translateX(0);
//   }
// }

export const content = style([
  // (
  //   "p-4 shadow-md animate-in",
  //   className
  // )
  style({
    zIndex: 100,
    borderRadius: vars.radii.medium,

    padding: vars.space[1],
    width: vars.space[72],
    backgroundColor: vars.colors.backgroundSecondary,

    outline: 'none',
    animation: `${fadeIn} 500ms ease-in-out`,

    selectors: {
      '&[data-side="bottom"]': {
        animationName: slideInFromTop,
      },
      '&[data-side="top"]': {
        animationName: slideInFromBottom,
      },
      '&[data-side="right"]': {
        animationName: slideInFromLeft,
      },
      '&[data-side="left"]': {
        animationName: slideInFromRight,
      },
    },
  }),
])
export const arrow = style([])
export const close = style([])
