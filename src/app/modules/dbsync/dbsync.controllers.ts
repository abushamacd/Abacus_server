/* eslint-disable @typescript-eslint/no-explicit-any */

import { Request, Response } from 'express'
import { tryCatch } from '../../../utilities/tryCatch'
import { sendRes } from '../../../utilities/sendRes'
import httpStatus from 'http-status'
import { getDbUnsyncsService, testDbsyncService } from './dbsync.services'
// import {createDbsyncService,  deleteDbsyncService, getDbsyncService, getDbsyncsService,   updateDbsyncService } from './dbsync.services'
// import { dbsyncFilterableFields } from './dbsync.constants'
// import { paginationFields } from '../../../constants/pagination'
// import { pick } from '../../../utilities/pick'

// test db connection
export const testDbsync = tryCatch(async (req: Request, res: Response) => {
  const result = await testDbsyncService()
  sendRes<any>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Create dbsync successfully',
    data: result,
  })
})

// // get Db Unsyncs controller
export const getUnsyncs = tryCatch(async (req: Request, res: Response) => {
  const result = await getDbUnsyncsService(req?.query)
  sendRes<any[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Dbsyncs retrived successfully',
    meta: result?.meta,
    data: result?.data,
  })
})

// // get dbsync controller
// export const getDbsync = tryCatch(async (req: Request, res: Response) => {
//   const result = await getDbsyncService(req?.params?.id)
//   sendRes<Dbsync>(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Dbsync retrived successfully',
//     data: result,
//   })
// })

// // update dbsync controller
// export const updateDbsync = tryCatch(async (req: Request, res: Response) => {
//   const { id } = req.params
//   const result = await updateDbsyncService(id, req?.body)
//   sendRes<Dbsync>(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Dbsync updated successfully',
//     data: result,
//   })
// })

// // delete dbsync
// export const deleteDbsync = tryCatch(async (req: Request, res: Response) => {
//   const { id } = req.params
//   const result = await deleteDbsyncService(id)
//   sendRes<Dbsync | null>(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Dbsync deleted successfully',
//     data: result,
//   })
// })
