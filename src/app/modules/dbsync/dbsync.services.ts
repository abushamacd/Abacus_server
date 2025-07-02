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
import config from '../../../config'

// Test database connection service
export const testDbsyncService = async (): Promise<any | null> => {
  const result = await connectDatabases()

  return result
}

// Get unsyncs Service
export const getDbUnsyncsService = async (
  path: string,
  schemaName: any,
): Promise<IGenericResponse<any[]> | null> => {
  // Get data from local
  if (path === 'unSyncLtoR') {
    // @ts-ignore
    const unsyncedData = await localPrisma[schemaName?.schemaName].findMany({
      where: { isSynced: false },
    })

    return {
      meta: {
        total: unsyncedData.length,
        page: 0,
        limit: 0,
      },
      data: unsyncedData,
    }
  }
  // Get data from remote
  if (path === 'unSyncRtoL') {
    // @ts-ignore
    const unsyncedData = await remotePrisma[schemaName?.schemaName].findMany({
      where: { isSynced: false },
    })

    return {
      meta: {
        total: unsyncedData.length,
        page: 0,
        limit: 0,
      },
      data: unsyncedData,
    }
  }

  return null
}

// Update unsyncs service
export const updateUnsyncsService = async (
  path: string,
  payload: any,
): Promise<any | null> => {
  // @ts-ignore
  const { data } = payload

  // Local to Remote
  if (path === 'unSyncLtoR') {
    const result = await asyncForEach(data, async (singleData: any) => {
      const result = await remotePrisma.$transaction(
        async remoteTx => {
          // @ts-ignore
          const find = await remoteTx[payload?.schemaName].findFirst({
            where: {
              id: singleData?.id,
            },
          })
          // If data exist on remote database run if condition, if not exist run else condition
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
        },
        {
          maxWait: Number(config.txwait),
          timeout: Number(config.txtimeout),
        },
      )
      return result
    })

    return result
  }

  // Remote to Local
  if (path === 'unSyncRtoL') {
    const result = await asyncForEach(data, async (singleData: any) => {
      const result = await localPrisma.$transaction(
        async localTx => {
          // @ts-ignore
          const find = await localTx[payload?.schemaName].findFirst({
            where: {
              id: singleData?.id,
            },
          })

          if (find !== null) {
            // @ts-ignore
            const result = await localTx[payload?.schemaName].update({
              where: { id: find?.id },
              data: singleData,
            })

            if (result == null) {
              throw new ApiError(
                httpStatus.NOT_FOUND,
                'Data not updated on local data',
              )
            }

            const update = await remotePrisma.$transaction(async remoteTx => {
              // @ts-ignore
              const update = await remoteTx[payload?.schemaName].update({
                where: { id: result?.id },
                data: { isSynced: true },
              })
              return update
            })

            if (update == null) {
              throw new ApiError(
                httpStatus.NOT_FOUND,
                'Data not updated on remote data',
              )
            }
            return update
          } else {
            // @ts-ignore
            const result = await localTx[payload?.schemaName].create({
              data: singleData,
            })

            if (result == null) {
              throw new ApiError(
                httpStatus.NOT_FOUND,
                'Data not create on local data',
              )
            }

            const update = await remotePrisma.$transaction(async remoteTx => {
              // @ts-ignore
              const update = await remoteTx[payload?.schemaName].update({
                where: { id: result?.id },
                data: { isSynced: true },
              })
              return update
            })

            if (update == null) {
              throw new ApiError(
                httpStatus.NOT_FOUND,
                'Data not updated on remote data',
              )
            }
            return update
          }
        },
        {
          maxWait: Number(config.txwait),
          timeout: Number(config.txtimeout),
        },
      )
      return result
    })

    return result
  }

  return null
}

// Get unmarge service
export const getUnmargeService = async (
  schemaName: any,
): Promise<IGenericResponse<any[]> | null> => {
  // @ts-ignore
  const localData = await localPrisma[schemaName?.schemaName].findMany({})
  // @ts-ignore
  const remoteData = await remotePrisma[schemaName?.schemaName].findMany({})

  const localIds = new Set(localData.map((item: any) => item.id))

  const unMargeData = remoteData.filter((item: any) => !localIds.has(item.id))

  return {
    meta: {
      total: unMargeData.length,
      page: 0,
      limit: 0,
    },
    data: unMargeData,
  }
}

// Delete unmarge service
export const deleteUnmargeService = async (
  payload: any,
): Promise<any | null> => {
  // @ts-ignore
  const result = await remotePrisma[payload?.schemaName].deleteMany({
    where: {
      id: {
        in: payload?.data,
      },
    },
  })

  return result
}
