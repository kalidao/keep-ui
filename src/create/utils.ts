import { SetupSchema } from './types'

export const nameCheck = async (chainId: number, name: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_KEEP_API}/keeps/names?chainId=${chainId}`)

  const names = await res.json()

  if (names.includes(name)) {
    return false
  } else {
    return true
  }
}

export const requestSetup = async (body: SetupSchema) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_KEEP_API}/keeps/setup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    const data = await res.json()
    if (res.status === 200) {
      return true
    } else {
      throw new Error('Error setting up Keep')
    }
  } catch (e) {
    throw new Error('Error setting up Keep')
  }
}
