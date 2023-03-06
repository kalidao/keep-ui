import React, { useState } from 'react'
import { ChangeEvent } from 'react'

import { Button, Input, Stack, Textarea } from '@kalidao/reality'
import { ethers } from 'ethers'
import { useFormContext } from 'react-hook-form'
import { useKeepStore } from '~/dashboard/useKeepStore'
import { fetchContractAbi } from '~/utils/abi'

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@design/Select'
import toast from '@design/Toast'

import { useSendStore } from './useSendStore'

interface ABI_ITEM {
  name: string
  inputs: any[]
  outputs: any[]
  payable: boolean
  stateMutability: string
  type: string
  constant: boolean
}

const parseFuncs = (abi: string) => {
  try {
    if (abi === '') return []
    const abiParsed = JSON.parse(abi)

    const parsed = abiParsed
      .filter((item: ABI_ITEM) => item.type === 'function')
      .filter((item: ABI_ITEM) => item.stateMutability !== 'view')

    // FILTER OUT ITEM.STATEMUTABILITY === 'VIEW'

    console.log(parsed)

    return parsed
  } catch (e) {
    console.error(e)
    return []
  }
}

export const Builder = () => {
  const state = useSendStore((state) => state)
  const chainId = useKeepStore((state) => state.chainId)
  const [abi, setAbi] = useState<string>('')
  const [selectedFunctionName, setSelectedFunctionName] = useState<string>()
  const [selectedFunctionInputs, setSelectedFunctionInputs] = useState<any>([])
  const {
    register,
    setValue,
    formState: { errors },
    setError,
  } = useFormContext()

  const getABI = async () => {
    if (!chainId) {
      return
    }

    if (ethers.utils.isAddress(state.to)) {
      const abi = await fetchContractAbi(state.to, chainId)

      if (abi) {
        setAbi(JSON.stringify(abi, undefined, 3))
        setSelectedFunctionName(undefined)
        setSelectedFunctionInputs([])
      } else {
        toast('error', 'No ABI found for this contract.')
      }
    } else {
      toast('error', 'Please enter a valid address.')
    }
  }

  // safely parse abi for functions
  let functions: ABI_ITEM[] = abi ? parseFuncs(abi) : []

  const prepareTx = () => {
    if (!selectedFunctionName) {
      toast('error', 'Please select a function.')
      return
    }

    const iface = new ethers.utils.Interface(abi)
    const tx = iface.encodeFunctionData(selectedFunctionName, selectedFunctionInputs)
    state.setData(tx as `0x${string}`)
  }

  return (
    <Stack>
      <Input
        label="Contract Address"
        description="The address to which this transaction is directed at."
        placeholder="0x"
        {...register('to')}
      />
      <Textarea
        label="ABI"
        description="The ABI of the contract you are interacting with."
        placeholder="[]"
        value={abi}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
          setAbi(e.currentTarget.value)
        }}
        error={<>{errors?.abi?.message}</>}
      />
      <Button onClick={getABI} variant="secondary" size="small">
        Fetch ABI
      </Button>
      {functions.length > 0 && (
        <Select
          onValueChange={(value) => {
            setSelectedFunctionName(value)
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Function" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectGroup>
              {functions.map((item: ABI_ITEM, index: number) => (
                <SelectItem key={index} value={item.name}>
                  {item.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      )}
      {selectedFunctionName && (
        <Stack>
          {functions
            .find((item: ABI_ITEM) => item.name === selectedFunctionName)
            ?.inputs?.map((input: any, index: number) => (
              <Input
                key={input.name}
                label={input.name}
                description={input.type}
                placeholder={input.type}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setSelectedFunctionInputs((prev: any) => {
                    prev[index] = e.currentTarget.value
                    return prev
                  })
                }}
                required
              />
            ))}
        </Stack>
      )}
      {selectedFunctionName &&
        functions.find((item: ABI_ITEM) => item.name === selectedFunctionName)?.payable === true && (
          <Input
            label="Transaction Value"
            type="number"
            description="The amount of native token to send with this transaction."
            placeholder="0.0"
            min="0"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              if (
                e.currentTarget.value === '' ||
                e.currentTarget.value === '0' ||
                e.currentTarget.value === undefined
              ) {
                state.setValue('0')
                return
              }
              state.setValue(ethers.utils.parseEther(e.currentTarget.value).toString())
            }}
          />
        )}
      <Button onClick={prepareTx} variant="secondary" size="small">
        Prepare Transaction
      </Button>
    </Stack>
  )
}
