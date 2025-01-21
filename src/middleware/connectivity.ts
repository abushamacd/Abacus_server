/* eslint-disable no-unreachable */
/* eslint-disable no-console */
import { Request, Response, NextFunction } from 'express'
import dns from 'dns'
import { localPrisma, remotePrisma } from '../utilities/prisma'

export const connectivity = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    // Check internet connectivity
    const internetAvailable = await new Promise<boolean>(resolve => {
      dns.resolve('google.com', err => {
        resolve(!err)
      })
    })

    if (!internetAvailable) {
      res.status(503).json({
        success: false,
        message: 'Internet connection unavailable. Service unavailable.',
      })
      return // Stop further execution
    }

    // Connect to local and remote databases
    try {
      await localPrisma.$connect()
      await remotePrisma.$connect()
      console.log('✅ All databases connected successfully')
      // Send response after successful database connection
      //   res.status(200).json({
      //     success: true,
      //     message: 'All databases connected successfullyyyyyyyyyyyyyyyyy',
      //   })
      //   return
    } catch (dbError) {
      res.status(500).json({
        success: false,
        message: 'Database connection failed: ' + dbError,
      })
      return // Stop further execution
    }

    // If everything is fine, proceed to the next middleware or route handler
    next()
  } catch (error) {
    // Handle unexpected errors
    res.status(500).json({
      success: false,
      message: 'An unexpected error occurred: ' + error,
    })
  }
}
