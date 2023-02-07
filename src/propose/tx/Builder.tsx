import React, { useEffect, useState } from 'react'
import { ChangeEvent } from 'react'

import { Button, Heading, Input, Stack, Textarea, vars } from '@kalidao/reality'
import { ethers } from 'ethers'
import { Toaster, toast } from 'react-hot-toast'
import { useKeepStore } from '~/dashboard/useKeepStore'
import { fetchContractAbi } from '~/utils/abi'

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@design/Select'

import { useSendStore } from './useSendStore'

export const Builder = () => {
  const state = useSendStore((state) => state)
  const chainId = useKeepStore((state) => state.chainId)
  const [abi, setAbi] = useState<string>('')
  const [selectedFunction, setSelectedFunction] = useState<any>()
  const [selectedFunctionInputs, setSelectedFunctionInputs] = useState<any>([])

  const getABI = async () => {
    if (!chainId) {
      return
    }

    if (ethers.utils.isAddress(state.to)) {
      const abi = await fetchContractAbi(state.to, chainId)
      if (abi) {
        setAbi(JSON.stringify(abi))
        setSelectedFunction(undefined)
        setSelectedFunctionInputs([])
      } else {
        toast('No ABI found for this contract.', {
          icon: '😞',
          style: {
            borderRadius: vars.radii['2xLarge'],
            background: vars.colors.backgroundTertiary,
            color: vars.colors.textPrimary,
          },
          position: 'top-center',
        })
      }
    } else {
      toast('Please enter a valid address.', {
        icon: '🔒',
        style: {
          borderRadius: vars.radii['2xLarge'],
          background: vars.colors.backgroundTertiary,
          color: vars.colors.textPrimary,
        },
        position: 'top-center',
      })
    }
  }

  // filter out functions from abi
  const functions = abi
    ? JSON.parse(abi)
        .filter((item: any) => item.type === 'function')
        .filter((item: any) => {
          return item.stateMutability !== 'pure' && item.stateMutability !== 'view'
        })
    : []

  console.log('funcs', selectedFunction, selectedFunctionInputs)

  return (
    <>
      <Stack>
        <Heading level="2">Tx Builder</Heading>
        <Input
          label="Contract Address"
          description="The address to which this transaction is directed at."
          placeholder="0x"
          value={state.to}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            state.setTo(e.currentTarget.value as `0x${string}`)
          }}
        />
        <Input
          label="Transaction Value"
          type="number"
          description="The amount of native token to send with this transaction."
          placeholder="0.0"
          min="0"
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            state.setValue(e.currentTarget.value)
          }}
        />
        <Textarea
          label="ABI"
          description="The ABI of the contract you are interacting with."
          placeholder="[]"
          value={abi}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
            setAbi(e.currentTarget.value)
          }}
        />
        <Button onClick={getABI}>Fetch ABI</Button>
        {functions.length > 0 && (
          <Select value={selectedFunction} onValueChange={(value) => setSelectedFunction(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select Function" />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectGroup>
                {functions.map((item: any) => (
                  <SelectItem key={item.name} value={item} onClick={() => setSelectedFunction(item)}>
                    {item.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
        {selectedFunction && (
          <Stack>
            {selectedFunction.inputs.map((input: any, index: number) => (
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
              />
            ))}
          </Stack>
        )}
      </Stack>
      <Toaster />
    </>
  )
}
