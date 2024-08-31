'use client'

import React from 'react'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { keepAbi } from '@/lib/keep'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { Address, Hex, isAddress, parseEther, parseSignature, zeroAddress } from 'viem'
import { useWriteContract } from 'wagmi'
import { z } from 'zod'

enum Operation {
  call,
  delegatecall,
  create,
}

const signatureSchema = z.object({
  user: z
    .string()
    .min(1, 'User address is required')
    .refine((val) => isAddress(val)),
  signature: z.string().min(1, 'Signature is required'),
})

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
  operation: z.nativeEnum(Operation),
  value: z.string().min(1, 'Value is required'),
  data: z.string().min(1, 'Data is required'),
  signatures: z.array(signatureSchema),
  chainId: z.number().int().positive('Chain ID must be a positive integer'),
})

type FormData = z.infer<typeof formSchema>

export const ExecuteConsole = () => {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      account: zeroAddress,
      to: zeroAddress,
      operation: Operation.call,
      value: '',
      data: '',
      signatures: [{ user: '', signature: '' }],
      chainId: 1,
    },
  })
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'signatures',
  })
  const { writeContractAsync } = useWriteContract()

  const onSubmit = async (data: FormData) => {
    try {
      const signatures = data.signatures.map((sig) => {
        const { r, s, yParity } = parseSignature(sig.signature as Hex)
        return {
          user: sig.user as Address,
          v: yParity === 0 ? 27 : 28,
          r,
          s,
        }
      })

      const txHash = await writeContractAsync({
        address: data.account,
        abi: keepAbi,
        functionName: 'execute',
        args: [data.operation, data.to, parseEther(data.value), data.data as Hex, signatures],
        chainId: data.chainId,
      })

      toast.success(`Transaction sent: ${txHash}`)
    } catch (error) {
      console.error('Error:', error)
    }
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
                    <SelectValue placeholder="Select operation" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.values(Operation).map((op) => (
                    <SelectItem key={op} value={op.toString()}>
                      {op}
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
        <div>
          <FormLabel>Signatures</FormLabel>
          {fields.map((field, index) => (
            <div key={field.id} className="flex space-x-2 mt-2">
              <FormField
                control={form.control}
                name={`signatures.${index}.user`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} placeholder="User address" />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`signatures.${index}.signature`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} placeholder="Signature" />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button type="button" onClick={() => remove(index)} variant="destructive">
                Remove
              </Button>
            </div>
          ))}
          <Button type="button" onClick={() => append({ user: '', signature: '' })} className="mt-2">
            Add Signature
          </Button>
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
