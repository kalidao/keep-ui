import { JSONContent } from '@tiptap/react'
import { ethers } from 'ethers'
import { create } from 'zustand'

import { CrowdsaleData, GovernanceData, IdentityData, LegalData, MembersData, RedemptionData } from './type'

const stepVariant = {
  1: 'identity',
  2: 'governance',
  3: 'redemption',
  4: 'crowdsale',
  5: 'founders',
  6: 'legal',
}

type setDataType =
  | { step: 1; data: IdentityData }
  | { step: 2; data: GovernanceData }
  | { step: 3; data: RedemptionData }
  | { step: 4; data: CrowdsaleData }
  | { step: 5; data: MembersData }
  | { step: 6; data: LegalData }

export type DaoStore = {
  title: string
  setTitle: (title: string) => void
  content: JSONContent
  setContent: (content: JSONContent) => void
  author: string
  setAuthor: (author: string) => void

  hardMode: boolean
  setHardMode: (hardMode: boolean) => void

  open: boolean
  setOpen: (open: boolean) => void

  identity: IdentityData
  governance: GovernanceData
  redemption: RedemptionData
  crowdsale: CrowdsaleData
  founders: MembersData
  legalData: LegalData

  setDaoData: ({ step, data }: setDataType) => void

  reset: () => void
}

export const useDaoStore = create<DaoStore>((set) => ({
  title: '',
  setTitle: (title) => set({ title }),
  content: {},
  setContent: (content) => set({ content }),
  author: '',
  setAuthor: (author) => set({ author }),

  hardMode: false,
  setHardMode: (hardMode) => set({ hardMode }),

  open: false,
  setOpen: (open) => set({ open }),

  identity: { name: '', symbol: '' },
  governance: { votingPeriod: 1, votingPeriodUnit: 'day', quorum: 20, approval: 60, transferability: false },
  redemption: { redemption: false, redemptionStart: new Date().toDateString() },
  crowdsale: {
    crowdsale: false,
    purchaseToken: 'eth',
    customTokenAddress: '',
    purchaseLimit: 10000,
    personalLimit: 100,
    purchaseMultiplier: 10,
    crowdsaleEnd: new Date().toDateString(),
  },
  founders: [{ member: '', share: 100 }],
  legalData: { legal: false, docType: 'none', email: '', mission: '', existingDocs: '' },

  setDaoData: ({ step, data }) =>
    set((state) => ({
      ...state,
      [stepVariant[step]]: data,
    })),
  reset: () => {
    set({
      hardMode: false,
      identity: { name: '', symbol: '' },
      governance: { votingPeriod: 1, votingPeriodUnit: 'day', quorum: 20, approval: 60, transferability: false },
      redemption: { redemption: false, redemptionStart: new Date().toDateString() },
      crowdsale: {
        crowdsale: false,
        purchaseToken: 'eth',
        customTokenAddress: '',
        purchaseLimit: 10000,
        personalLimit: 100,
        purchaseMultiplier: 10,
        crowdsaleEnd: new Date().toDateString(),
      },
      founders: [{ member: '', share: 100 }],
      legalData: { legal: false, docType: 'none', email: '', mission: '', existingDocs: '' },
      open: false,
    })
  },
}))
