export const fetcher = async (url: string) => {
  const res = await fetch(url)
  if (!res.ok) return Promise.reject(new Error('Failed to fetch'))
  const data = await res.json()
  return data
}
