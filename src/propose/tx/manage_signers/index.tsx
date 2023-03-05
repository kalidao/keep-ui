import { useEffect } from 'react'

import { Box, Button, Divider, IconClose, IconPlus, Input, Stack, Text } from '@kalidao/reality'
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form'
import { useKeepStore } from '~/dashboard/useKeepStore'
import { useSendStore } from '~/propose/tx/useSendStore'
import { ManageSignersProps } from '~/propose/types'
import { validateEns } from '~/utils/ens'

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
  const watchedSignersArray = useWatch({
    control,
    name: 'signers',
  })
  const controlledSigners = fields.map((field, index) => {
    return {
      ...field,
      ...watchedSignersArray[index],
    }
  })

  useEffect(() => {
    if (keep.signers && keep.signers.length > 0) {
      setValue(
        'signers',
        keep.signers.map((signer) => ({ address: signer, resolves: undefined })),
      )
    }
  }, [])

  useEffect(() => {
    if (keep.threshold && keep.threshold != manage_signers.threshold) {
      setManageSigners({ ...manage_signers, threshold: keep.threshold })
    }
  })

  useEffect(() => {
    watchedSignersArray?.forEach(
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
  }, [watchedSignersArray, setValue])

  // WARN
  return (
    <Box display={'flex'} flexDirection="column" gap="2">
      {controlledSigners.map((field, index) => (
        <Stack key={field.id}>
          <Stack key={field.id} direction="horizontal" align="center">
            <Input
              label={`Signer ${index + 1}`}
              hideLabel
              placeholder="0x or ENS"
              type="text"
              defaultValue={field.address}
              {...register(`signers.${index}.address` as const)}
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
          append({ address: '', resolves: undefined })
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
        error={errors && <>{errors?.threshold?.message}</>}
        {...register('threshold', {
          valueAsNumber: true,
        })}
      />
    </Box>
  )
}
