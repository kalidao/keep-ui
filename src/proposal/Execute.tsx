import { Button, Stack } from '@kalidao/reality'
import { ethers } from 'ethers'
import { useContractWrite, usePrepareContractWrite } from 'wagmi'
import { KEEP_ABI } from '~/constants'
import { Sig } from '~/dashboard/types'
import { useKeepStore } from '~/dashboard/useKeepStore'
import { useTxStore } from '~/dashboard/useTxStore'
import { toOp } from '~/utils/toOp'

import toast from '@design/Toast'

type Sign = {
  user: `0xstring`
  v: number
  r: `0xstring`
  s: `0xstring`
}

const Execute = () => {
  const keep = useKeepStore((state) => state)
  const tx = useTxStore((state) => state)
  const op: number = tx?.op ? toOp(tx.op) : 0

  const yesSigs = tx?.sigs
    ?.filter((sig: Sig) => sig.type === 'yes')
    ?.map((sig: any) => (sig = [sig.userId, sig.v, sig.r, sig.s]))
    .sort((a: any[], b: any[]) => +a[0] - +b[0])
  const noSigs = tx?.sigs
    ?.filter((sig: Sig) => sig.type === 'no')
    ?.map((sig: any) => (sig = [sig.userId, sig.v, sig.r, sig.s]))
    .sort((a: any[], b: any[]) => +a[0] - +b[0])

  const { config: configYes, error: configYesError } = usePrepareContractWrite({
    address: keep.address ? keep.address : ethers.constants.AddressZero,
    abi: KEEP_ABI,
    chainId: keep.chainId,
    functionName: 'execute',
    args: [
      op,
      tx?.to ? (tx?.to as `0xstring`) : ethers.constants.AddressZero,
      tx?.value ? ethers.BigNumber.from(tx?.value) : ethers.BigNumber.from(0),
      tx?.data ? (tx?.data as `0xstring`) : ethers.constants.HashZero,
      yesSigs as unknown as Sign[],
    ],
  })
  const { write: sayYes, error: yesError } = useContractWrite({
    ...configYes,
    onSuccess: () => {
      toast('success', 'Transaction executed!')
    },
    onError: (error: any) => {
      toast('error', error.message)
    },
  })

  const { config: configNo, error: configNoError } = usePrepareContractWrite({
    address: keep.address ? keep.address : ethers.constants.AddressZero,
    abi: KEEP_ABI,
    chainId: keep.chainId,
    functionName: 'execute',
    args: [
      0,
      ethers.constants.AddressZero,
      ethers.BigNumber.from(0),
      ethers.constants.HashZero,
      noSigs as unknown as Sign[],
    ],
  })
  const { write: sayNo, error: noError } = useContractWrite(configNo)

  console.log({
    yesSigs,
    noSigs,
    configYes,
    configNo,
    sayYes,
    sayNo,
    yesError,
    noError,
    configYesError,
    configNoError,
  })
  if (tx?.status === 'process_yes') {
    return (
      <Button
        disabled={!sayYes}
        tone="green"
        onClick={async () => {
          await sayYes?.()
          toast('success', 'Transaction submitted on-chain!')
        }}
      >
        Execute
      </Button>
    )
  }

  if (tx?.status === 'process_no') {
    return (
      <Button
        disabled={!sayNo}
        tone="red"
        onClick={async () => {
          await sayNo?.()
          toast('success', 'Transaction submitted!')
        }}
      >
        Cancel
      </Button>
    )
  }

  if (tx?.status === 'process') {
    return (
      <Stack direction="horizontal" align="center" justify={'flex-start'}>
        <Button
          disabled={!sayYes}
          tone="green"
          onClick={async () => {
            await sayYes?.()
            toast('success', 'Transaction submitted!')
          }}
        >
          Execute
        </Button>
        <Button
          disabled={!sayNo}
          tone="red"
          onClick={async () => {
            await sayNo?.()
            toast('success', 'Transaction submitted!')
          }}
        >
          Cancel
        </Button>
      </Stack>
    )
  }

  return null
}

export default Execute
