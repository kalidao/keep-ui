import { style } from '@vanilla-extract/css';
import { vars } from '@kalidao/reality'

export const root = style({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
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
