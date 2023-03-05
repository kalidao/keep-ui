import { Box, Field, Input } from '@kalidao/reality'
import { JSONContent } from '@tiptap/core'
import { useFormContext, useWatch } from 'react-hook-form'

import Editor from '~/components/Editor'

import { Action } from './tx/Action'
import { Toolbox } from './tx/Toolbox'

export const ProposeForm = () => {
  const {
    register,
    setValue,
    control,
    formState: { errors },
  } = useFormContext()
  const watchedContent = useWatch({
    control,
    name: 'content',
  })

  return (
    <Box
      width="full"
      display="flex"
      flexDirection={'column'}
      gap={{
        xs: '2',
        lg: '3',
      }}
      alignItems={{
        xs: 'center',
        lg: 'flex-start',
      }}
      justifyContent={{
        xs: 'center',
        lg: 'flex-start',
      }}
    >
      <Input
        label="Title"
        description=""
        placeholder="Title"
        width={{
          xs: '3/4',
          lg: 'full',
        }}
        error={errors?.title ? <>{errors?.title?.message}</> : null}
        {...register('title')}
      />
      <Field
        label="Description"
        description=""
        width={{
          xs: '3/4',
          lg: 'full',
        }}
        error={errors?.content ? <>{errors?.content?.message}</> : null}
      >
        <Editor
          placeholder="Say something"
          content={watchedContent}
          setContent={(content: JSONContent) => {
            setValue('content', content)
          }}
        />
      </Field>
      <Toolbox />
      <Action />
    </Box>
  )
}
