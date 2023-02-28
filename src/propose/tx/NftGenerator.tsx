import { Button, Divider, Heading, IconClose, Input, MediaPicker, Stack } from '@kalidao/reality'
import { useFieldArray, useForm } from 'react-hook-form'

export const NftGenerator = () => {
  // react hook form
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    control,
  } = useForm()
  // useFieldArray for attributes
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: 'attributes', // unique name for your Field Array
  })

  return (
    <Stack>
      <Heading>NFT Generator</Heading>
      <Divider />
      <MediaPicker label="Image" />
      <Input label="Name" />
      <Input label="Description" />
      <Input label="External Link" />
      <Divider />
      <Heading>Attributes</Heading>
      {fields.map((field, index) => {
        return (
          <Stack key={field.id} direction="horizontal" align="center" justify={'stretch'}>
            <Input label="Attribute Name" />
            <Input label="Attribute Value" />
            <Button onClick={() => remove(index)} size="small" shape="circle" variant="secondary" tone="red">
              <IconClose />
            </Button>
          </Stack>
        )
      })}
      <Button onClick={() => append({})}>Add Attribute</Button>
    </Stack>
  )
}
