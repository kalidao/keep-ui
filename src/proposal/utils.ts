import { getAuthToken } from '@dynamic-labs/sdk-react'
import { ethers, Signer } from 'ethers'
import { tryTypedSigningV4 } from '~/utils/sign'
import { toOp } from '~/utils/toOp'
import { getUser } from '~/utils/user'

import toast from '@design/Toast'

export const signAndSend = async (
  keep: {
    chainId: number
    address: string
  },
  tx: {
    op: 'call' | 'delegatecall' | 'create'
    to: string
    value: string
    data: string
    nonce: number
    hash: string
  },
  vote: boolean,
) => {
    const authToken = getAuthToken()

    if (!authToken) {
      throw new Error('You need to be logged in to sign this proposal')
    }

    const userAddress = getUser()

    if (!userAddress) {
      throw new Error ('You need to be logged in.')
    }

    const sign = await tryTypedSigningV4(
      keep,
      {
        op: toOp(tx.op),
        to: tx.to,
        value: tx.value,
        data: tx.data,
        nonce: tx.nonce,
      },
      userAddress
    )

    if (!sign) {
      throw new Error('Something went wrong, please try again later.')
    }

    const { v, r, s } = ethers.utils.splitSignature(sign)
    const body = {
      v: v,
      r: r,
      s: s,
      type: vote ? 'yes' : 'no',
    }

    await sendSign(tx.hash, body)
}

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
      type: vote ? 'yes' : 'no'
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_KEEP_API}/txs/${txHash}/sign`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(body),
    }).then((res) => {
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
