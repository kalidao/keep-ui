import { z } from 'zod'

export enum Operation {
  call = 0,
  delegatecall = 1,
  create = 2,
}

export enum TokenTemplate {
  CORE = 'CORE',
  MEMBERSHIP = 'MEMBERSHIP',
}

export const OpEnum = z.enum(['call', 'delegatecall', 'create'])

export const TokenTemplates = z.enum(['CORE', 'MEMBERSHIP'])
