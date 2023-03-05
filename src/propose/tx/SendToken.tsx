import React from 'react'

import { useRouter } from 'next/router'

import { zodResolver } from '@hookform/resolvers/zod'
import {
  Avatar,
  Box,
  Button,
  Card,
  Divider,
  Field,
  Heading,
  IconClose,
  IconPlus,
  Input,
  Spinner,
  Stack,
  Text,
} from '@kalidao/reality'
import { useAccountBalance } from 'ankr-react'
import { ethers } from 'ethers'
import { useFieldArray, useForm, useFormContext, useWatch } from 'react-hook-form'
import { erc20ABI, useQuery } from 'wagmi'
import z from 'zod'
import { KEEP_ABI } from '~/constants'
import { Signer } from '~/dashboard/Signers'
import { useKeepStore } from '~/dashboard/useKeepStore'
import { getBlockchainByChainId } from '~/utils/ankr'

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@design/Select'

import { SendTokenProps } from '../types'
import { useSendStore } from './useSendStore'

export const SendToken = () => {
  const keep = useKeepStore((state) => state)
  const tx = useSendStore((state) => state)
  const { data, error } = useAccountBalance({
    blockchain: keep.chainId ? getBlockchainByChainId(keep.chainId) : 'polygon',
    walletAddress: keep.address ? keep.address : ethers.constants.AddressZero,
  })
  const tokens = data ? data.assets : null

  // set up react-hook-form and zod with field array
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useFormContext<SendTokenProps>()
  const { fields, append, remove } = useFieldArray({
    name: 'transfers',
    control,
  })
  const watchedTransfers = useWatch({
    name: 'transfers',
    control,
  })

  // const onSubmit = (data: any) => {
  //   // if amount != 0, add to send store
  //   const transfers = data.transfers.filter((transfer: any) => {
  //     return (
  //       ethers.BigNumber.from(transfer.amount).gt(ethers.BigNumber.from(0)) &&
  //       transfer.to !== '' &&
  //       transfer.token_address !== ''
  //     )
  //   })

  //   // op, to, value, data
  //   const calls = transfers.map((transfer: any) => {
  //     const token = tokens.find(
  //       (token: any) => token.contract_address.toLowerCase() === transfer.token_address.toLowerCase(),
  //     )
  //     if (token.native_token) {
  //       return {
  //         op: 0,
  //         to: transfer.to,
  //         value: ethers.utils.parseUnits(transfer.amount.toString(), token.contract_decimals).toString(),
  //         data: ethers.constants.HashZero,
  //       }
  //     }

  //     const iface = new ethers.utils.Interface(erc20ABI)
  //     const data = iface.encodeFunctionData('transfer', [
  //       transfer.to,
  //       ethers.utils.parseUnits(transfer.amount.toString(), token.contract_decimals).toString(),
  //     ])

  //     return {
  //       op: 0,
  //       to: transfer.token_address,
  //       value: 0,
  //       data,
  //     }
  //   })

  //   // multiexecute

  //   const iface = new ethers.utils.Interface(KEEP_ABI)
  //   const executedata = iface.encodeFunctionData('multirelay', [calls])

  //   tx.setOp(0)
  //   tx.setTo(keep as `0xstring`)
  //   tx.setValue('0')
  //   tx.setData(executedata as `0xstring`)

  //   // overwrite send store
  //   tx.setSendToken([...transfers])
  // }

  if (!data) {
    return <Spinner />
  }

  if (error) {
    return (
      <Text>
        Something went wrong. Please try again. Contact us on our{' '}
        <a href="https://discord.gg/qWVRw4StaC" target="_blank" rel="noreferrer noopenner">
          Discord
        </a>{' '}
        if this problem persists.
      </Text>
    )
  }

  if (tokens?.length === 0) {
    return <Text>We were not able to find any tokens in this Keep.</Text>
  }
  return (
    <Box display={'flex'} width="full" gap="5">
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
                        setValue(`transfers.${index}.token_address`, value)
                      }}
                    >
                      <SelectTrigger {...register(`transfers.${index}.token_address` as const)}>
                        <SelectValue placeholder="Select Token" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {tokens?.map((token) => {
                            let value = token.contractAddress ? token.contractAddress : ethers.constants.AddressZero
                            return (
                              <SelectItem key={token.contractAddress} value={value}>
                                <Stack direction={'horizontal'} align="center" justify={'space-between'}>
                                  <Avatar size="5" label={token.tokenName} src={token.thumbnail} />
                                  <Text>{token.tokenSymbol}</Text>
                                </Stack>
                              </SelectItem>
                            )
                          })}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </Field>
                  <Input
                    label="Amount"
                    {...register(`transfers.${index}.amount`)}
                    error={<>{errors?.transfers?.message}</>}
                    placeholder="Amount"
                  />
                  <Input
                    label="Recipient"
                    {...register(`transfers.${index}.to`)}
                    error={<>{errors?.transfers?.message}</>}
                    placeholder="Recipient"
                  />
                </Box>
              </Box>
            )
          }
          return null
        })}
        <Button
          size="medium"
          variant="secondary"
          type="button"
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
                      <Avatar
                        src={tokens?.find((token: any) => token.contract_address === transfer.token_address)?.thumbnail}
                        label={
                          tokens?.find((token: any) => token.contract_address === transfer.token_address)?.tokenName ??
                          ''
                        }
                        size="5"
                      />
                      <Text size="small" color="foreground">
                        {/* find token name from contract_address */}

                        {tokens?.find((token: any) => token.contract_address === transfer.token_address)?.tokenSymbol}
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
  )
}
