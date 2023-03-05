import { useEffect } from 'react'

import { Box, Button, Divider, IconClose, IconPlus, Input, Stack, Text } from '@kalidao/reality'
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form'
import { z } from 'zod'
import { useKeepStore } from '~/dashboard/useKeepStore'
import { validateEns } from '~/utils/ens'

import { ManageSignersProps, schemas } from '../types'
import { useSendStore } from './useSendStore'

export const ManageSigners = () => {
  const keep = useKeepStore((state) => state)
  const manage_signers = useSendStore((state) => state.manage_signers)
  const setManageSigners = useSendStore((state) => state.setManageSigners)
  const tx = useSendStore((state) => state)

  const {
    register,
    setValue,
    formState: { errors },
    control,
  } = useFormContext<ManageSignersProps>()
  const { fields, append, remove } = useFieldArray({
    name: 'signers',
    control,
  })
  const watchedSigners = useWatch({
    control,
    name: 'signers',
  })

  useEffect(() => {
    if (keep.threshold && keep.threshold != manage_signers.threshold) {
      setManageSigners({ ...manage_signers, threshold: keep.threshold })
    }
  })

  useEffect(() => {
    watchedSigners?.forEach(
      async (
        signer: {
          address: string
          resolves?: string
        },
        index: number,
      ) => {
        if (signer.resolves) return
        const resolves = await validateEns(signer.address)
        if (resolves === null) return
        if (signer.address.toLowerCase() !== resolves.toLowerCase()) {
          setValue(`signers.${index}.resolves`, resolves)
        }
      },
    )
  }, [watchedSigners, setValue])

  return (
    <Box display={'flex'} flexDirection="column" gap="2">
      {fields.map((field, index) => (
        <Stack key={field.id}>
          <Stack key={field.id} direction="horizontal" align="center">
            <Input
              label={`Signer ${index + 1}`}
              hideLabel
              placeholder="0x or ENS"
              type="text"
              defaultValue={field.address}
              {...register(`signers.${index}.address` as const)}
              error={errors.signers?.[index]?.address?.message}
            />
            <Button
              type="button"
              tone="red"
              size="small"
              shape="circle"
              variant="secondary"
              onClick={() => {
                remove(index)
              }}
            >
              <IconClose />
            </Button>
          </Stack>
          {field.resolves && (
            <Text size="label" color="textSecondary">
              Resolves to {field.resolves}
            </Text>
          )}
        </Stack>
      ))}
      <Button
        variant="secondary"
        size="small"
        tone="green"
        onClick={() => {
          append({ address: '' })
        }}
        prefix={<IconPlus />}
      >
        Add Signer
      </Button>
      <Divider />
      <Input
        label="Update Threshold"
        labelSecondary={`Current: ${keep.threshold}/${keep.signers.length}`}
        type="number"
        min={'1'}
        error={errors.threshold?.message}
        {...register('threshold', {
          valueAsNumber: true,
        })}
      />
    </Box>
  )
}
