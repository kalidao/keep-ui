export const getUser = () => {
  const user = localStorage.getItem('dynamic_authenticated_user')

  if (user) {
    return JSON.parse(user)
  } else {
    return null
  }
}
