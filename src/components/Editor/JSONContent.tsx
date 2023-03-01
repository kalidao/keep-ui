import { useMemo } from 'react'

import { Box } from '@kalidao/reality'
import Emoji from '@tiptap-pro/extension-emoji'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import { generateHTML } from '@tiptap/html'
import { JSONContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

import suggestion from './suggestion'

export const JSONContentRenderer = ({ content }: { content: JSONContent }) => {
  const output = useMemo(() => {
    return generateHTML(content, [
      StarterKit.configure(),
      Emoji.configure({
        suggestion,
      }),
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
    ])
  }, [content])

  return <Box color="text" dangerouslySetInnerHTML={{ __html: output }} />
}
