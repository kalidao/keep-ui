import React from 'react'

import { Box, Button, FieldSet, Heading, Input, Stack, Text } from '@kalidao/reality'
import { GlobalState, useStateMachine } from 'little-state-machine'
import { useForm } from 'react-hook-form'

import { DateInput } from '@design/DateInput'
import { FormSelect } from '@design/FormSelect'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel } from '@design/Select'
import { Switch } from '@design/Switch'

import * as styles from './styles.css'
import { CrowdsaleData } from './tx/type'
import { DaoStore, useDaoStore } from './tx/useDaoStore'
import updateAction from './updateAction'

type Props = {
  setStep: React.Dispatch<React.SetStateAction<number>>
}

// TODO:
// Add purchase terms
// Add Accredited List
export default function Crowdsale({ setStep }: Props) {
  const { crowdsale, hardMode, setDaoData } = useDaoStore()
  // const { actions, state } = useStateMachine({ updateAction })
  // const { hardMode } = state
  const {
    control,
    watch,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    defaultValues: crowdsale,
  })
  const watchCrowdsale = watch('crowdsale', crowdsale.crowdsale)
  // TODO: Add custom token
  const watchPurchaseToken = watch('purchaseToken', crowdsale.purchaseToken)

  const onPrevious = (data: CrowdsaleData) => {
    // actions.updateAction(data)
    setDaoData({ step: 4, data })

    if (!hardMode) {
      setStep(0)
    } else {
      setStep(2)
    }
  }

  const onNext = (data: CrowdsaleData) => {
    // actions.updateAction(data)
    setDaoData({ step: 4, data })

    setStep(4)
  }

  return (
    <>
      <Box className={styles.form}>
        <Box className={styles.formHeader}>
          <Stack align="center" direction="horizontal" space="3">
            <Heading as="legend" level="3">
              Swap
            </Heading>
          </Stack>
        </Box>
        <Box className={styles.formContent}>
          <Stack direction={'horizontal'} align="center" justify={'space-between'}>
            <Text>Add Swap</Text>
            <Switch
              label="Add Swap"
              control={control}
              name="crowdsale"
              value="crowdsale"
              defaultValue={crowdsale.crowdsale}
              onValueChange={(value: boolean) => setValue('crowdsale', value)}
            />
          </Stack>
          {watchCrowdsale && (
            <>
              <FormSelect
                label="Contribution Token"
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setValue('purchaseToken', e.currentTarget.value)}
                defaultValue={crowdsale['purchaseToken']}
                options={[
                  {
                    label: 'ETH',
                    value: 'eth',
                  },
                  {
                    label: 'Custom',
                    value: 'custom',
                  },
                ]}
              />
              {/* <Select
            value={crowdsale.purchaseToken}
            onValueChange={(value: GlobalState['purchaseToken']) => {
              setValue('purchaseToken', value)
            }}
          >
              
              <SelectContent position="popper">
                <SelectGroup>
                <SelectLabel>Contribution Token</SelectLabel>
                  <SelectItem value={'eth'}>ETH</SelectItem>
                  <SelectItem value={'custom'}>Custom</SelectItem>
                </SelectGroup>
              </SelectContent>
          </Select> */}
              {watchPurchaseToken === 'custom' && (
                <Input
                  label="Custom Token Address"
                  {...register('customTokenAddress')}
                  defaultValue={crowdsale['customTokenAddress']}
                />
              )}
              <Input
                label="Total Contribution Limit"
                type="number"
                defaultValue={crowdsale['purchaseLimit']}
                placeholder="10000"
                {...register('purchaseLimit', {
                  required: {
                    value: true,
                    message: 'Purchase Limit is required.',
                  },
                  min: {
                    value: 0,
                    message: 'Purchase Limit must be more than 0.',
                  },
                })}
                error={errors.purchaseLimit?.message}
              />

              <Input
                label="Personal Contribution Limit"
                type="number"
                defaultValue={crowdsale['personalLimit']}
                placeholder="100"
                {...register('personalLimit', {
                  required: {
                    value: true,
                    message: 'Personal Purchase Limit is required.',
                  },
                  min: {
                    value: 0,
                    message: 'Personal purchase Limit must be more than 0.',
                  },
                })}
                error={errors.personalLimit?.message}
              />

              <Input
                label="Contribution Multiplier"
                type="number"
                defaultValue={crowdsale['purchaseMultiplier']}
                placeholder="10"
                {...register('purchaseMultiplier', {
                  required: {
                    value: true,
                    message: 'Purchase Multiplier is required.',
                  },
                  min: {
                    value: 0,
                    message: 'Purchase Multiplier must be more than 0.',
                  },
                })}
                error={errors?.purchaseMultiplier?.message}
              />
              <DateInput
                label="End Date"
                defaultValue={crowdsale['crowdsaleEnd']}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue('crowdsaleEnd', e.target.value)}
                error={errors.crowdsaleEnd?.message}
              />
            </>
          )}
        </Box>
        <Box className={styles.formFooter}>
          <Button variant="transparent" onClick={handleSubmit(onPrevious)}>
            Previous
          </Button>
          <Button variant="primary" type="submit" onClick={handleSubmit(onNext)}>
            Next
          </Button>
        </Box>
      </Box>
    </>
  )
}
