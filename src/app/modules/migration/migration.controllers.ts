/* eslint-disable @typescript-eslint/no-explicit-any */

// import { Request, Response } from 'express'
// import { tryCatch } from '../../../utilities/tryCatch'
// import { sendRes } from '../../../utilities/sendRes'
// import httpStatus from 'http-status'

// // create migration controller
// export const createMigration = tryCatch(async (req: Request, res: Response) => {
//   const result = await createMigrationService(req.body)
//   sendRes<any>(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Create migration successfully',
//     data: result,
//   })
// })

// // get migrations controller
// export const getMigrations = tryCatch(async (req: Request, res: Response) => {
//   const filters = pick(req.query, migrationFilterableFields)
//   const options = pick(req.query, paginationFields)
//   const result = await getMigrationsService(filters, options)
//   sendRes<any>(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Migrations retrived successfully',
//     meta: result?.meta,
//     data: result?.data,
//   })
// })

// // get migration controller
// export const getMigration = tryCatch(async (req: Request, res: Response) => {
//   const result = await getMigrationService(req?.params?.id)
//   sendRes<any>(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Migration retrived successfully',
//     data: result,
//   })
// })

// // update migration controller
// export const updateMigration = tryCatch(async (req: Request, res: Response) => {
//   const { id } = req.params
//   const result = await updateMigrationService(id, req?.body)
//   sendRes<any>(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Migration updated successfully',
//     data: result,
//   })
// })

// // delete migration
// export const deleteMigration = tryCatch(async (req: Request, res: Response) => {
//   const { id } = req.params
//   const result = await deleteMigrationService(id)
//   sendRes<any | null>(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Migration deleted successfully',
//     data: result,
//   })
// })
