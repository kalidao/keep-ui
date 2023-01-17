import { style } from '@vanilla-extract/css'
import { vars } from '@kalidao/reality'
export const keepCard = style({
  backgroundColor: vars.colors.background,

  boxShadow: `rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px`,
  padding: 8,

  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  minWidth: vars.space[32],
  gap: vars.space[4],

  // transform the card up and to the right a bit when it's hovered
  selectors: {
    '&:hover': {
      transform: 'translate(2px, -2px)',
    },
  },
})
