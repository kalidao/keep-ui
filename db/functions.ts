'use server'

import { and, desc, eq } from 'drizzle-orm'

import { db } from '.'
import { proposalsTable, signaturesTable } from './schema'

export async function fetchAllProposals() {
  return await db.select().from(proposalsTable).orderBy(desc(proposalsTable.createdAt))
}

export async function fetchProposalsByStatus(status: string) {
  return await db
    .select()
    .from(proposalsTable)
    .where(eq(proposalsTable.status, status))
    .orderBy(desc(proposalsTable.createdAt))
}

export async function fetchProposalBySenderAndNonce(sender: string, nonce: number) {
  return await db
    .select()
    .from(proposalsTable)
    .where(and(eq(proposalsTable.sender, sender), eq(proposalsTable.nonce, nonce)))
    .limit(1)
}

export async function fetchSignaturesByProposal(sender: string, nonce: number) {
  return await db
    .select()
    .from(signaturesTable)
    .where(and(eq(signaturesTable.sender, sender), eq(signaturesTable.nonce, nonce)))
}

export async function addProposal({
  nonce,
  sender,
  target,
  value,
  data,
  proposer,
}: {
  nonce: number
  sender: string
  target: string
  value: string
  data: string
  proposer: string
}) {
  return await db.insert(proposalsTable).values({
    nonce,
    sender: sender.toLowerCase(),
    target: target.toLowerCase(),
    value,
    data,
    proposer: proposer.toLowerCase(),
  })
}

export async function addSignature({
  signer,
  nonce,
  sender,
  signature,
}: {
  signer: string
  nonce: string
  sender: string
  signature: string
}) {
  return await db.insert(signaturesTable).values({
    signer: signer.toLowerCase(),
    nonce: Number(nonce),
    sender: sender.toLowerCase(),
    signature,
  })
}
