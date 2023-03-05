import React from 'react'

import { useRouter } from 'next/router'

import { useDynamicContext } from '@dynamic-labs/sdk-react'
import {
  Box,
  Button,
  IconExclamationCircle,
  IconMinus,
  IconNFT,
  IconTokens,
  IconUserGroupSolid,
  Text,
} from '@kalidao/reality'
import { ReactNodeNoStrings } from '@kalidao/reality/dist/types/types'
import { useFormContext } from 'react-hook-form'
import { useContractRead } from 'wagmi'
import { KEEP_ABI } from '~/constants'
import { useKeepStore } from '~/dashboard/useKeepStore'
import { usePreflight } from '~/hooks/usePreflight'

import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@design/Command'
import { Popover, PopoverContent, PopoverTrigger } from '@design/Popover'
import toast from '@design/Toast'

import { getTxHash } from '../getTxHash'
import { createSignal } from '../signal/createSignal'
import { Builder } from './Builder'
import { ManageSigners } from './ManageSigners'
import { SendNFT } from './SendNFT'
import { SendToken } from './SendToken'
import { sendTx } from './sendTx'
import { useSendStore } from './useSendStore'

type Action = {
  component: React.ReactNode
  value: string
  label: string
  icon?: ReactNodeNoStrings
}

export const actions: Action[] = [
  {
    component: <SendToken />,
    value: 'send_token',
    label: 'Send Token',
    icon: <IconTokens />,
  },
  {
    component: <SendNFT />,
    value: 'send_nft',
    label: 'Send NFT',
    icon: <IconNFT />,
  },
  {
    component: <Builder />,
    value: 'builder',
    label: 'Call Builder',
    icon: <IconExclamationCircle />,
  },
  {
    component: <ManageSigners />,
    value: 'manage_signers',
    label: 'Manage Signers',
    icon: <IconUserGroupSolid />,
  },
  {
    component: null,
    value: 'none',
    label: 'None',
    icon: <IconMinus />,
  },
]

const action_types = actions.map((action) => action.value)

export type ActionTypes = (typeof action_types)[number]

export const Toolbox = () => {
  const router = useRouter()
  const keep = useKeepStore((state) => state)
  const tx = useSendStore((state) => state)
  const { user, setShowAuthFlow } = useDynamicContext()
  const { preflight } = usePreflight()
  const { data: nonce, refetch: refetchNonce } = useContractRead({
    address: keep.address as `0xstring`,
    abi: KEEP_ABI,
    functionName: 'nonce',
    chainId: Number(keep.chainId),
  })
  const [open, setOpen] = React.useState(false)
  const { setValue } = useFormContext()

  const notSigner =
    keep?.signers?.find((s: string) => s === user?.walletPublicKey?.toLowerCase()) == undefined ? true : false

  const currentAction = tx.action ? actions.find((action) => action.value === tx.action) : null

  return (
    <Box display={'flex'} alignItems="center" gap="4">
      <Text color="textSecondary" weight="semiBold">
        Action
      </Text>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="secondary" size="small" prefix={currentAction?.icon}>
            {currentAction ? <>{currentAction.label}</> : <>+ Add Action</>}
          </Button>
        </PopoverTrigger>
        <PopoverContent side="right" align="start">
          <Command>
            <CommandInput placeholder="Add or remove action" />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {actions.map((action) => (
                  <CommandItem
                    key={action.value}
                    value={action.value}
                    onSelect={(value: string) => {
                      const relevant = actions.find((priority) => priority.value == value)?.value || 'none'
                      console.log('relevant', relevant)
                      tx.setAction(relevant)
                      setValue('action', relevant)
                      setOpen(false)
                    }}
                  >
                    <Box>{action.icon}</Box>
                    <Box>{action.label}</Box>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </Box>
  )
}
