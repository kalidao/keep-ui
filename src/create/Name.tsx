import { ChangeEvent, InputHTMLAttributes, useState } from 'react'
import { Card, Stack, Heading, Text, Button, IconArrowRight, IconArrowLeft, Input } from '@kalidao/reality'
import Back from './Back'
import { CreateProps } from './types'
import { ethers } from 'ethers'
import { useForm } from 'react-hook-form'
import { Store } from './types'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

const schema = z.object({
  name: z.string().trim().min(1, { message: 'A name is required' }).regex(new RegExp('^[a-zA-Z0-9_]*$'), {
    message: 'Name can only contain alphanumeric characters and underscores.',
  }),
})

export const Name = ({ store, setStore, setView }: CreateProps) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Store>({
    defaultValues: {
      name: store.name,
    },
    mode: 'onBlur',
    resolver: zodResolver(schema),
  })

  const onSubmit = (data: Store) => {
    const { name } = data

    setStore({
      ...store,
      name: name,
    })
    setView(2)
  }

  // TODO: Name needs to be unique per chain. Add check.
  return (
    <Stack>
      <Back setView={setView} to={0} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack align="flex-start" justify="space-between" space="10">
          <Input
            label="Name"
            description="This will be the on-chain name of your multi-sig."
            type="text"
            inputMode="text"
            {...register('name')}
            error={errors?.name && errors?.name?.message}
          />
          <Button suffix={<IconArrowRight />} width="full" type="submit">
            Next
          </Button>
        </Stack>
      </form>
    </Stack>
  )
}
