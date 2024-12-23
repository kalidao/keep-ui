'use client'

import { fetchAllProposals } from '@/db/functions'
import { useQuery } from '@tanstack/react-query'

export const useProposals = () => {
  return useQuery({
    queryKey: ['proposals'],
    queryFn: () => fetchAllProposals(),
  })
}
