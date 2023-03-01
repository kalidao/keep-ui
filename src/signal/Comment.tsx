import { useState } from 'react'

import { useDynamicContext } from '@dynamic-labs/sdk-react'
import { Box, Button } from '@kalidao/reality'
import { JSONContent } from '@tiptap/react'

import Editor from '~/components/Editor'

import toast from '@design/Toast'

import { commentOnSignal } from './commentOnSignal'

export const Comment = ({
  signalId,
  parentId,
  refetch,
}: {
  signalId: string
  parentId?: string
  refetch?: () => void
}) => {
  const [comment, setComment] = useState<JSONContent>()
  const { authToken, setShowAuthFlow } = useDynamicContext()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('comment', comment)
    if (!comment) {
      toast('error', `Comment cannot be empty`)
      return
    }
    if (!authToken) {
      toast('error', `Please connect and sign with wallet to comment!`)
      setShowAuthFlow(true)
      return
    }
    // signalId
    // authToken
    await commentOnSignal(signalId.toString(), comment, authToken, parentId).then(() => {
      refetch?.()
    })
  }

  return (
    <Box as="form" display="flex" flexDirection={'column'} gap="2" onSubmit={handleSubmit}>
      <Editor setContent={setComment} />
      <Button variant="secondary" disabled={!comment} type="submit">
        Comment
      </Button>
    </Box>
  )
}
