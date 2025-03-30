/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { connectDatabases } from '../../../utilities/bootStrap'
// import { asyncForEach } from '../../../utilities/asyncForEach'

// test db connection service
export const testDbsyncService = async (): Promise<any | null> => {
  const result = await connectDatabases()

  return result
}

// create dbsync service
// export const createDbsyncService = async (
//   data: Dbsync,
// ): Promise<Dbsync | null> => {
//   const dbsync = await prisma.dbsync.findFirst({
//     where: {
//       filed_name: data?.filed_name,
//     },
//   })

//   if (dbsync) {
//     throw new ApiError(httpStatus.NOT_FOUND, "Dbsync is already exist")
//   }

//   const result = await prisma.dbsync.create({
//     data,
//   })

//   if (!result) {
//     throw new Error("Dbsync create failed")
//   }

//   return result
// }

// get dbsyncs service
// export const getDbsyncsService = async (
//   filters: IDbsyncFilterRequest,
//   options: IPaginationOptions,
// ): Promise<IGenericResponse<Dbsync[]> | null> => {
//   const { limit, page, skip } = calculatePagination(options)
//   const { searchTerm, ...filterData } = filters

//   const andConditions = []

//   if (searchTerm) {
//     andConditions.push({
//       OR: dbsyncSearchableFields.map(field => ({
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

//   const whereConditions: Prisma.DbsyncWhereInput =
//     andConditions.length > 0 ? { AND: andConditions } : {}

//   const result = await prisma.dbsync.findMany({
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
//     throw new Error('Dbsync retrived failed')
//   }

//   const total = await prisma.dbsync.count({
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
