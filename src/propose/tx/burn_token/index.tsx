import { useEffect, useState } from 'react'

import { Box, Divider, Input } from '@kalidao/reality'
import { useFormContext } from 'react-hook-form'
import { useSendStore } from '~/propose/tx/useSendStore'
import { BurnTokenProps } from '~/propose/types'
import { isAddressOrEns } from '~/utils/ens'

import WarningCard from '@design/Warning'

const idWarnings: Record<string, string> = {
  '1816876358': 'This is the Signer Key. Please proceed with caution.',
  '3104532979': 'This is the Relay Key. Please proceed with caution.',
  '288790985': 'This is the MultiRelay Key. Please proceed with caution.',
  '1930507241': 'This is the Mint Key. Please proceed with caution.',
  '4294837299': 'This is the Burn Key. Please proceed with caution.',
  '106236017': 'This is the Quorum Key. Please proceed with caution.',
  '1521609684': 'This is the Transferability Key. Please proceed with caution.',
  '2617606769': 'This is the Permission Key. Please proceed with caution.',
  '4240432350': 'This is the User Permission Key. Please proceed with caution.',
  '3340393313': 'This is the URI Key. Please proceed with caution.',
}

export const BurnToken = () => {
  const burn_token = useSendStore((state) => state.burn_token)
  const setBurnToken = useSendStore((state) => state.setBurnToken)
  const [warning, setWarning] = useState('')

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
      setWarning(idWarnings[watchedId] || '')
    }
  }, [watchedId, watchedAmount, watchedFromAddress, setBurnToken])

  return (
    <Box display={'flex'} flexDirection="column" gap="2">
      <Input
        label={`ID`}
        placeholder="ID"
        type="number"
        defaultValue={burn_token.id}
        {...register('id', { valueAsNumber: true })}
      />
      {warning && <WarningCard>{warning}</WarningCard>}
      <Input
        label={`Amount`}
        placeholder="Amount"
        type="number"
        defaultValue={burn_token.amount}
        {...register('amount', { valueAsNumber: true })}
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
