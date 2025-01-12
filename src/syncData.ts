/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import { asyncForEach } from './utilities/asyncForEach'
import { connectDatabases } from './utilities/bootStrap'
import { errorLogger } from './utilities/logger'
import { localPrisma } from './utilities/prisma'

export async function syncData() {
  try {
    await connectDatabases()
    console.log('✅ All databases connected successfully')

    try {
      // Get unsynced invoices from the local database
      const unsyncedData: any = await localPrisma.user.findMany({
        where: { isSynced: false },
      })

      await asyncForEach(unsyncedData, async (product: any) => {
        console.log(product)
      })
    } catch (error) {
      errorLogger.error('Error syncing invoices:', error)
    }
  } catch (err) {
    console.error('❌ Error during database connection:', err)
  }
}
