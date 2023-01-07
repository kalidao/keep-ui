import { style } from '@vanilla-extract/css'

export const path = style({
  //  style="fill:#ffffff;fill-opacity:0;fill-rule:nonzero;stroke:#000000;stroke-width:3;stroke-dasharray:none;stroke-opacity:1"
  // convert css

  fillOpacity: 0,
  fillRule: 'nonzero',

  strokeWidth: 3,
  strokeDasharray: 'none',
  strokeOpacity: 1,
})
