import { getAuthToken } from '@dynamic-labs/sdk-react'
import { ethers } from 'ethers'
import { getUser } from '~/utils/user'

export const sendSign = async (txHash: string, signature: string, vote: boolean) => {
  const user = await getUser()

  if (!user) {
    throw new Error('You need to be logged in.')
  }

  const authToken = getAuthToken()

  if (!authToken) {
    throw new Error('You need to be logged in to sign this proposal')
  }

  const { v, r, s } = ethers.utils.splitSignature(signature)

  const body = {
    v: v,
    r: r,
    s: s,
    type: vote ? 'yes' : 'no',
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_KEEP_API}/txs/${txHash}/sign`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    },
    body: JSON.stringify(body),
  }).then((res) => {
    console.log('sendSign', res)
    if (res.status === 200) {
      return res
    } else {
      throw new Error('Something went wrong')
    }
  })

  const data = await response.json()
  return data
}

export type Status = 'pending' | 'process' | 'process_yes' | 'process_no' | 'executed'

export const prettierStatus = (status: Status) => {
  switch (status) {
    case 'pending':
      return 'Pending'
    case 'process':
      return 'Process'
    case 'process_yes':
      return 'Approved'
    case 'process_no':
      return 'Rejected'
    case 'executed':
      return 'Executed'
    default:
      return 'Unknown'
  }
}

type Tone = 'accent' | 'blue' | 'green' | 'secondary' | 'red' | 'orange' | 'purple' | 'pink' | 'violet'

export const prettierStatusColor = (status: Status): Tone => {
  switch (status) {
    case 'pending':
      return 'orange'
    case 'process':
      return 'blue'
    case 'process_yes':
      return 'green'
    case 'process_no':
      return 'red'
    case 'executed':
      return 'violet'
    default:
      return 'secondary'
  }
}
