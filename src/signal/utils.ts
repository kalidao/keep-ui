import { getAuthToken } from '@dynamic-labs/sdk-react'

import toast from '@design/Toast'

export const vote = async (signalId: string, vote: boolean) => {
  try {
    const authToken = getAuthToken()

    if (!authToken) {
      throw new Error('Unauthorized')
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_KEEP_API}/signals/${signalId}/sign`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        vote: vote == true ? 'yes' : 'no',
      }),
    })
    if (response.status === 200) {
      toast('success', 'Voted! 💌')
    } else {
      throw new Error('Failed')
    }
  } catch (e) {
    console.error(e)
    toast('error', 'Something went wrong. Please try again.')
  }
}
