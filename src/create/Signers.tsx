import { useState } from 'react'
import { Text, Stack, Input, Button, IconArrowRight, IconPlus, IconClose, Box, IconCheck } from '@kalidao/reality'
import { CreateProps, Store } from './types'
import { useForm, useFieldArray, useWatch } from 'react-hook-form'
import Back from './Back'
import { validateEns } from '~/utils/ens'
import { ethers } from 'ethers'

export const Signers = ({ store, setStore, setView }: CreateProps) => {
  const [error, setError] = useState<string>()
  const [signerStatus, setSignerStatus] = useState([
    { status: false, isEns: false, address: ethers.constants.AddressZero, message: '' },
  ])
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Store>({
    defaultValues: {
      signers: store.signers,
      threshold: store.threshold,
    },
    mode: 'onBlur',
  })
  const { fields, append, remove } = useFieldArray({
    name: 'signers',
    control,
  })
  const watchedSigners = useWatch({
    name: 'signers',
    control,
  })

  const onSubmit = (data: Store) => {
    const { signers, threshold } = data

    setStore({
      ...store,
      signers: signers,
      threshold: threshold,
    })

    setView(3)
  }
  console.log('signers', watchedSigners)
  const maxSigners = 9
  const addSigner = () => {
    if (watchedSigners.length < maxSigners) {
      // current max support
      append({
        address: '',
      })
    } else {
      setError(`You can only add ${maxSigners} signers at formation currently.`)
    }
  }

  const ensSigner = async (ens: string, index: number) => {
    const validity = await validateEns(ens)
    const currentStatus = signerStatus
    currentStatus[index] = validity
    setSignerStatus(currentStatus)
  }

  const signerError = (index: number) => {
    if (errors?.signers?.[index]?.address) return errors?.signers?.[index]?.address?.message
    if (signerStatus?.[index]?.status === false) return signerStatus?.[index]?.message
  }

  // TODO: Same address error
  return (
    <Box height="full">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack>
          <Back setView={setView} to={1} />
          <Stack>
            <Box marginLeft={'3'} color="textSecondary" fontWeight="bold">
              Signers
            </Box>
            {fields.map((field, index) => {
              return (
                <Stack>
                  <Stack key={field.id} direction="horizontal" align="center">
                    <Input
                      width="full"
                      label="Signer"
                      hideLabel
                      placeholder="keep.eth"
                      {...register(`signers.${index}.address` as const, {
                        required: true,
                      })}
                      onBlur={() => ensSigner(watchedSigners[index].address, index)}
                      error={signerError(index)}
                    />
                    <Button
                      shape="circle"
                      variant="secondary"
                      tone="red"
                      size="small"
                      type="button"
                      onClick={() => {
                        if (index < maxSigners) setError('')
                        remove(index)
                      }}
                    >
                      <IconClose />
                    </Button>
                  </Stack>
                  <Stack direction={'horizontal'} align="center" justify={'flex-start'}>
                    {signerStatus?.[index]?.status === true && signerStatus?.[index]?.isEns === true && (
                      <IconCheck color={'green'} size="3.5" />
                    )}

                    <Text>
                      {signerStatus?.[index]?.status === true &&
                        signerStatus?.[index]?.isEns === true &&
                        signerStatus?.[index]?.message}
                    </Text>
                  </Stack>
                </Stack>
              )
            })}
            <Button prefix={<IconPlus />} type="button" tone="green" variant="secondary" onClick={addSigner}>
              Add Signer
            </Button>
          </Stack>
          <Text color="red">{error}</Text>
          <Input
            label="Threshold"
            description="The number of signers required for a transaction to pass."
            type="number"
            inputMode="numeric"
            min="1"
            max={watchedSigners.length}
            error={errors?.threshold && errors?.threshold?.message}
            {...register(`threshold`, {
              required: true,
              max: watchedSigners.length,
            })}
          />
          <Button suffix={<IconArrowRight />} width="full" type="submit">
            Next
          </Button>
        </Stack>
      </form>
    </Box>
  )
}
