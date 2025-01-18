/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import { asyncForEach } from './utilities/asyncForEach'
import { connectDatabases } from './utilities/bootStrap'
import { errorLogger } from './utilities/logger'
import { localPrisma, remotePrisma } from './utilities/prisma'

export async function syncData() {
  try {
    await connectDatabases()
    console.log('✅ All databases connected successfully')

    try {
      // Get unsynced invoices from the local database
      const unsyncedData: any = await localPrisma.user.findMany({
        where: { isSynced: false },
      })

      if (unsyncedData.length > 0) {
        await asyncForEach(unsyncedData, async (data: any) => {
          const result = await remotePrisma.user.create({ data: data })
          // Mark as synced in the local database
          if (result) {
            await localPrisma.user.update({
              where: { id: data?.id },
              data: { isSynced: true },
            })
          }
        })
      } else {
        console.log(`No new entry`)
      }
    } catch (error) {
      errorLogger.error('Error syncing data:', error)
    }
  } catch (err) {
    console.error('❌ Error during database connection:', err)
  }
}
