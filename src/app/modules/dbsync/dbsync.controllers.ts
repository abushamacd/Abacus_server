/* eslint-disable @typescript-eslint/no-explicit-any */

import { Request, Response } from 'express'
import { tryCatch } from '../../../utilities/tryCatch'
import { sendRes } from '../../../utilities/sendRes'
import httpStatus from 'http-status'
import {
  deleteUnmargeService,
  getDbUnsyncsService,
  getUnmargeService,
  testDbsyncService,
  updateUnsyncsService,
} from './dbsync.services'

// Test database connection
export const testDbsync = tryCatch(async (req: Request, res: Response) => {
  const result = await testDbsyncService()
  sendRes<any>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Create dbsync successfully',
    data: result,
  })
})

// Get unsyncs controller
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

// Update unsyncs controller
export const updateUnsyncs = tryCatch(async (req: Request, res: Response) => {
  const result = await updateUnsyncsService(req?.route?.path.slice(1), req.body)
  sendRes<any | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Database syncs successfully',
    data: result,
  })
})

// Get unmarge controller
export const getUnmarge = tryCatch(async (req: Request, res: Response) => {
  const result = await getUnmargeService(req?.query)
  sendRes<any[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Unmarged retrived successfully',
    meta: result?.meta,
    data: result?.data,
  })
})

// Delete unmarge controller
export const deleteUnmarge = tryCatch(async (req: Request, res: Response) => {
  const result = await deleteUnmargeService(req.body)
  sendRes<any[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Unmarged retrived successfully',
    meta: result?.meta,
    data: result?.data,
  })
})
