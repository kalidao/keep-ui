import { Stack, Button } from '@kalidao/reality'
import { useTxStore } from '~/dashboard/useTxStore'
import DownVote from './DownVote'
import UpVote from './UpVote'
import { toOp } from '~/utils/toOp'
import { usePrepareContractWrite, useContractWrite } from 'wagmi'
import { ethers } from 'ethers'
import { KEEP_ABI } from '~/constants'
import { useKeepStore } from '~/dashboard/useKeepStore'

type Sign = {
  user: `0xstring`
  v: number
  r: `0xstring`
  s: `0xstring`
}

type Sig = {
  signer: string
  type: 'yes' | 'no'
  v: string
  r: string
  s: string
}

const Execute = () => {
  const keep = useKeepStore((state) => state)
  const tx = useTxStore((state) => state)
  const op: number = tx?.op ? toOp(tx.op) : 0
  const yesSigs = tx?.sigs
    ?.filter((sig: Sig) => sig.type === 'yes')
    ?.map((sig: any) => (sig = [sig.signer, sig.v, sig.r, sig.s]))
    .sort((a: any[], b: any[]) => +a[0] - +b[0])
  const noSigs = tx?.sigs
    ?.filter((sig: Sig) => sig.type === 'no')
    ?.map((sig: any) => (sig = [sig.signer, sig.v, sig.r, sig.s]))
    .sort((a: any[], b: any[]) => +a[0] - +b[0])

  const { config: configYes } = usePrepareContractWrite({
    address: keep.address ? keep.address : ethers.constants.AddressZero,
    abi: KEEP_ABI,
    chainId: keep.chainId,
    functionName: 'execute',
    args: [
      op,
      tx?.to ? (tx?.to as `0xstring`) : ethers.constants.AddressZero,
      tx?.value ? ethers.BigNumber.from(tx?.value) : ethers.BigNumber.from(0),
      tx?.data ? (tx?.data as `0xstring`) : ethers.constants.HashZero,
      (yesSigs as unknown) as Sign[],
    ],
  })
  const { write: sayYes } = useContractWrite(configYes)

  const { config: configNo } = usePrepareContractWrite({
    address: keep.address ? keep.address : ethers.constants.AddressZero,
    abi: KEEP_ABI,
    chainId: keep.chainId,
    functionName: 'execute',
    args: [
      0,
      ethers.constants.AddressZero,
      ethers.BigNumber.from(0),
      ethers.constants.HashZero,
      (noSigs as unknown) as Sign[],
    ],
  })
  const { write: sayNo } = useContractWrite(configNo)

  if (tx?.status === 'process_yes') {
    return (
      <Button disabled={!sayYes} tone="green" onClick={() => sayYes?.()}>
        Execute
      </Button>
    )
  }

  if (tx?.status === 'process_no') {
    return (
      <Button disabled={!sayNo} tone="red" onClick={() => sayNo?.()}>
        Cancel
      </Button>
    )
  }

  if (tx?.status === 'process') {
    return (
      <Stack direction="horizontal" align="center" justify={'flex-start'}>
        <Button disabled={!sayYes} tone="green" onClick={() => sayYes?.()}>
          Execute
        </Button>
        <Button disabled={!sayNo} tone="red" onClick={() => sayNo?.()}>
          Cancel
        </Button>
      </Stack>
    )
  }

  return null
}

export default Execute
