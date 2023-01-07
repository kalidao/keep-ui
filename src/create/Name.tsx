import {
  Box,
  IconDiscord,
  IconTwitter,
  IconLink,
  Button,
  IconArrowRight,
  Input,
  Textarea,
  MediaPicker,
  FieldSet,
} from '@kalidao/reality'
import Back from './Back'
import { CreateProps } from './types'
import { useForm } from 'react-hook-form'
import { Store } from './types'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import * as styles from './create.css'
import { useDynamicContext } from '@dynamic-labs/sdk-react'

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
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<Store>({
    defaultValues: {
      name: store.name,
    },
    mode: 'onBlur',
    resolver: zodResolver(schema),
  })
  const { connectedWallets } = useDynamicContext()

  const onSubmit = (data: Store) => {
    const { name } = data

    if (connectedWallets.length === 0) {
      setStore({
        ...store,
        name: name,
      })
    }

    if (connectedWallets.length > 0) {
      setStore({
        ...store,
        name: name,
        signers: [
          {
            address: connectedWallets[0].address,
          },
        ],
      })
    }

    setView(2)
  }

  // TODO: Name needs to be unique per chain. Add check.
  return (
    <Box className={styles.container} as="form" onSubmit={handleSubmit(onSubmit)}>
      <Back setView={setView} to={0} />
      <Input
        label="Name"
        description="This will be the on-chain name of your multisig."
        type="text"
        inputMode="text"
        {...register('name')}
        error={errors?.name && errors?.name?.message}
      />
      <Textarea
        label="Bio"
        description="This will be the on-chain bio of your multisig."
        {...register('bio')}
        error={errors?.bio && errors?.bio?.message}
      />
      <Button suffix={<IconArrowRight />} width="full" type="submit">
        Next
      </Button>
    </Box>
  )
}
