import React from 'react'

import { Box, Button, FieldSet, Heading, IconLink, Input, Stack, Text } from '@kalidao/reality'
import { GlobalState, useStateMachine } from 'little-state-machine'
import { useForm } from 'react-hook-form'

import { FormSelect } from '@design/FormSelect'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel } from '@design/Select'
import { Switch } from '@design/Switch'

import { legalEntities } from '../constants/legalEntities'
import * as styles from './styles.css'
import { LegalData } from './tx/type'
import { DaoStore, useDaoStore } from './tx/useDaoStore'
import updateAction from './updateAction'

type Props = {
  setStep: React.Dispatch<React.SetStateAction<number>>
}

export default function Legal({ setStep }: Props) {
  const { legalData, hardMode, setDaoData } = useDaoStore()
  const {
    control,
    watch,
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    defaultValues: legalData,
  })
  // const { actions, state } = useStateMachine({ updateAction })
  // const { hardMode, legal, docType } = state
  const watchLegal = watch('legal', legalData.legal)
  const watchDocs = watch('docType', legalData.docType)

  const onPrevious = (data: LegalData) => {
    // actions.updateAction(data)
    setDaoData({ step: 6, data })

    if (!hardMode) {
      setStep(0)
    } else {
      setStep(4)
    }
  }
  const onNext = (data: LegalData) => {
    // actions.updateAction(data)
    setDaoData({ step: 6, data })
    setStep(6)
  }

  let selectArray = [
    {
      label: 'Select',
      value: 'none',
    },
  ]
  for (let key in legalEntities) {
    selectArray.push({
      label: legalEntities[key].text,
      value: key,
    })
  }

  return (
    <>
      <Box className={styles.form}>
        <Box className={styles.formHeader}>
          <Stack align="center" direction="horizontal" space="3">
            <Heading as="legend" level="3">
              Legal
            </Heading>
          </Stack>
        </Box>
        <Box className={styles.formContent}>
          <Stack align="center" justify={'space-between'} direction="horizontal">
            <Text>Add structure</Text>
            <Switch
              control={control}
              label="Add structure"
              name="legal"
              value="legal"
              defaultValue={legalData['legal']}
              onValueChange={(value: boolean) => setValue('legal', value)}
            />
          </Stack>
          {watchLegal && (
            <>
              <FormSelect
                label="Choose Entity"
                // {...register('docType')}
                defaultValue={legalData.docType}
                options={selectArray}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setValue('docType', e.currentTarget.value)}
              />
              {/* <Select
            value={legalData.docType}
            onValueChange={(value: GlobalState['docType']) => {
              setValue('docType', value)
            }}
          >
            <SelectContent position="popper">
              <SelectGroup>
                <SelectLabel>Choose Entity</SelectLabel>
                <SelectItem value={"123"} key={"12"}>
                      {"123"}
                    </SelectItem>
                {selectArray.map((item, index) => {
                  console.log(item)
                  return (
                    <SelectItem value={item.value} key={index}>
                      {item.label}
                    </SelectItem>
                  )
                })}
              </SelectGroup>
            </SelectContent>
          </Select> */}
              <Text>
                Resources to help with entity selection:{' '}
                <a href="https://a16z.com/2022/05/23/dao-legal-frameworks-entity-features-selection/">a16z</a> or{' '}
                <a href="https://daos.paradigm.xyz/"> Paradigm</a>
              </Text>

              {watchDocs && watchDocs !== 'none' && legalEntities[watchDocs]['email'] === true && (
                <Input
                  label="Email"
                  type="email"
                  placeholder="abc@xyz.com"
                  defaultValue={legalData.email}
                  {...register('email', {
                    required: {
                      value: true,
                      message: `Email is required for ${legalEntities[watchDocs]['text']}.`,
                    },
                    // regex taken from https://www.w3resource.com/javascript/form/email-validation.php
                    pattern: {
                      value:
                        /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
                      message: 'Please enter a valid email.',
                    },
                  })}
                  error={errors?.email?.message}
                />
              )}
              {watchDocs && watchDocs !== 'none' && legalEntities[watchDocs]['mission'] === true && (
                <Input
                  label="Mission"
                  type="text"
                  placeholder="http://"
                  defaultValue={legalData.mission}
                  {...register('mission', {
                    required: {
                      value: true,
                      message: `Mission is required for ${legalEntities[watchDocs]['text']}.`,
                    },
                    pattern: {
                      value:
                        /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/,
                      message: 'Please enter a valid URL.',
                    },
                  })}
                  error={errors?.mission?.message}
                />
              )}
              {watchDocs === 'existing' && (
                <Input
                  label="Existing Docs"
                  type="text"
                  placeholder="Any link"
                  {...register('existingDocs')}
                  defaultValue={legalData.existingDocs}
                />
              )}
              {watchDocs && watchDocs !== 'none' && <Text>{legalEntities[watchDocs]['message']}</Text>}
              {watchDocs && watchDocs !== 'none' && legalEntities[watchDocs]['template'] !== null && (
                <Button
                  as="a"
                  href={legalEntities[watchDocs]['template'] as string}
                  target="_blank"
                  prefix={<IconLink />}
                >
                  Review Template
                </Button>
              )}
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
