import {
  Box,
  Button,
  Stack,
  IconArrowRight,
  Input,
  Text,
  Heading,
  Textarea,
  Divider,
  FieldSet,
  IconTwitter,
  IconDiscord,
  IconLink,
} from '@kalidao/reality'
import Back from './Back'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import * as styles from './create.css'
import { useDynamicContext } from '@dynamic-labs/sdk-react'
import { CreateStore, useCreateStore } from './useCreateStore'
import { PostIt } from './PostIt'

const schema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: 'A name is required' })
    .max(69, { message: 'Name must be less than 69 characters' }),
  bio: z.string().max(420, { message: 'Bio must be less than 420 characters' }),
})

export const Name = () => {
  const state = useCreateStore((state) => state)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateStore>({
    defaultValues: {
      name: state.name,
      bio: state.bio,
      twitter: state.twitter,
      discord: state.discord,
      website: state.website,
    },
    mode: 'onBlur',
    resolver: zodResolver(schema),
  })
  const { connectedWallets } = useDynamicContext()

  const onSubmit = (data: CreateStore) => {
    const { name, bio, twitter, discord, website } = data

    state.setName(name)
    state.setBio(bio)
    twitter && state.setTwitter(twitter)
    discord && state.setDiscord(discord)
    website && state.setWebsite(website)

    if (connectedWallets.length > 0) {
      state.setName(name)
      state.setBio(bio)
      state.setSigners([{ address: connectedWallets[0].address }])
    }

    state.setView('signers')
  }

  // TODO: Name needs to be unique per chain. Add check.
  return (
    <Box className={styles.shell} as="form" onSubmit={handleSubmit(onSubmit)}>
      <Stack direction={'horizontal'}>
        <Stack>
          <Stack direction={'horizontal'}>
            <Back setView={state.setView} to={'type'} />
            <Heading level="2">Identity</Heading>
          </Stack>
          <Divider />
          <Box className={styles.form}>
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
              description="This will be description for signer NFTs."
              {...register('bio')}
              error={errors?.bio && errors?.bio?.message}
            />
            <Divider />
            {/* fieldset for social links - twitter, discord, website */}
            <Text size="headingTwo">
              <strong>Socials</strong>
            </Text>
            <Input
              label="Twitter"
              width={'full'}
              type="text"
              inputMode="text"
              {...register('twitter')}
              prefix={<IconTwitter />}
              hideLabel
              error={errors?.twitter && errors?.twitter?.message}
            />
            <Input
              label="Discord"
              width={'full'}
              type="text"
              inputMode="text"
              {...register('discord')}
              prefix={<IconDiscord />}
              hideLabel
              error={errors?.discord && errors?.discord?.message}
            />
            <Input
              label="Website"
              width={'full'}
              type="text"
              inputMode="text"
              {...register('website')}
              prefix={<IconLink />}
              hideLabel
              error={errors?.website && errors?.website?.message}
            />

            <Button suffix={<IconArrowRight />} width="full" type="submit">
              Next
            </Button>
          </Box>
        </Stack>
        <Stack>
          <PostIt title={'What is a multisig?'}>
            <Text>
              A multisig is a group wallet that requires multiple signers to authorize transactions. You can create a
              multisig with any number of signers, but the more signers you add, the more secure your wallet will be.
            </Text>
          </PostIt>
        </Stack>
      </Stack>
    </Box>
  )
}
