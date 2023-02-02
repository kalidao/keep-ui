import React, { useState } from 'react'

import { useRouter } from 'next/router'

import { zodResolver } from '@hookform/resolvers/zod'
import {
  Box,
  Button,
  Card,
  Divider,
  Field,
  Heading,
  IconArrowRight,
  IconCheck,
  IconClose,
  IconPlus,
  Input,
  Skeleton,
  SkeletonGroup,
  Spinner,
  Stack,
  Tag,
  Text,
} from '@kalidao/reality'
import { ethers } from 'ethers'
import { useFieldArray, useForm, useWatch } from 'react-hook-form'
import { useQuery } from 'wagmi'
import z from 'zod'
import { Signer } from '~/dashboard/Signers'
import { fetcher } from '~/utils'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '@design/Select'

import * as styles from './sendToken.css'
import { useSendStore } from './useSendStore'

const schema = z.object({
  transfers: z.array(
    z.object({
      token_address: z.string(),
      to: z.string(),
      amount: z.coerce.number(),
    }),
  ),
})

export const SendToken = () => {
  const router = useRouter()
  const { chainId, keep } = router.query
  const {
    data: treasury,
    isLoading,
    isError,
  } = useQuery(
    ['keep', 'nfts', keep, chainId],
    async () => {
      const data = await fetcher(`${process.env.NEXT_PUBLIC_KEEP_API}/keeps/${chainId}/${keep}/treasury`)
      return data
    },
    {
      enabled: !!chainId && !!keep,
    },
  )
  const tx = useSendStore((state) => state)
  const tokens = treasury?.items.filter((item: any) => ethers.BigNumber.from(item.balance).gt(ethers.BigNumber.from(0)))
  // set up react-hook-form and zod with field array
  const { register, handleSubmit, watch, formState, setValue, control } = useForm({
    mode: 'onBlur',
    resolver: zodResolver(schema),
  })
  const { fields, append, remove } = useFieldArray({
    name: 'transfers',
    control,
  })
  const watchedTransfers = useWatch({
    name: 'transfers',
    control,
  })

  const onSubmit = (data: any) => {
    console.log('submit', data)
    // if amount != 0, add to send store
    const transfers = data.transfers.filter((transfer: any) => {
      return (
        ethers.BigNumber.from(transfer.amount).gt(ethers.BigNumber.from(0)) &&
        transfer.to !== '' &&
        transfer.token_address !== ''
      )
    })

    // overwrite send store
    tx.setSendToken([...transfers])
  }

  console.log('tokens', tokens)

  console.log('submit', tx.send_token)

  if (isLoading) {
    return (
      <Card padding="6">
        <Stack>
          <Heading level="2">Send Token</Heading>
          <Divider />
          <Spinner />
        </Stack>
      </Card>
    )
  }

  if (isError) {
    return (
      <Card padding="6">
        <Stack>
          <Heading level="2">Send Token</Heading>
          <Divider />
          <Text>
            Something went wrong. Please try again. Contact us on our{' '}
            <a href="https://discord.gg/qWVRw4StaC" target="_blank" rel="noreferrer noopenner">
              Discord
            </a>{' '}
            if this problem persists.
          </Text>
        </Stack>
      </Card>
    )
  }

  if (tokens?.length === 0) {
    return (
      <Card padding="6">
        <Stack>
          <Heading level="2">Send Token</Heading>
          <Divider />
          <Text>We were not able to find any tokens in this Keep.</Text>
        </Stack>
      </Card>
    )
  }
  return (
    <Card padding="6">
      <Stack>
        <Heading level="2">Send Token</Heading>
        <Divider />
        <Box display={'flex'} width="full" gap="5" as="form" onSubmit={handleSubmit(onSubmit)}>
          <Box width="1/3" padding="6" display="flex" flexDirection={'column'} gap="2">
            {fields.map((field, index) => {
              // return only the last index
              if (index === fields.length - 1) {
                return (
                  <Box key={index}>
                    <Box
                      width="full"
                      key={field.id}
                      display="flex"
                      flexDirection="column"
                      alignItems="center"
                      justifyContent={'flex-start'}
                      gap="5"
                    >
                      <Field label="Token">
                        <Select
                          onValueChange={(value: string) => {
                            console.log('value', value)
                            setValue(`transfers.${index}.token_address`, value)
                          }}
                        >
                          <SelectTrigger {...register(`transfers.${index}.token_address` as const)}>
                            <SelectValue placeholder="Select Token" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {tokens?.map((token: any) => (
                                <SelectItem key={token.contract_address} value={token.contract_address}>
                                  {token.contract_ticker_symbol}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </Field>
                      <Input label="Amount" {...register(`transfers.${index}.amount`)} placeholder="Amount" />
                      <Input label="Recipient" {...register(`transfers.${index}.to`)} placeholder="Recipient" />
                    </Box>
                  </Box>
                )
              }
              return null
            })}
            <Button
              size="medium"
              variant="secondary"
              suffix={<IconPlus />}
              onClick={() => {
                append({ token_address: '', to: '', amount: 0 })
              }}
            >
              Add
            </Button>
          </Box>
          <Box as="span" width="0.5" backgroundColor={'foregroundSecondary'}></Box>
          <Box width="2/3" padding="3" display="flex" flexDirection={'column'} gap="3">
            <Box
              display="flex"
              alignItems={'center'}
              justifyContent="space-between"
              width="full"
              flexDirection={'row'}
              gap="2"
              marginLeft="-1.5"
            >
              <Text size="label" color="textSecondary">
                Token
              </Text>
              <Text size="label" color="textSecondary">
                Amount
              </Text>
              <Text size="label" color="textSecondary">
                Recipient
              </Text>
            </Box>
            <Divider />
            {watchedTransfers?.length > 1 &&
              watchedTransfers?.map((transfer: any, index: number) => {
                if (index === watchedTransfers.length - 1) return null
                return (
                  <>
                    <Box key={index} display="flex" gap="3">
                      <Box
                        key={index}
                        display="flex"
                        alignItems={'center'}
                        justifyContent="space-between"
                        width="full"
                        flexDirection={'row'}
                        gap="2"
                      >
                        <Stack direction={'horizontal'} align="center" justify={'center'}>
                          <img
                            src={
                              tokens?.find((token: any) => token.contract_address === transfer.token_address)?.logo_url
                            }
                            alt="token"
                            height={30}
                            width={30}
                          />
                          <Text size="small" color="foreground">
                            {/* find token name from contract_address */}

                            {
                              tokens?.find((token: any) => token.contract_address === transfer.token_address)
                                ?.contract_ticker_symbol
                            }
                          </Text>
                        </Stack>
                        <Text size="small" color="foreground">
                          {transfer.amount}
                        </Text>
                        <Signer signer={transfer.to} />
                      </Box>
                      <Button
                        shape="circle"
                        variant="secondary"
                        tone="red"
                        size="small"
                        type="button"
                        onClick={() => {
                          remove(index)
                        }}
                      >
                        <IconClose />
                      </Button>
                    </Box>
                    {/* Divider except if last  */}
                    {index !== watchedTransfers.length - 2 && <Divider />}
                  </>
                )
              })}
          </Box>
        </Box>
      </Stack>
    </Card>
  )
}
