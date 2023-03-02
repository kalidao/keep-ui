import Emoji from '@tiptap-pro/extension-emoji'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import Placeholder from '@tiptap/extension-placeholder'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import StarterKit from '@tiptap/starter-kit'
import ts from 'highlight.js/lib/languages/typescript'
import { lowlight } from 'lowlight/lib/core'

import suggestion from './suggestion'

lowlight.registerLanguage('ts', ts)

export const getExtensions = (placeholder: string) => {
  return [
    Emoji.configure({
      suggestion,
    }),
    Placeholder.configure({
      placeholder: placeholder,
    }),
    TaskList,
    TaskItem.configure({
      nested: true,
    }),
    CodeBlockLowlight.configure({
      lowlight,
      defaultLanguage: 'solidity',
    }),
  ]
}
