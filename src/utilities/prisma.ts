import { PrismaClient } from '@prisma/client'
import config from '../config'

const prisma = new PrismaClient({
  errorFormat: 'minimal',
})

export const localPrisma = new PrismaClient({
  datasources: {
    db: { url: config.db_url },
  },
})

export const remotePrisma = new PrismaClient({
  datasources: {
    db: { url: config.remote_db_url }, // Your remote MySQL URL
  },
})

export default prisma
