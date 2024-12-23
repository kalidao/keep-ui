'use client'

import { fetchSignaturesByProposal } from '@/db/functions'
import { useQuery } from '@tanstack/react-query'

export const useSignatures = (sender: string, nonce: number) => {
  return useQuery({
    queryKey: ['signatures', sender, nonce],
    queryFn: () => fetchSignaturesByProposal(sender, nonce),
  })
}
