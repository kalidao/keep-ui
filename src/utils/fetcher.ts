export const fetcher = async (url: string) => {
  const res = await fetch(url)
  if (!res.ok) throw new Error('Error fetching data')
  const data = await res.json()
  return data
}
