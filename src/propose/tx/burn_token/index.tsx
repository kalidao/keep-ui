import { useEffect } from 'react'

import { Box, Divider, Input } from '@kalidao/reality'
import { useFormContext } from 'react-hook-form'
import { useSendStore } from '~/propose/tx/useSendStore'
import { BurnTokenProps } from '~/propose/types'
import { isAddressOrEns } from '~/utils/ens'

export const BurnToken = () => {
  const burn_token = useSendStore((state) => state.burn_token)
  const setBurnToken = useSendStore((state) => state.setBurnToken)

  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext<BurnTokenProps>()

  const [watchedId, watchedAmount, watchedFromAddress] = watch(['id', 'amount', 'fromAddress'])

  useEffect(() => {
    if (watchedId !== undefined && watchedAmount !== undefined && watchedFromAddress !== undefined) {
      setBurnToken({
        id: watchedId,
        amount: watchedAmount,
        fromAddress: watchedFromAddress as `0xstring`,
      })
    }
  }, [watchedId, watchedAmount, watchedFromAddress, setBurnToken])

  return (
    <Box display={'flex'} flexDirection="column" gap="2">
      <Input
        label={`ID`}
        placeholder="ID"
        type="number"
        defaultValue={burn_token.id}
        {...register('id', {
          valueAsNumber: true,
        })}
      />
      <Input
        label={`Amount`}
        placeholder="Amount"
        type="number"
        defaultValue={burn_token.amount}
        {...register('amount', {
          valueAsNumber: true,
        })}
      />
      <Divider />
      <Input
        label={`From Address`}
        placeholder="0x or ENS"
        type="text"
        defaultValue={burn_token.fromAddress}
        {...register('fromAddress', {
          validate: (value) => (value ? isAddressOrEns(value) : false) || 'Not a valid address or ENS.',
        })}
        error={errors?.fromAddress && <>{errors?.fromAddress?.message}</>}
      />
    </Box>
  )
}
