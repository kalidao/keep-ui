export const nameCheck = async (chainId: number, name: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_KEEP_API}/keeps/names?chainId=${chainId}`)

  const names = await res.json()

  if (names.includes(name)) {
    return false
  } else {
    return true
  }
}
