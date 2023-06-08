import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Button, Heading, IconClose, IconUserSolid, Input, Stack } from '@kalidao/reality'
import { ethers } from 'ethers'
import { GlobalState, useStateMachine } from 'little-state-machine'
import { useFieldArray, useForm } from 'react-hook-form'
import { useAccount, useEnsName } from 'wagmi'
import { z } from 'zod'
import { getEnsAddress, isAddressOrEns, validateEns } from '~/utils/ens'

import * as styles from './styles.css'
import { MembersData } from './tx/type'
import { DaoStore, useDaoStore } from './tx/useDaoStore'
import updateAction from './updateAction'

// import { fetchEnsAddress } from '@utils/fetchEnsAddress'

const schema = z.object({
  founders: z
    .array(
      z.object({
        member: z
          .string()
          .refine(async (val) =>  await isAddressOrEns(val), 'Not a valid address or ENS.')
          .transform(async (val) => await validateEns(val)),
        share: z.coerce.number().min(1, { message: 'Share must be greater than 0' }),
      }),
    )
    .transform((val) => val.filter((v, i, a) => a.findIndex((t) => t.member === v.member) === i)),
})

type Props = {
  setStep: React.Dispatch<React.SetStateAction<number>>
}

export default function Members({ setStep }: Props) {
  const { founders, hardMode, setDaoData } = useDaoStore()
  // const { actions, state } = useStateMachine({ updateAction })
  // // const { hardMode } = state
  const { address: account } = useAccount()
  const { data: ensName } = useEnsName({
    address: account,
    chainId: 1,
  })

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    defaultValues: { founders },
    resolver: zodResolver(schema),
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'founders',
  })

  // const validateData = async (data: GlobalState) => {
  //   if (!data) return
  //   const founders = data?.founders

  //   for (let i = 0; i < founders.length; i++) {
  //     if (!ethers.utils.isAddress(founders[i].member)) {
  //       try {
  //         // const res = await fetchEnsAddress(founders[i].member)
  //         // if (res) {
  //         //   founders[i].member = res as string
  //         // }
  //         founders[i].member = founders[i].member as string
  //       } catch (e) {
  //         return false
  //       }
  //     }
  //   }

  //   return true
  // }

  const onPrevious = async (data: { founders: MembersData }) => {
    try {
      // const res = await validateData(data)
      const res = true

      if (res) {
        // actions.updateAction(data)
        console.log(data)
        setDaoData({ step: 5, data: data.founders })

        if (!hardMode) {
          setStep(0)
        } else {
          setStep(3)
        }
      }
    } catch (e) {
      console.error(e)
    }
  }

  const onNext = async (data: { founders: MembersData }) => {
    // const res = await validateData(data)
    const res = true
    if (res) {
      // actions.updateAction(data)
      console.log(data)
      setDaoData({ step: 5, data: data.founders })

      if (!hardMode) {
        setStep(6)
      } else {
        setStep(5)
      }
    }
  }

  return (
    <>
      {console.log(errors?.founders?.[0]?.member?.message)}
      {console.log(errors?.founders?.[0]?.share?.message)}
      <Box className={styles.form}>
        <Box className={styles.formHeader}>
          <Stack align="center" direction="horizontal" space="3">
            <Heading as="legend" level="3"></Heading>
          </Stack>
        </Box>
        <Box className={styles.formContent}>
          {/* TODO: Copy last share value in next field */}
          <Stack justify="flex-start">
            {fields.map((item, index) => {
              return (
                <Stack key={item.id} direction="horizontal" align="center" justify="center">
                  <Input
                    label={`Member`}
                    hideLabel={index !== 0}
                    id="member"
                    {...register(`founders.${index}.member` as const, {
                      required: true,
                    })}
                    error={errors?.founders?.[index]?.member && errors?.founders?.[index]?.member?.message}
                    defaultValue={item.member}
                    type="text"
                  />
                  <Input
                    label="Tokens"
                    hideLabel={index !== 0}
                    id="share"
                    type="number"
                    {...register(`founders.${index}.share` as const, {
                      required: true,
                      min: 1,
                    })}
                    error={errors?.founders?.[index]?.share && errors?.founders?.[index]?.share?.message}
                    defaultValue={item.share}
                  />
                  <Button
                    tone="red"
                    variant="secondary"
                    size="small"
                    shape="circle"
                    onClick={(e) => {
                      e.preventDefault()
                      remove(index)
                    }}
                  >
                    <IconClose />
                  </Button>
                </Stack>
              )
            })}
            <Button
              suffix={<IconUserSolid />}
              variant="secondary"
              tone="green"
              onClick={(e) => {
                e.preventDefault()
                append({
                  member: '',
                  share: 100,
                })
              }}
            >
              Add
            </Button>
          </Stack>
        </Box>
        <Box className={styles.formFooter}>
          <Button variant="transparent" onClick={handleSubmit(onPrevious)}>
            Previous
          </Button>
          <Button variant="primary" onClick={handleSubmit(onNext)}>
            Next
          </Button>
        </Box>
      </Box>
    </>
  )
}
