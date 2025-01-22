/* eslint-disable no-console */
import { PrismaClient } from '@prisma/client'

export async function getSchemaNames() {
  const prisma = new PrismaClient()

  const schemaNames = (Object.keys(prisma) as (keyof typeof prisma)[]).filter(
    key =>
      typeof prisma[key] === 'object' &&
      prisma[key] !== null &&
      'findMany' in prisma[key] &&
      key !== '$on' &&
      key !== '$connect' &&
      key !== '$disconnect' &&
      key !== '$use' &&
      key !== '$transaction' &&
      key !== '$extends',
  )
  return schemaNames
}
