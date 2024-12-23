'use client'

import React, { useEffect, useState } from 'react'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { get } from '@vercel/blob'

import { CreateProposals } from './create-proposals'
import { ExecuteConsole } from './execute-console'
import Proposals from './proposals'
import { SignConsole } from './sign-console'

export interface Proposal {
  id: string
  title: string
  description: string
  status: 'pending' | 'approved' | 'rejected'
  createdAt: string
  blobUrl?: string // URL to the stored proposal document if any
  signatures?: string[] // Array of wallet addresses that signed
}

export const AdminConsole = () => {
  const [proposals, setProposals] = useState<Proposal[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchProposals()
  }, [])

  const fetchProposals = async () => {
    try {
      setLoading(true)
      // Try to fetch the proposals index file from Vercel Blob
      const response = await fetch('/api/proposals')

      if (!response.ok) {
        throw new Error('Failed to fetch proposals')
      }

      const data = await response.json()
      setProposals(data)
    } catch (err) {
      console.error('Error fetching proposals:', err)
      setError(err instanceof Error ? err.message : 'Failed to fetch proposals')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Tabs defaultValue="proposals" className="p-8 bg-zinc-100 border-2 border-white rounded-md w-full h-full">
      <TabsList>
        <TabsTrigger value="proposals">Proposals</TabsTrigger>
        <TabsTrigger value="create">Create</TabsTrigger>
      </TabsList>
      <TabsContent value="proposals">
        <Proposals />
      </TabsContent>
      <TabsContent value="create">
        <CreateProposals />
      </TabsContent>
    </Tabs>
  )
}
