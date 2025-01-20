
import { z } from 'zod'

// Create migration zod validation schema
export const createMigrationZod = z.object({
  body: z.object({
    key: z.string({
      required_error: 'Key name is required',
    }),
  }),
})
