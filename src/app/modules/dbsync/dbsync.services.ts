/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { IGenericResponse } from '../../../interface/common'
import { connectDatabases } from '../../../utilities/bootStrap'
import { localPrisma } from '../../../utilities/prisma'
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

// delete products service
export const updateUnsyncsService = async (
  data: any[],
): Promise<any | null> => {
  console.log(data)

  return null
}

// get dbsync service
// export const getDbsyncService = async (id: string): Promise<Dbsync | null>  => {
//   const result = await prisma.dbsync.findUnique({
//     where: {
//       id,
//     },
//     include: {
//       driver: true,
//       supervisor: true,
//     },
//   })

//   if (!result) {
//     throw new Error('Dbsync retrived failed')
//   }

//   return result
// }

// update dbsync service
// export const updateDbsyncService = async (
//   id: string,
//   payload: Partial<Dbsync>,
// ): Promise<Dbsync | null> => {
//   const isExist = await prisma.dbsync.findUnique({
//     where: {
//       id,
//     },
//   })

//   if (!isExist) {
//     throw new ApiError(httpStatus.BAD_REQUEST, 'Dbsync not found')
//   }

//   const result = await prisma.dbsync.update({
//     where: {
//       id,
//     },
//     data: payload,
//     include: {
//       driver: true,
//       supervisor: true,
//     },
//   })

//   if (!result) {
//     throw new Error('Dbsync update failed')
//   }

//   return result
// }

// delete dbsync service
// export const deleteDbsyncService = async (
//   id: string,
// ): Promise<Dbsync | null> => {
//   const isExist = await prisma.dbsync.findUnique({
//     where: {
//       id,
//     },
//     // include: {
//     //   // @ts-ignore
//     //   tasks: {
//     //     orderBy: {
//     //       position: 'asc',
//     //     },
//     //   },
//     // },
//   })

//   if (!isExist) {
//     throw new ApiError(httpStatus.BAD_REQUEST, 'Dbsync not found')
//   }

//   const result = await prisma.dbsync.delete({
//     where: {
//       id,
//     },
//   })

//   // await prisma.$transaction(async transactionClient => {
//   //   await asyncForEach(isExist?.sections, async (section: Dbsync) => {
//   //     await transactionClient.task.deleteMany({
//   //       where: {
//   //         sectionId: section?.id,
//   //       },
//   //     })
//   //   })

//   //   await transactionClient.section.deleteMany({
//   //     where: {
//   //       dbsyncId: id,
//   //     },
//   //   })

//   //   await transactionClient.dbsync.delete({
//   //     where: {
//   //       id,
//   //     },
//   //   })
//   // })

//   return result
// }
