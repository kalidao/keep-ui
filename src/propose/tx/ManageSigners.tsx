import { useState } from 'react'

import { Box, Button, Divider, IconClose, Input, Stack, Text } from '@kalidao/reality'
import { ethers } from 'ethers'
import { useKeepStore } from '~/dashboard/useKeepStore'

import { User } from '~/components/User'

import toast from '@design/Toast'

import { useSendStore } from './useSendStore'

export const ManageSigners = () => {
  const keep = useKeepStore((state) => state)
  const manage_signers = useSendStore((state) => state.manage_signers)
  const setManageSigners = useSendStore((state) => state.setManageSigners)

  const isValidSigner = (address: string) => {
    return ethers.utils.isAddress(address)
  }

  return (
    <Stack>
      <Stack direction={'vertical'} align="stretch">
        {manage_signers.signers.map((signer, i) => {
          if (i + 1 === manage_signers.signers.length) return null
          return (
            <Stack key={i} direction={'horizontal'} align="center" justify="space-between">
              <User address={signer} size="lg" />
              <Button
                variant="secondary"
                tone="red"
                shape="square"
                size="small"
                onClick={() => {
                  setManageSigners({ ...manage_signers, signers: manage_signers.signers.filter((_, j) => j !== i) })
                }}
              >
                <IconClose />
              </Button>
            </Stack>
          )
        })}
        <Input
          label="Add Signer"
          value={manage_signers.signers[manage_signers.signers.length - 1]}
          onChange={(e) => {
            setManageSigners({
              ...manage_signers,
              signers: [...manage_signers.signers.slice(0, -1), e.currentTarget.value],
            })
          }}
        />

        <Button
          onClick={() => {
            if (manage_signers.signers.length < 40) {
              if (isValidSigner(manage_signers.signers[manage_signers.signers.length - 1])) {
                setManageSigners({ ...manage_signers, signers: [...manage_signers.signers, ''] })
              } else {
                toast('error', 'Invalid address', 1000)
              }
            } else {
              toast('error', 'Maximum number of signers reached', 1000)
            }
          }}
        >
          Add Signer
        </Button>
      </Stack>
      <Divider />

      <Input
        label="Update Threshold"
        labelSecondary={`Current: ${keep.threshold}/${keep.signers.length}`}
        value={manage_signers.threshold}
        type="number"
        min={'1'}
        onChange={(e) => {
          if (parseInt(e.currentTarget.value) > manage_signers.signers.length) {
            toast(
              'error',
              `Threshold cannot be greater than the number of signers (${manage_signers.signers.length})`,
              1000,
            )
            return
          }
          setManageSigners({ ...manage_signers, threshold: parseInt(e.currentTarget.value) })
        }}
      />
    </Stack>
  )
}
