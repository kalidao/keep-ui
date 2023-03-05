import { useRouter } from 'next/router'

import { getAuthToken, useDynamicContext } from '@dynamic-labs/sdk-react'
import { Button, IconTrash, Skeleton } from '@kalidao/reality'
import { useGetSignal } from '~/hooks/useGetSignal'
import { getUser } from '~/utils/user'

import toast from '@design/Toast'

const deleteSignal = async (id: string) => {
  const authToken = getAuthToken()

  if (!authToken) {
    toast('error', 'You need to be logged in')
    return
  }

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_KEEP_API}/signals/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
    })
    if (res.status === 200) {
      toast('success', 'Signal deleted')
    }
    return true
  } catch (error) {
    toast('error', 'Error deleting signal')
    return false
  }
}

export const DeleteSignal = () => {
  const router = useRouter()
  const { chainId, keep, signalId: id } = router.query
  const { data, isLoading, isError } = useGetSignal(id as string)
  const { user } = useDynamicContext()

  if (isLoading) return null

  if (isError) return null

  if (data.userId === user?.walletPublicKey?.toLowerCase())
    return (
      <Button
        variant="secondary"
        shape="circle"
        tone="red"
        size="small"
        onClick={() =>
          deleteSignal(id as string).then((res) => {
            if (res) router.push(`/${chainId}/${keep}`)
          })
        }
      >
        {<IconTrash />}
      </Button>
    )

  return null
}
