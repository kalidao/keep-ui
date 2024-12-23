'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { addSignature } from '@/db/functions'
import { useProposals } from '@/hooks/use-proposals'
import { useSignatures } from '@/hooks/use-signatures'
import { keepAbi } from '@/lib/keep'
import { toast } from 'sonner'
import { Address, Hex, parseEther, parseSignature } from 'viem'
import { useAccount, usePublicClient, useSignTypedData, useWriteContract } from 'wagmi'

type ProposalCardProps = {
  proposal: {
    nonce: number
    status: string
    sender: string
    target: string
    value: string
    data: string
    createdAt: Date
    txHash?: string
  }
}

const ProposalCard = ({ proposal }: ProposalCardProps) => {
  const publicClient = usePublicClient()
  const { signTypedDataAsync } = useSignTypedData()
  const { address } = useAccount()
  const { writeContractAsync } = useWriteContract()
  const { data: signatures } = useSignatures(proposal.sender, proposal.nonce)

  const handleSign = async () => {
    try {
      if (!publicClient) {
        throw new Error('Public client not found')
      }

      if (!address) {
        throw new Error('Wallet not connected')
      }

      const signature = await signTypedDataAsync({
        domain: {
          name: 'Keep',
          version: '1',
          chainId: 1, // TODO: Get chain ID dynamically
          verifyingContract: proposal.sender as Address,
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
          op: 0, // Assuming Operation.call
          to: proposal.target as Address,
          value: parseEther(proposal.value),
          data: proposal.data as Hex,
          nonce: BigInt(proposal.nonce),
        },
      })

      await addSignature({
        signer: address,
        nonce: proposal.nonce.toString(),
        sender: proposal.sender.toString(),
        signature: signature.toString(),
      })

      toast.success('Proposal signed successfully')
    } catch (error) {
      console.error('Error:', error)
      toast.error(`Error signing proposal - ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  const handleExecute = async () => {
    try {
      if (!address) {
        throw new Error('Wallet not connected')
      }

      if (!signatures) {
        throw new Error('Not enough signatures')
      }

      const formattedData = proposal.data.startsWith('0x') ? proposal.data : `0x${proposal.data}`

      const formattedSignatures = signatures.map((sig) => {
        const { r, s, yParity } = parseSignature(sig.signature as Hex)
        return {
          user: sig.signer as Address,
          v: yParity === 0 ? 27 : 28,
          r,
          s,
        }
      })

      const txHash = await writeContractAsync({
        address: proposal.sender as Address,
        abi: keepAbi,
        functionName: 'execute',
        args: [0, proposal.target as Address, parseEther(proposal.value), formattedData as Hex, formattedSignatures],
        chainId: 1, // TODO: Get chain ID dynamically
      })

      toast.success(`Transaction sent: ${txHash}`)
    } catch (error) {
      console.error('Error:', error)
      toast.error(`Error executing proposal - ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Proposal #{proposal.nonce}</CardTitle>
        <CardDescription>Status: {proposal.status}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Sender: {proposal.sender}</p>
        <p>Target: {proposal.target}</p>
        <p>Value: {proposal.value}</p>
        <p>Data: {proposal.data}</p>
        <p>Created: {proposal.createdAt.toLocaleDateString()}</p>
        {proposal.txHash && <p>Transaction: {proposal.txHash}</p>}
        <div className="flex gap-2 mt-4">
          <Button variant="outline">View Details</Button>
          <Button onClick={handleSign}>Sign</Button>
          <Button onClick={handleExecute}>Execute</Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default function Proposals() {
  const { data, isLoading, isError, error } = useProposals()
  return (
    <div className="container mx-auto py-10">
      {isLoading && <div className="text-center">Loading proposals...</div>}

      {isError && <div className="text-center text-red-500">Error loading proposals: {error?.message}</div>}

      {!isLoading && !isError && (
        <div className="grid gap-4">
          {data && data.length === 0 ? (
            <div className="text-center">No proposals</div>
          ) : (
            data && data.map((proposal, index) => <ProposalCard key={index} proposal={proposal} />)
          )}
        </div>
      )}
    </div>
  )
}
