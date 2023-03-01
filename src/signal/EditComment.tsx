import React from 'react'
import { useState } from 'react'

import { Box, Button } from '@kalidao/reality'
import { JSONContent } from '@tiptap/react'

import Editor from '~/components/Editor'

import { editComment } from './utils'

export const EditComment = ({ comment, callback }: { comment: any; callback: () => void }) => {
  const [content, setContent] = useState<JSONContent>(comment.content)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('content', content)
    await editComment(comment.id, content)
      .then(() => {
        callback()
      })
      .finally(() => {
        setContent(comment.content)
      })
  }

  return (
    <Box as="form" display="flex" flexDirection={'column'} gap="1" onSubmit={handleSubmit}>
      <Editor content={content} setContent={setContent} placeholder="" />
      <Button size="small" tone="green" variant="secondary" type="submit">
        Save
      </Button>
    </Box>
  )
}
