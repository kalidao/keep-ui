import React from 'react'

import { Box, Button, Field, FieldSet, Input, Stack, Heading } from '@kalidao/reality'
import { GlobalState, useStateMachine } from 'little-state-machine'
import { useForm } from 'react-hook-form'

import { FormSelect } from '@design/FormSelect'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@design/Select'
import Switch from '@design/Switch'

import * as styles from './styles.css'
import { GovernanceData } from './tx/type'
import { DaoStore, useDaoStore } from './tx/useDaoStore'
import updateAction from './updateAction'

type Props = {
  setStep: React.Dispatch<React.SetStateAction<number>>
}

export default function Governance({ setStep }: Props) {
  const { governance, hardMode, setDaoData } = useDaoStore()
  const {
    register,
    setValue,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    defaultValues: governance,
  })
  // const { actions, state } = useStateMachine({ updateAction })
  // const { hardMode } = state

  const onPrevious = (data: GovernanceData) => {
    // actions.updateAction(data)
    setDaoData({ step: 2, data })

    setStep(0)
  }

  const onNext = (data: GovernanceData) => {
    // actions.updateAction(data)
    setDaoData({ step: 2, data })
    if (!hardMode) {
      setStep(4)
    } else {
      setStep(2)
    }
  }

  return (
    <>
      <Box className={styles.form}>
        <Box className={styles.formHeader}>
          <Stack align="center" direction="horizontal" space="3">
            <Heading as="legend" level="3">
              Governance
            </Heading>
          </Stack>
        </Box>
        <Box className={styles.formContent}>
          <Stack direction={'horizontal'}>
            <Input
              label="Voting Period"
              type="number"
              id="votingPeriod"
              placeholder="5"
              {...register('votingPeriod', { required: true })}
              defaultValue={governance.votingPeriod}
              min="1"
            />
            {/* <Select
          name="votingPeriodUnit"
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setValue('votingPeriodUnit', e.currentTarget.value)}
          label={'Voting Period Unit'}
          options={[
            {
              label: 'Minutes',
              value: 'min',
            },
            {
              label: 'Hours',
              value: 'hour',
            },
            {
              label: 'Days',
              value: 'day',
            },
          ]}
          defaultValue={state.votingPeriodUnit}
        /> */}
            <FormSelect
              name="votingPeriodUnit"
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setValue('votingPeriodUnit', e.currentTarget.value)
              }
              label={'Voting Period Unit'}
              options={[
                {
                  label: 'Minutes',
                  value: 'min',
                },
                {
                  label: 'Hours',
                  value: 'hour',
                },
                {
                  label: 'Days',
                  value: 'day',
                },
              ]}
              defaultValue={governance.votingPeriodUnit}
            />
            {/* <Select
          value={state.votingPeriodUnit}
          onValueChange={(value: GlobalState['votingPeriodUnit']) => {
            setValue('votingPeriodUnit', value)
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Function" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectGroup>
              <SelectLabel>Contribution Token</SelectLabel>
              <SelectItem value={'min'}>Minutes</SelectItem>
              <SelectItem value={'hour'}>Hours</SelectItem>
              <SelectItem value={'day'}>Days</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select> */}
          </Stack>
          <Input
            label="Participation Needed"
            description="Minimum percentage of votes required for a proposal to pass"
            type="number"
            id="quorum"
            placeholder="20"
            aria-invalid={errors.quorum ? 'true' : 'false'}
            min="1"
            max="100"
            {...register('quorum', {
              required: {
                value: true,
                message: 'Participation percentage is required.',
              },
              min: {
                value: 0,
                message: 'Participation percentage must be above 0.',
              },
              max: {
                value: 100,
                message: 'Participation percentage must be below 100.',
              },
            })}
            error={errors?.quorum?.message}
            defaultValue={governance.quorum}
          />
          <Input
            label="Approval Needed"
            description="Minimum percentage of positive votes required for a proposal to pass"
            type="number"
            id="approval"
            placeholder="60"
            min="51"
            max="100"
            aria-invalid={errors.approval ? 'true' : 'false'}
            {...register('approval', {
              required: {
                value: true,
                message: 'Approval percentage is required.',
              },
              min: {
                value: 51,
                message: 'Approval percentage must be more than 52.',
              },
              max: {
                value: 100,
                message: 'Approval percentage must be below 100.',
              },
            })}
            error={errors?.approval?.message}
            defaultValue={governance.approval}
          />
          {/* !!!TODO */}
          <Switch
            control={control}
            label="Allow token transferability"
            name="transferability"
            value="transferability"
          />
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
