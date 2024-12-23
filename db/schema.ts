import { integer, pgTable, primaryKey, timestamp, varchar } from 'drizzle-orm/pg-core'

export const proposalsTable = pgTable(
  'proposals',
  {
    nonce: integer().notNull(),

    sender: varchar({ length: 42 }).notNull(),
    target: varchar({ length: 42 }).notNull(),
    value: varchar({ length: 78 }).notNull(),
    data: varchar({ length: 1000 }).notNull(),

    proposer: varchar({ length: 42 }).notNull(),
    status: varchar({ length: 10 }).notNull().default('pending'),
    txHash: varchar({ length: 66 }),
    createdAt: timestamp().notNull().defaultNow(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.nonce, table.sender] }),
  }),
)

export const signaturesTable = pgTable(
  'signatures',
  {
    signer: varchar({ length: 42 }).notNull(),
    nonce: integer().notNull(),
    sender: varchar({ length: 42 }).notNull(),
    signature: varchar().notNull(),
    createdAt: timestamp().notNull().defaultNow(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.nonce, table.sender, table.signer] }),
  }),
)
