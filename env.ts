import { z } from 'zod'

const envVariables = z.object({
  NEXT_PUBLIC_INFURA_ID: z.string(),
  NEXT_PUBLIC_QUICKNODE_HTTP: z.string(),
  NEXT_PUBLIC_QUICKNODE_WS: z.string(),
  NEXT_PUBLIC_PINATA_JWT: z.string(),
  NEXT_PUBLIC_KEEP_API: z.string(),
  NEXT_PUBLIC_DYNAMIC_ID: z.string(),
  NEXT_PUBLIC_COVALENT_API_KEY: z.string(),

  NEXT_PUBLIC_ETHERSCAN_API_KEY: z.string(),
  NEXT_PUBLIC_POLYGONSCAN_API_KEY: z.string(),
})

envVariables.parse(process.env)

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envVariables> {}
  }
}
