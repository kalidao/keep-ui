import { useDynamicContext } from '@dynamic-labs/sdk-react'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Box,
  Button,
  Divider,
  Heading,
  IconArrowRight,
  IconDiscord,
  IconLink,
  IconTwitter,
  Input,
  Stack,
  Text,
  Textarea,
} from '@kalidao/reality'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import Back from './Back'
import { PostIt } from './PostIt'
import * as styles from './create.css'
import { CreateStore, useCreateStore } from './useCreateStore'
import { nameCheck } from './utils'

// namecheck takes an argument chainId to check if the name is taken on that chain
// the schema should accept a chainId argument and pass it to nameCheck
// make a function that takes a chainId and returns a schema
const schemaWithChainId = (chainId: number) => {
  return z.object({
    name: z
      .string()
      .trim()
      .min(1, { message: 'A name is required' })
      .max(50, { message: 'Name must be less than 50 characters' })
      .refine((val) => nameCheck(chainId, val), { message: 'Name is already taken' }),
    bio: z.string().max(160, { message: 'Bio must be less than 160 characters' }),
    twitter: z.union([z.string().url(), z.string().max(0)]).optional(),
    discord: z.union([z.string().url(), z.string().max(0)]).optional(),
    website: z.union([z.string().url(), z.string().max(0)]).optional(),
  })
}

export const Name = () => {
  const state = useCreateStore((state) => state)
  const { network } = useDynamicContext()
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
    resolver: async (data, context, options) => {
      const schema = schemaWithChainId(network ?? 137)
      // console.log('zod formData', data)
      // console.log('zod validation result', await zodResolver(schema)(data, context, options))
      return zodResolver(schema)(data, context, options)
    },
  })
  const { user } = useDynamicContext()

  const onSubmit = (data: CreateStore) => {
    const { name, bio, twitter, discord, website } = data

    state.setName(name)
    state.setBio(bio)
    twitter && state.setTwitter(twitter)
    discord && state.setDiscord(discord)
    website && state.setWebsite(website)

    if (user?.blockchainAccounts?.[0]?.address) {
      state.setSigners([{ address: user?.blockchainAccounts?.[0]?.address, ens: undefined }])
    }

    state.setView('signers')
  }

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
