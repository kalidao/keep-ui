import React, { useEffect, useState } from 'react'

import { Box, Button, Heading, Stack } from '@kalidao/reality'
// import { getNames } from '@graph/queries'
import { FieldSet, Input } from '@kalidao/reality'
import { GlobalState, useStateMachine } from 'little-state-machine'
import { useForm } from 'react-hook-form'
import { useNetwork } from 'wagmi'

import * as styles from './styles.css'
import Tutorial from './tutorial'
import { IdentityData } from './tx/type'
import { DaoStore, useDaoStore } from './tx/useDaoStore'
import updateAction from './updateAction'

type Props = {
  setStep: React.Dispatch<React.SetStateAction<number>>
}

export default function Identity({ setStep }: Props) {
  const { identity, hardMode, setDaoData } = useDaoStore()
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    defaultValues: identity,
  })
  const { chain: activeChain } = useNetwork()
  // const { actions, state } = useStateMachine({ updateAction })
  // const { hardMode } = state
  const [names, setNames] = useState<string[]>([])

  // useEffect(() => {
  //   if (!activeChain) return
  //   let mounted = true
  //   const fetchNames = async () => {
  //     const result = await getNames(activeChain?.id)
  //     const names = []
  //     for (let i = 0; i < result?.data?.daos.length; i++) {
  //       names.push(result?.data?.daos?.[i]?.token?.name)
  //     }
  //     setNames(names)
  //   }

  //   fetchNames()
  //   return () => {
  //     mounted = false
  //   }
  // }, [activeChain])

  const onSubmit = (data: IdentityData) => {
    // name check
    // if (names.includes(data?.name)) {
    //   setError(
    //     'name',
    //     {
    //       type: 'custom',
    //       message: 'Name is not unique. Please choose another!',
    //     },
    //     {
    //       shouldFocus: true,
    //     },
    //   )
    //   return
    // }
    // actions.updateAction(data)
    setDaoData({ step: 1, data })

    // if (!hardMode) {
    //   setStep(4)
    // } else {
    //   setStep(1)
    // }
    setStep(6)
  }

  return (
    <>
      <Box className={styles.form}>
        <Box  className={styles.formHeader} >
          <Stack align="center" direction="horizontal" space="3">
            <Heading as="legend" level="3">
              Token
            </Heading>
          </Stack>

          <Box color="textSecondary" fontSize="small" >
            Your token is the identity of your organization. The token created will be ERC20 compliant.
          </Box>
        </Box>
        <Box className={styles.formContent}>
          <Input
            label="Name"
            placeholder="KaliCo"
            defaultValue={identity.name === '' ? undefined : identity.name}
            {...register('name', {
              required: {
                value: true,
                message: 'Name is required.',
              },
            })}
            error={errors?.name?.message}
          />
          <Input
            label="Symbol"
            placeholder="KCO"
            prefix="$"
            textTransform="uppercase"
            defaultValue={identity.symbol === '' ? undefined : identity.symbol}
            {...register('symbol', {
              required: {
                value: true,
                message: 'Symbol is required.',
              },
              maxLength: {
                value: 11,
                message: 'Max symbol length exceeded',
              },
            })}
            error={errors?.symbol?.message}
          />
        </Box>
        <Box className={styles.formFooter}>
          {/* <Tutorial /> */}
          <Button variant="primary" onClick={handleSubmit(onSubmit)}>
            Next
          </Button>
        </Box>
      </Box>
    </>
  )
}
