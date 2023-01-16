import ColorThief from 'colorthief'

export const getDominantColor = async (data: string) => {
  const image = await createImage(data)
  // get dominant color
  const colorThief = new ColorThief()

  const rgb = await colorThief.getColor(image)

  // convert rgb to hex
  const hex = rgbToHex(rgb[0], rgb[1], rgb[2])

  return `#${hex}`
}

// convert rgb to hex
export const rgbToHex = (r: number, g: number, b: number) => {
  const bin = (r << 16) | (g << 8) | b
  return (function (h) {
    return new Array(7 - h.length).join('0') + h
  })(bin.toString(16).toUpperCase())
}

// create html image element using image data using canvas api
export const createImage = async (data: string) => {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  const img = new Image()

  img.src = data

  canvas.width = img.width
  canvas.height = img.height

  if (!ctx) throw new Error('Canvas context is null')

  await ctx.drawImage(img, 0, 0)

  console.log('image', img)

  return img
}
