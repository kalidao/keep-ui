import { useState } from 'react'

import { Box, Button } from '@kalidao/reality'
import { JSONContent } from '@tiptap/react'

import Editor from '~/components/Editor'

import toast from '@design/Toast'

import { CommentHome } from './types'
import { createComment } from './utils'

export const CreateComment = ({
  home,
  signalId,
  txId,
  parentId,
  refetch,
}: {
  home: CommentHome
  txId?: string
  signalId?: string
  parentId?: string
  refetch?: () => void
}) => {
  const [content, setContent] = useState<JSONContent>()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    if (!content) {
      toast('error', `Comment cannot be empty`)
      return
    }

    await createComment({ home, signalId, txId, parentId, content }).then(() => {
      refetch?.()
      setContent(undefined)
      setLoading(false)
    })
  }

  return (
    <Box as="form" display="flex" flexDirection={'column'} gap="2" onSubmit={handleSubmit}>
      <Editor placeholder="What do you think?" content={content || {}} setContent={setContent} />
      <Button variant="secondary" disabled={!content || loading} type="submit">
        Comment
      </Button>
    </Box>
  )
}
