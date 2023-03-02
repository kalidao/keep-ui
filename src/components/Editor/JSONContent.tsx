import { useMemo } from 'react'

import { Box } from '@kalidao/reality'
import { generateHTML } from '@tiptap/html'
import { JSONContent } from '@tiptap/react'

import { getExtensions } from './getExtensions'

export const JSONContentRenderer = ({ content }: { content: JSONContent }) => {
  const output = useMemo(() => {
    try {
      return generateHTML(content, getExtensions('Say something...')) || null
    } catch (error) {
      console.error(error)
      return null
    }
  }, [content])

  if (!output) {
    return null
  }
  
  return (
    <Box
      color="text"
      lineHeight={'normal'}
      fontSize="base"
      fontFamily="sans"
      fontWeight={'medium'}
      dangerouslySetInnerHTML={{ __html: output }}
    />
  )
}
