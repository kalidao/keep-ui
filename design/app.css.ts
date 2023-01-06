import { globalStyle, globalFontFace } from '@vanilla-extract/css'
import { vars } from '@kalidao/reality'

globalStyle('html, body', {
  margin: 0,
  padding: 0,
  background: vars.colors.background,
})

export const serif = "'Bodoni Moda', serif"

globalFontFace(serif, {
  src: 'local("https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400;0,6..96,500;0,6..96,600;0,6..96,700;0,6..96,800;0,6..96,900;1,6..96,400;1,6..96,500;1,6..96,600;1,6..96,700;1,6..96,800;1,6..96,900&display=swap")',
})
