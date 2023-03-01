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

globalStyle('pre > code', {
  display: 'block',
  padding: '1rem',
  background: vars.colors.backgroundSecondary,
  color: vars.colors.text,
  borderRadius: '0.5rem',
  overflow: 'auto',
})
