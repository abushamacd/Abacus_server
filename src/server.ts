/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { errorLogger, logger } from './utilities/logger'
import { bootStrap, connectDatabases } from './utilities/bootStrap'
import { Server } from 'http'
import { syncData } from './syncData'
let server: Server

process.on('uncaughtException', error => {
  errorLogger.error(error)
  process.exit(1)
})

bootStrap()
syncData()
