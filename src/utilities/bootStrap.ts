/* eslint-disable no-console */
import config from '../config'
import app from '../app'
import { errorLogger, logger } from './logger'
import { Server } from 'http'
import prisma from './prisma'
let server: Server

export async function bootStrap() {
  try {
    // Connect to the database
    await prisma.$connect()
    logger.info(`==== ✌️  DB Connection is successfully established ====`)

    // Start the server
    server = app.listen(config.port, () => {
      logger.info(
        config.env === 'development'
          ? `==== ✌️  Your server is running on http://localhost:${config.port} ====`
          : `Server is running in ${config.env} mode`,
      )
    })
  } catch (error) {
    errorLogger.error(`==== 🤞  Database Connection Error ====`, error)
    process.exit(1)
  }

  // Handle unhandled promise rejections
  process.on('unhandledRejection', error => {
    console.log('Unhandled Rejection at:', error)
    if (server) {
      server.close(() => {
        errorLogger.error('Unhandled Rejection, server shutting down', error)
        process.exit(1)
      })
    } else {
      process.exit(1)
    }
  })

  // Gracefully shut down on SIGTERM and SIGINT
  process.on('SIGTERM', shutdown)
  process.on('SIGINT', shutdown)
}

function shutdown() {
  logger.info('SIGTERM or SIGINT received: shutting down gracefully')
  if (server) {
    server.close(async () => {
      logger.info('Closed out remaining connections')
      await prisma.$disconnect()
      process.exit(0)
    })
  } else {
    process.exit(0)
  }
}
