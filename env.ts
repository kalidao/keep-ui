import { z } from 'zod'

const envVariables = z.object({
  NEXT_PUBLIC_INFURA_ID: z.string(),
  NEXT_PUBLIC_QUICKNODE_HTTP: z.string(),
  NEXT_PUBLIC_QUICKNODE_WS: z.string(),
  NEXT_PUBLIC_PINATA_JWT: z.string(),
  NEXT_PUBLIC_KEEP_API: z.string(),
  NEXT_PUBLIC_POLYGONSCAN_API_KEY: z.string(),
  NEXT_PUBLIC_DYNAMIC_ID: z.string(),
})

envVariables.parse(process.env)

declare global {
  namespace NodeJS {
    // Property 'SOMETHING_COOL' of type 'number' is not assignable
    // to 'string' index type 'string | undefined'.
    interface ProcessEnv extends z.infer<typeof envVariables> {}
  }
}

console.log(process.env.SOMETHING_COOL)
