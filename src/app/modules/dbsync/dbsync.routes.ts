import express from 'express'
import { auth } from '../../../middleware/auth'
import { ENUM_USER_ROLE } from '../../../enums/user'
import {
  deleteUnmarge,
  getUnmarge,
  getUnsyncs,
  testDbsync,
  updateUnsyncs,
} from './dbsync.controllers'

const router = express.Router()

// database connection test
router.route('/').get(auth(ENUM_USER_ROLE.OWNER), testDbsync)
// local to remote
router
  .route('/unSyncLtoR')
  .get(auth(ENUM_USER_ROLE.OWNER), getUnsyncs)
  .patch(auth(ENUM_USER_ROLE.OWNER), updateUnsyncs)

// remote to local
router
  .route('/unSyncRtoL')
  .get(auth(ENUM_USER_ROLE.OWNER), getUnsyncs)
  .patch(auth(ENUM_USER_ROLE.OWNER), updateUnsyncs)

// remove unsync data
router
  .route('/unmarge')
  .get(auth(ENUM_USER_ROLE.OWNER), getUnmarge)
  .delete(auth(ENUM_USER_ROLE.OWNER), deleteUnmarge)

export default router
