/* eslint-disable @typescript-eslint/no-explicit-any */

import { Request, Response } from 'express'
import { tryCatch } from '../../../utilities/tryCatch'
import { sendRes } from '../../../utilities/sendRes'
import httpStatus from 'http-status'
import {
  getDbUnsyncsService,
  testDbsyncService,
  updateUnsyncsService,
} from './dbsync.services'

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
  const result = await getDbUnsyncsService(
    req?.route?.path.slice(1),
    req?.query,
  )
  sendRes<any[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Dbsyncs retrived successfully',
    meta: result?.meta,
    data: result?.data,
  })
})

// delete products
export const updateUnsyncs = tryCatch(async (req: Request, res: Response) => {
  const result = await updateUnsyncsService(req?.route?.path.slice(1), req.body)
  sendRes<any | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Database syncs successfully',
    data: result,
  })
})
