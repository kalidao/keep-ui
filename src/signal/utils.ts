import toast from '@design/Toast'

export const vote = async (signalId: string, userId: string, vote: boolean, authToken: string) => {
  await fetch(`${process.env.NEXT_PUBLIC_KEEP_API}/signals/${signalId}/sign`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    },
    body: JSON.stringify({
      user: userId,
      vote: vote == true ? 'yes' : 'no',
    }),
  })
    .then((res) => {
      if (res.status === 200) {
        toast('success', 'Voted! 💌')
      } else {
        res.json().then((data) => {
          toast('error', `Error: ${data.error.name}`)
        })
      }
    })
    .catch((e) => {
      console.error(e)
      toast('error', 'Something went wrong. Please try again.')
    })
}
