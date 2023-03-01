import { useMemo } from 'react'

import { Box } from '@kalidao/reality'
import Emoji from '@tiptap-pro/extension-emoji'
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
    ])
  }, [content])

  return <Box color="text" dangerouslySetInnerHTML={{ __html: output }} />
}
