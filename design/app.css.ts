import { vars } from '@kalidao/reality'
import { globalStyle } from '@vanilla-extract/css'

globalStyle('html, body', {
  margin: 0,
  padding: 0,
  background: vars.colors.background,
})

globalStyle('a', {
  color: vars.colors.textPrimary,
  cursor: 'pointer',
  textDecoration: 'underline',
})

globalStyle('h1, h2, h3, h4, h5, h6', {
  margin: 0,
  padding: 0,
  fontSize: vars.fontSizes.headingThree,
})

globalStyle('p', {
  margin: 0,
  padding: 0,
  fontSize: vars.fontSizes.base,
})

globalStyle('pre > code', {
  display: 'block',
  padding: '1rem',
  background: vars.colors.backgroundSecondary,
  color: vars.colors.text,
  borderRadius: '0.5rem',
  overflow: 'auto',
})

// input=checkbox
globalStyle('input[type=checkbox]', {
  appearance: 'none',
  backgroundColor: vars.colors.background,
  borderRadius: '0.25rem',
  width: vars.space[4],
  height: vars.space[4],
  
  outline: 'none',
  cursor: 'pointer',
  transition: 'background 0.2s ease-in-out',
  border: `1px solid ${vars.colors.backgroundTertiary}`,
})

globalStyle('input[type=checkbox]:checked', {
  background: vars.colors.green,
  outline: 'none',
  // add a checkmark
})

// add checkmark
globalStyle('input[type=checkbox]:checked::after', {
  content: '✔',
  display: 'inline-block',
  color: vars.colors.background,
  // center the checkmark vertically and horizontally
  textAlign: 'center',
  lineHeight: vars.space[3],
  width: vars.space[4],
  height: vars.space[4],
  fontSize: vars.fontSizes.label,
  margin: 'auto'
})

globalStyle('input[type=checkbox]:focus', {
  boxShadow: `0 0 0 2px ${vars.colors.backgroundSecondary}`,
})

// hover 
globalStyle('input[type=checkbox]:hover', {
  background: vars.colors.backgroundSecondary,
})

// hover & checked 
globalStyle('input[type=checkbox]:hover:checked', {
  background: vars.colors.green,
})



