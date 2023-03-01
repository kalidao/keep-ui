import { useMemo } from 'react'

import { Box } from '@kalidao/reality'
import { generateHTML } from '@tiptap/html'
import { JSONContent } from '@tiptap/react'

import { getExtensions } from './getExtensions'

export const JSONContentRenderer = ({ content }: { content: JSONContent }) => {
  const output = useMemo(() => {
    return generateHTML(content, getExtensions('Say something...'))
  }, [content])

  return <Box dangerouslySetInnerHTML={{ __html: output }} />
}
