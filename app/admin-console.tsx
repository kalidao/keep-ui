'use client'

import React from 'react'

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

export const AdminConsole = () => {
  const { control, handleSubmit } = useForm<FormData>({
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
    control,
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="account" className="block text-sm font-medium text-gray-700">
          Account
        </label>
        <Controller
          name="account"
          control={control}
          render={({ field }) => (
            <input {...field} type="text" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm" />
          )}
        />
      </div>
      <div>
        <label htmlFor="to" className="block text-sm font-medium text-gray-700">
          To
        </label>
        <Controller
          name="to"
          control={control}
          render={({ field }) => (
            <input {...field} type="text" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm" />
          )}
        />
      </div>
      <div>
        <label htmlFor="operation" className="block text-sm font-medium text-gray-700">
          Operation
        </label>
        <Controller
          name="operation"
          control={control}
          render={({ field }) => (
            <select {...field} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm">
              {Object.values(Operation).map((op) => (
                <option key={op} value={op}>
                  {op}
                </option>
              ))}
            </select>
          )}
        />
      </div>
      <div>
        <label htmlFor="value" className="block text-sm font-medium text-gray-700">
          Value (ETH)
        </label>
        <Controller
          name="value"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="number"
              step="0.000000000000000001"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            />
          )}
        />
      </div>
      <div>
        <label htmlFor="data" className="block text-sm font-medium text-gray-700">
          Data (bytes)
        </label>
        <Controller
          name="data"
          control={control}
          render={({ field }) => (
            <textarea {...field} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm" />
          )}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Signatures</label>
        {fields.map((field, index) => (
          <div key={field.id} className="flex space-x-2 mt-2">
            <Controller
              name={`signatures.${index}.user`}
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  placeholder="User address"
                  className="flex-1 border border-gray-300 rounded-md shadow-sm"
                />
              )}
            />
            <Controller
              name={`signatures.${index}.signature`}
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  placeholder="Signature"
                  className="flex-1 border border-gray-300 rounded-md shadow-sm"
                />
              )}
            />
            <button type="button" onClick={() => remove(index)} className="text-red-500">
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={() => append({ user: '', signature: '' })} className="mt-2 text-blue-500">
          Add Signature
        </button>
      </div>
      <div>
        <label htmlFor="chainId" className="block text-sm font-medium text-gray-700">
          Chain ID
        </label>
        <Controller
          name="chainId"
          control={control}
          render={({ field }) => (
            <input {...field} type="number" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm" />
          )}
        />
      </div>
      <button
        type="submit"
        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Submit
      </button>
    </form>
  )
}
