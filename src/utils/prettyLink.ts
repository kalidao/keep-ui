export const prettyLink = (link: string) => {
  const url = new URL(link)
  const hostname = url.hostname
  const domain = hostname.split('.').slice(-2).join('.')
  return domain
}

export const getTwitterUsername = (url: string) => {
  const username = url.split('/').pop()
  return username
}
