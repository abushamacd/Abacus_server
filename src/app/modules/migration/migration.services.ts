/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
// import { Prisma } from '@prisma/client'
// import prisma from '../../../utilities/prisma'
// import httpStatus from 'http-status'
// import { ApiError } from './../../../errorFormating/apiError'
// import { asyncForEach } from '../../../utilities/asyncForEach'

import { connectDatabases } from '../../../utilities/bootStrap'

// Test database connection service
export const testDBConnectService = async (): Promise<any | null> => {
  const resultcon = await connectDatabases()

  console.log(resultcon)
  const result = [{ message: 'All databases connected successfully' }]

  return result
}

// create migration service
// export const createMigrationService = async (
//   data: any,
// ): Promise<any | null> => {
//   const migration = await prisma.migration.findFirst({
//     where: {
//       filed_name: data?.filed_name,
//     },
//   })

//   if (migration) {
//     throw new ApiError(httpStatus.NOT_FOUND, "any is already exist")
//   }

//   const result = await prisma.migration.create({
//     data,
//   })

//   if (!result) {
//     throw new Error("any create failed")
//   }

//   return result
// }

// get migrations service
// export const getMigrationsService = async (
//   filters: IMigrationFilterRequest,
//   options: IPaginationOptions,
// ): Promise<IGenericResponse<any[]> | null> => {
//   const { limit, page, skip } = calculatePagination(options)
//   const { searchTerm, ...filterData } = filters

//   const andConditions = []

//   if (searchTerm) {
//     andConditions.push({
//       OR: migrationSearchableFields.map(field => ({
//         [field]: {
//           contains: searchTerm,
//           // mode: 'insensitive',
//         },
//       })),
//     })
//   }

//   if (Object.keys(filterData).length > 0) {
//     andConditions.push({
//       AND: Object.keys(filterData).map(key => ({
//         [key]: {
//           equals: (filterData as any)[key],
//         },
//       })),
//     })
//   }

//   const whereConditions: Prisma.MigrationWhereInput =
//     andConditions.length > 0 ? { AND: andConditions } : {}

//   const result = await prisma.migration.findMany({
//     where: whereConditions,
//     skip,
//     take: limit,
//     orderBy:
//       options.sortBy && options.sortOrder
//         ? { [options.sortBy]: options.sortOrder }
//         : {
//             createdAt: 'desc',
//           },
//     include: {
//       driver: true,
//       supervisor: true,
//     },
//   })

//   if (!result) {
//     throw new Error('any retrived failed')
//   }

//   const total = await prisma.migration.count({
//     where: whereConditions,
//   })

//   return {
//     meta: {
//       total,
//       page,
//       limit,
//     },
//     data: result,
//   }
// }

// get migration service
// export const getMigrationService = async (id: string): Promise<any | null>  => {
//   const result = await prisma.migration.findUnique({
//     where: {
//       id,
//     },
//     include: {
//       driver: true,
//       supervisor: true,
//     },
//   })

//   if (!result) {
//     throw new Error('any retrived failed')
//   }

//   return result
// }

// // update migration service
// export const updateMigrationService = async (
//   id: string,
//   payload: Partial<any>,
// ): Promise<any | null> => {
//   const isExist = await prisma.migration.findUnique({
//     where: {
//       id,
//     },
//   })

//   if (!isExist) {
//     throw new ApiError(httpStatus.BAD_REQUEST, 'any not found')
//   }

//   const result = await prisma.migration.update({
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
//     throw new Error('any update failed')
//   }

//   return result
// }

// delete migration service
// export const deleteMigrationService = async (
//   id: string,
// ): Promise<any | null> => {
//   const isExist = await prisma.migration.findUnique({
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
//     throw new ApiError(httpStatus.BAD_REQUEST, 'any not found')
//   }

//   const result = await prisma.migration.delete({
//     where: {
//       id,
//     },
//   })

//   // await prisma.$transaction(async transactionClient => {
//   //   await asyncForEach(isExist?.sections, async (section: any) => {
//   //     await transactionClient.task.deleteMany({
//   //       where: {
//   //         sectionId: section?.id,
//   //       },
//   //     })
//   //   })

//   //   await transactionClient.section.deleteMany({
//   //     where: {
//   //       migrationId: id,
//   //     },
//   //   })

//   //   await transactionClient.migration.delete({
//   //     where: {
//   //       id,
//   //     },
//   //   })
//   // })

//   return result
// }
