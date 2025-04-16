/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status'
import { ApiError } from '../../../errorFormating/apiError'
import { IGenericResponse } from '../../../interface/common'
import { asyncForEach } from '../../../utilities/asyncForEach'
import { connectDatabases } from '../../../utilities/bootStrap'
import { localPrisma, remotePrisma } from '../../../utilities/prisma'
// import prisma from '../../../utilities/prisma'
// import { asyncForEach } from '../../../utilities/asyncForEach'

// test db connection service
export const testDbsyncService = async (): Promise<any | null> => {
  const result = await connectDatabases()

  return result
}

// get Db Unsyncs Service
export const getDbUnsyncsService = async (
  schemaName: any,
): Promise<IGenericResponse<any[]> | null> => {
  // @ts-ignore
  const result = await localPrisma[schemaName?.schemaName].findMany({
    where: { isSynced: false },
  })

  return {
    meta: {
      total: result?.length,
      page: 0,
      limit: 0,
    },
    data: result,
  }
}

// update Unsyncs service
export const updateUnsyncsService = async (
  payload: any,
): Promise<any | null> => {
  // @ts-ignore
  const { data } = payload

  const result = await asyncForEach(data, async (singleData: any) => {
    const result = await remotePrisma.$transaction(async remoteTx => {
      // @ts-ignore
      const find = await remoteTx[payload?.schemaName].findFirst({
        where: {
          id: singleData?.id,
        },
      })

      if (find !== null) {
        // @ts-ignore
        const result = await remoteTx[payload?.schemaName].update({
          where: { id: find?.id },
          data: singleData,
        })

        if (result == null) {
          throw new ApiError(
            httpStatus.NOT_FOUND,
            'Data not updated on remote data',
          )
        }

        const update = await localPrisma.$transaction(async localTx => {
          // @ts-ignore
          const update = await localTx[payload?.schemaName].update({
            where: { id: result?.id },
            data: { isSynced: true },
          })
          return update
        })

        if (update == null) {
          throw new ApiError(
            httpStatus.NOT_FOUND,
            'Data not updated on local data',
          )
        }
        return update
      } else {
        // @ts-ignore
        const result = await remoteTx[payload?.schemaName].create({
          data: singleData,
        })

        if (result == null) {
          throw new ApiError(
            httpStatus.NOT_FOUND,
            'Data not create on remote data',
          )
        }

        const update = await localPrisma.$transaction(async localTx => {
          // @ts-ignore
          const update = await localTx[payload?.schemaName].update({
            where: { id: result?.id },
            data: { isSynced: true },
          })
          return update
        })

        if (update == null) {
          throw new ApiError(
            httpStatus.NOT_FOUND,
            'Data not updated on local data',
          )
        }
        return update
      }
    })
    return result
  })

  return result
}
