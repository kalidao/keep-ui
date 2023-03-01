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
