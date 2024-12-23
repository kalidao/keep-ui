'use client'

import React from 'react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { keepAbi } from '@/lib/keep'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { Address, Hex, isAddress, parseEther, zeroAddress } from 'viem'
import { usePublicClient, useSignTypedData, useWalletClient } from 'wagmi'
import { z } from 'zod'

import { Operation } from './types'

const formSchema = z.object({
  account: z
    .string()
    .min(1, 'Account is required')
    .refine((val) => isAddress(val))
    .transform((val) => val as Address),
  to: z
    .string()
    .min(1, 'To address is required')
    .refine((val) => isAddress(val))
    .transform((val) => val as Address),
  operation: z.nativeEnum(Operation, {
    errorMap: () => ({ message: 'Operation type is required' }),
  }),
  value: z.string().min(1, 'Value is required'),
  data: z.string().min(1, 'Data is required'),
  chainId: z.number().int().positive('Chain ID must be a positive integer'),
})

type FormData = z.infer<typeof formSchema>

export const SignConsole = () => {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      account: zeroAddress,
      to: zeroAddress,
      operation: Operation.call,
      value: '',
      data: '',
      chainId: 1,
    },
  })
  const { signTypedDataAsync } = useSignTypedData()
  const [signature, setSignature] = useState<Hex>()
  const publicClient = usePublicClient()

  const onSubmit = async (data: FormData) => {
    try {
      if (!publicClient) {
        throw new Error('Public client not found')
      }
      const nonce = await publicClient.readContract({
        address: data.account,
        abi: keepAbi,
        functionName: 'nonce',
        args: [],
      })
      const signature = await signTypedDataAsync({
        domain: {
          name: 'Keep',
          version: '1',
          chainId: data.chainId,
          verifyingContract: data.account,
        },
        types: {
          Execute: [
            { name: 'op', type: 'uint8' },
            { name: 'to', type: 'address' },
            { name: 'value', type: 'uint256' },
            { name: 'data', type: 'bytes' },
            { name: 'nonce', type: 'uint120' },
          ],
        },
        primaryType: 'Execute',
        message: {
          op: data.operation,
          to: data.to as Address,
          value: parseEther(data.value),
          data: data.data as Hex,
          nonce: nonce,
        },
      })
      setSignature(signature)
    } catch (error) {
      console.error('Error:', error)
      toast.error(`Error signing transaction - ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  if (signature !== undefined) {
    return (
      <div>
        <p>Signature:</p>
        <pre>{signature}</pre>
      </div>
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="account"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Account</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="chainId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Chain ID</FormLabel>
              <FormControl>
                <Input {...field} type="number" />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="to"
          render={({ field }) => (
            <FormItem>
              <FormLabel>To</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="operation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Operation</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value.toString()}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an operation" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.entries(Operation).map(([key, value]) => (
                    <SelectItem key={key} value={value.toString()}>
                      {key}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="value"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Value (ETH)</FormLabel>
              <FormControl>
                <Input {...field} type="number" step="0.000000000000000001" />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="data"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Data (bytes)</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}