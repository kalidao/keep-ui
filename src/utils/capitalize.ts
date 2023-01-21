export const capitalize = (str: string) => {
  if (typeof str !== 'string') return ''
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}
