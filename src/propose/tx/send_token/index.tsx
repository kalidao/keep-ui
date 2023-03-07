import { useState } from 'react'

import {
  Avatar,
  Box,
  Button,
  Divider,
  Field,
  IconCheck,
  IconClose,
  IconPlus,
  Input,
  Spinner,
  Stack,
  Text,
} from '@kalidao/reality'
import { useAccountBalance } from 'ankr-react'
import { ethers } from 'ethers'
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form'
import { useKeepStore } from '~/dashboard/useKeepStore'
import { useSendStore } from '~/propose/tx/useSendStore'
import { SendTokenProps } from '~/propose/types'
import { truncAddress } from '~/utils'
import { getBlockchainByChainId } from '~/utils/ankr'

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@design/Select'
import toast from '@design/Toast'

import * as styles from './styles.css'

export const SendToken = () => {
  const keep = useKeepStore((state) => state)
  const tx = useSendStore((state) => state)
  const { data, error, isLoading } = useAccountBalance({
    blockchain: keep.chainId ? getBlockchainByChainId(keep.chainId) : 'polygon',
    walletAddress: keep.address ? keep.address : ethers.constants.AddressZero,
  })
  const tokens = data ? data.assets : null
  const [active, setActive] = useState<number>(0)
  const [loading, setLoading] = useState(false)
  // set up react-hook-form and zod with field array
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    control,
    trigger,
    clearErrors,
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

  console.log('active', active)

  const form = (
    <Box width="full" padding="6" display="flex" flexDirection={'column'} gap="2">
      {fields.map((field, index) => {
        // only show the active index
        if (index !== active) return null
        return (
          <Box
            width="full"
            key={field.id}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent={'flex-start'}
            gap="5"
          >
            <Select
              value={watchedTransfers?.[index]?.token_address ?? ''}
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
                      <SelectItem className={styles.tokenItem} key={token.contractAddress} value={value} hideIndicator>
                        <Stack direction={'horizontal'} align="center" justify={'space-between'}>
                          <Avatar size="6" label={token.tokenName} src={token.thumbnail} />
                          <Stack direction={'vertical'} align="flex-start" justify={'center'}>
                            <Text color="textPrimary" weight="semiBold">
                              {token.tokenName}
                            </Text>
                            <Text>
                              {token.balance} {token.tokenSymbol}
                            </Text>
                          </Stack>
                        </Stack>
                      </SelectItem>
                    )
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Input
              label="Amount"
              // {...register(`transfers.${index}.amount`, {
              //   valueAsNumber: true,
              // })}
              onChange={(e) => {
                const token = tokens?.find((token) => {
                  if (watchedTransfers[index].token_address === '') return false
                  if (
                    watchedTransfers[index].token_address === ethers.constants.AddressZero &&
                    token.contractAddress === undefined
                  )
                    return true
                  if (watchedTransfers[index].token_address === token.contractAddress) return true
                  return false
                })
                if (token) {
                  console.log(
                    parseFloat(e.currentTarget.value),
                    parseFloat(token.balance),
                    parseFloat(e.currentTarget.value) > parseFloat(token.balance),
                  )
                  if (parseFloat(e.currentTarget.value) > parseFloat(token.balance)) {
                    setError(`transfers.${index}.amount`, {
                      type: 'manual',
                      message: 'Insufficient balance',
                    })
                  } else {
                    clearErrors(`transfers.${index}.amount`)
                  }
                  setValue(`transfers.${index}.amount`, parseFloat(e.target.value))
                }
              }}
              error={errors?.transfers?.[index]?.amount?.message}
              placeholder="Amount"
            />
            <Input
              label="Recipient"
              {...register(`transfers.${index}.to`)}
              error={errors?.transfers?.[index]?.to?.message}
              placeholder="Recipient"
            />
          </Box>
        )
      })}
      <Stack direction={'horizontal'}>
        <Button
          size="medium"
          variant="secondary"
          type="button"
          suffix={<IconPlus />}
          onClick={async () => {
            // trigger validation
            setLoading(true)
            trigger().then((isValid) => {
              console.log(isValid)
              if (isValid) {
                append({ token_address: '', amount: 0, to: '' })
                setActive(active + 1)
              } else {
                toast('error', 'Please fill out all fields')
              }
              setLoading(false)
            })
          }}
          loading={loading}
        >
          Add
        </Button>
      </Stack>
    </Box>
  )

  return (
    <Box display={'flex'} flexDirection="column" width="full" gap="5">
      <Stack>
        {watchedTransfers.map((transfer, index) => {
          const token = tokens?.find((token) => {
            if (transfer.token_address === '') return false
            if (transfer.token_address === ethers.constants.AddressZero && token.contractAddress === undefined)
              return true
            if (transfer.token_address === token.contractAddress) return true
          })

          if (!token) return null
          return (
            <Stack key={index} direction={'horizontal'} space="2" align="center" justify={'space-between'}>
              <Box display="flex" flexDirection={'row'} gap="2" width={'112'}>
                <Text>
                  {index + 1}. Sending {transfer.amount ? transfer.amount : '_______'} {token?.tokenSymbol}
                </Text>
                <Avatar size="6" label={token?.tokenName} src={token?.thumbnail} />
                <Text>
                  to{' '}
                  {transfer.to === ''
                    ? '_______'
                    : ethers.utils.isAddress(transfer.to)
                    ? truncAddress(transfer.to)
                    : transfer.to}
                </Text>
              </Box>
              <Stack direction={'horizontal'}>
                <Button
                  size="small"
                  variant="transparent"
                  onClick={() => {
                    remove(index)
                  }}
                >
                  Remove
                </Button>
                <Button
                  size="small"
                  variant="transparent"
                  onClick={() => {
                    setActive(index)
                  }}
                >
                  Edit
                </Button>
              </Stack>
            </Stack>
          )
        })}
      </Stack>
      {form}
    </Box>
  )
}
