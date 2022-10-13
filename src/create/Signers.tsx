import { useState } from 'react'
import { Text, Stack, Input, Button, IconArrowRight, IconPlus, IconClose, Box } from '@kalidao/reality'
import { CreateProps, Store } from './types'
import { useForm, useFieldArray, useWatch } from 'react-hook-form'
import Back from './Back'

export const Signers = ({ store, setStore, setView }: CreateProps) => {
  const [error, setError] = useState<string>()
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Store>({
    defaultValues: {
      signers: store.signers,
      threshold: store.threshold,
    },
    mode: 'onBlur',
  })
  const { fields, append, remove } = useFieldArray({
    name: 'signers',
    control,
  })
  const watchedSigners = useWatch({
    name: 'signers',
    control,
  })

  const onSubmit = (data: Store) => {
    const { signers, threshold } = data

    setStore({
      ...store,
      signers: signers,
      threshold: threshold,
    })

    setView(3)
  }
  console.log('signers', watchedSigners)
  const maxSigners = 9
  const addSigner = () => {
    if (watchedSigners.length < maxSigners) {
      // current max support
      append({
        address: '',
      })
    } else {
      setError(`You can only add ${maxSigners} signers at formation currently.`)
    }
  }
  // TODO: Same address error
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack>
        <Back setView={setView} to={1} />
        <Stack>
          <Box marginLeft={'3'} color="textSecondary" fontWeight="bold">
            Signers
          </Box>
          {fields.map((field, index) => {
            return (
              <Stack key={field.id} direction="horizontal" align="center">
                <Input
                  width="full"
                  label="Signer"
                  hideLabel
                  placeholder="0x"
                  {...register(`signers.${index}.address` as const, {
                    required: true,
                  })}
                  error={errors?.signers?.[index]?.address && errors?.signers?.[index]?.address?.message}
                />
                <Button
                  shape="circle"
                  variant="secondary"
                  tone="red"
                  size="small"
                  type="button"
                  onClick={() => {
                    if (index < maxSigners) setError('')
                    remove(index)
                  }}
                >
                  <IconClose />
                </Button>
              </Stack>
            )
          })}
          <Button prefix={<IconPlus />} type="button" tone="green" variant="secondary" onClick={addSigner}>
            Add Signer
          </Button>
        </Stack>
        <Text color="red">{error}</Text>
        <Input
          label="Threshold"
          description="The number of signers required for a transaction to pass."
          type="number"
          inputMode="numeric"
          min="1"
          max={watchedSigners.length}
          error={errors?.threshold && errors?.threshold?.message}
          {...register(`threshold`, {
            required: true,
            max: watchedSigners.length,
          })}
        />
        <Button suffix={<IconArrowRight />} width="full" type="submit">
          Next
        </Button>
      </Stack>
    </form>
  )
}
