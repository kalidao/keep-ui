import React from 'react'
import { useState } from 'react'

import { Box, Button } from '@kalidao/reality'
import { JSONContent } from '@tiptap/react'

import Editor from '~/components/Editor'

import toast from '@design/Toast'

import { editComment } from './utils'

export const EditComment = ({ comment, callback }: { comment: any; callback: () => void }) => {
  const [content, setContent] = useState<JSONContent>(comment.content)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    await editComment(comment.id, content)
      .then(() => {
        callback()
      })
      .catch((err) => {
        toast('error', 'Something went wrong')
      })
      .finally(() => {
        setLoading(false)
        setContent(comment.content)
      })
  }

  return (
    <Box as="form" display="flex" flexDirection={'column'} gap="1" disabled={loading} onSubmit={handleSubmit}>
      <Editor content={content} setContent={setContent} placeholder="" />
      <Button size="small" tone="green" variant="secondary" type="submit" disabled={loading}>
        Save
      </Button>
    </Box>
  )
}
