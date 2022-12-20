import { ChangeEvent, InputHTMLAttributes, useState } from 'react'
import { Card, Box, Stack, Heading, Text, IconDiscord, IconTwitter, IconLink, Button, IconArrowRight, IconArrowLeft, Input, Textarea, MediaPicker, FieldSet } from '@kalidao/reality'
import Back from './Back'
import { CreateProps } from './types'
import { ethers } from 'ethers'
import { useForm } from 'react-hook-form'
import { Store } from './types'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

const schema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: 'A name is required' })
    .max(69, { message: 'Name must be less than 69 characters' }),
})

export const Name = ({ store, setStore, setView }: CreateProps) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setValue
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
    <Box display={"flex"} flexDirection="column" gap="5" as="form" height="full" width="full" onSubmit={handleSubmit(onSubmit)}>
        <Back setView={setView} to={0} />
            <Input
              label="Name"
              description="This will be the on-chain name of your multi-sig."
              type="text"
              inputMode="text"
              {...register('name')}
              error={errors?.name && errors?.name?.message}
            />
            <Textarea 
              label="Bio"
              description="This will be the on-chain bio of your multi-sig."
              {...register('bio')}
              error={errors?.bio && errors?.bio?.message}
            />
            <MediaPicker accept="image/jpeg, image/png, image/webp" label="Avatar" compact onChange={(file: File) => setValue("avatar", file)} />
            <FieldSet legend="Social" >
              <Input
                label="Twitter"
                hideLabel
                {...register('twitter')}
                prefix={<IconTwitter />}
                error={errors?.twitter && errors?.twitter?.message}
              />
              <Input
                label="Discord"
                prefix={<IconDiscord />}
                hideLabel
                {...register('discord')}
                error={errors?.discord && errors?.discord?.message}
              />
              <Input
                label="Website"
                hideLabel
                prefix={<IconLink />}
                {...register('website')}
                error={errors?.website && errors?.website?.message}
              />
            </FieldSet>
            <Button suffix={<IconArrowRight />} width="full" type="submit">
              Next
            </Button>
    </Box>
  )
}
