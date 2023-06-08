export type IdentityData = {
  name: string
  symbol: string
}
export type GovernanceData = {
  votingPeriod: number
  votingPeriodUnit: string //'day'|'min'|'hour'
  quorum: number
  approval: number
  transferability: boolean
}
export type RedemptionData = {
  redemption: boolean
  redemptionStart: string
}
export type CrowdsaleData = {
  crowdsale: boolean
  purchaseToken: string
  customTokenAddress: string
  purchaseLimit: number
  personalLimit: number
  purchaseMultiplier: number
  crowdsaleEnd: string
}
interface Founders {
  member: string
  share: number
}
export type MembersData = {
  member: string
  share: number
}[]
export type LegalData = {
  legal: boolean
  docType: string
  email: string
  mission: string
  existingDocs: string
}
// export type CheckoutData = {}

export type FormData = IdentityData & GovernanceData & RedemptionData & CrowdsaleData & MembersData & LegalData
