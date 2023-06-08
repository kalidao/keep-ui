import React from 'react'

import { Button, FieldSet, Stack, Box, Heading } from '@kalidao/reality'
import { GlobalState, useStateMachine } from 'little-state-machine'
import { useForm } from 'react-hook-form'

import { DateInput } from '@design/DateInput'
import Switch from '@design/Switch'

import * as styles from './styles.css'
import { RedemptionData } from './tx/type'
import { DaoStore, useDaoStore } from './tx/useDaoStore'
import updateAction from './updateAction'

type Props = {
  setStep: React.Dispatch<React.SetStateAction<number>>
}

// TODO: Add grace period
export default function Redemption({ setStep }: Props) {
  const { redemption, hardMode, setDaoData } = useDaoStore()
  // const { actions, state } = useStateMachine({ updateAction })
  // const { hardMode } = state
  const { control, watch, handleSubmit, setValue } = useForm({
    mode: 'onBlur',
    defaultValues: redemption,
  })
  const watchRedemption = watch('redemption', redemption.redemption)

  const onPrevious = (data: RedemptionData) => {
    // actions.updateAction(data)
    setDaoData({ step: 3, data })

    if (!hardMode) {
      setStep(0)
    } else {
      setStep(1)
    }
  }

  const onNext = (data: RedemptionData) => {
    // actions.updateAction(data)
    setDaoData({ step: 3, data })

    if (!hardMode) {
      setStep(4)
    } else {
      setStep(3)
    }
  }

  return (
    <>
      <Box className={styles.form}>
        <Box className={styles.formHeader}>
          <Stack align="center" direction="horizontal" space="3">
            <Heading as="legend" level="3">
              Redemption
            </Heading>
          </Stack>
        </Box>
        <Box className={styles.formContent}>
          <Switch
            label="Add Redemption"
            control={control}
            name="redemption"
            value="redemption"
            defaultValue={redemption.redemption}
            onValueChange={(value: boolean) => setValue('redemption', value)}
          />
          {watchRedemption && (
            <DateInput
              label="Start Date"
              defaultValue={redemption['redemptionStart']}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue('redemptionStart', e.target.value)}
            />
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
