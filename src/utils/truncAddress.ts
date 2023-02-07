export const truncAddress = (address: string) => {
  if (!address) return ''
  console.log('truncAddress', address)
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}
