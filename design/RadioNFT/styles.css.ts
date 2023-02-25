import { vars } from '@kalidao/reality'
import { style } from '@vanilla-extract/css'

export const root = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  gap: vars.space[2],

  // hover
  ':hover': {
    transform: 'scale(1.05)',
  },

  // if child input is checked
  selectors: {
    'input:checked + &': {
      border: '1px solid red',
    },
  },
})

export const radio = style({
  // style checked state
  //    style parent root when child input is checked
  selectors: {
    'input:checked + &': {
      backgroundColor: 'red',
    },
  },
})

export const checkmark = style({
  // style checked state
  //    style parent root when child input is checked
  backgroundColor: `${vars.colors.green}01`,
  color: vars.colors.green,
  border: `1px solid ${vars.colors.green}`,
  borderRadius: vars.radii.full,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: vars.space[1],
})
