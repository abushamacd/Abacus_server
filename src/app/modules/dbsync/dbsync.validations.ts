
import { z } from 'zod'

// Create dbsync zod validation schema
export const createDbsyncZod = z.object({
  body: z.object({
    key: z.string({
      required_error: 'Key name is required',
    }),
  }),
})
