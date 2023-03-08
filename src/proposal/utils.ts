import { getAuthToken } from '@dynamic-labs/sdk-react'
import { ethers } from 'ethers'
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
  try {
    const authToken = getAuthToken()

    if (!authToken) {
      toast('error', 'You need to be logged in to sign this proposal')
      return
    }

    const user = getUser()

    if (!user) {
      toast('error', 'You need to be logged in to sign this proposal')
      return
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
      user?.blockchainAccounts?.[0]?.address,
    )

    if (!sign) {
      toast('error', 'Something went wrong, please try again later.')
      return
    }

    const { v, r, s } = ethers.utils.splitSignature(sign)
    const body = {
      v: v,
      r: r,
      s: s,
      type: vote ? 'yes' : 'no',
    }

    await sendSign(tx.hash, body)
  } catch (error) {
    console.error(error)
  }
}

export const sendSign = async (txHash: string, body: any) => {
  try {
    const authToken = await getAuthToken()

    if (!authToken) {
      toast('error', 'You need to be logged in to sign this proposal')
      return
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
        toast('success', 'Proposal signed successfully')
      } else {
        toast('error', 'Something went wrong')
      }
      return res
    })
    const data = await response.json()
    return data
  } catch (error) {
    return error
  }
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
