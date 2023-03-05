import Emoji from '@tiptap-pro/extension-emoji'
import Blockquote from '@tiptap/extension-blockquote'
import Bold from '@tiptap/extension-bold'
import BulletList from '@tiptap/extension-bullet-list'
import Code from '@tiptap/extension-code'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import Document from '@tiptap/extension-document'
import Dropcursor from '@tiptap/extension-dropcursor'
import Gapcursor from '@tiptap/extension-gapcursor'
import HardBreak from '@tiptap/extension-hard-break'
import Heading from '@tiptap/extension-heading'
import History from '@tiptap/extension-history'
import HorizntalRule from '@tiptap/extension-horizontal-rule'
import Italic from '@tiptap/extension-italic'
import ListItem from '@tiptap/extension-list-item'
import OrderedList from '@tiptap/extension-ordered-list'
import Paragraph from '@tiptap/extension-paragraph'
import Placeholder from '@tiptap/extension-placeholder'
import Strike from '@tiptap/extension-strike'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import Text from '@tiptap/extension-text'
import ts from 'highlight.js/lib/languages/typescript'
import { lowlight } from 'lowlight/lib/core'

import suggestion from './suggestion'

lowlight.registerLanguage('ts', ts)

export const getExtensions = (placeholder: string) => {
  return [
    // StarterKit extensions
    Blockquote,
    BulletList,
    Document,
    HardBreak,
    Heading,
    HorizntalRule,
    ListItem,
    OrderedList,
    Paragraph,
    Text,
    Bold,
    Code,
    Italic,
    Strike,
    Dropcursor,
    Gapcursor,
    History,

    // Additional extensions
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
