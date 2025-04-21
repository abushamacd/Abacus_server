import express from 'express'
// import reqValidate from '../../../middleware/reqValidate'
import { auth } from '../../../middleware/auth'
import { ENUM_USER_ROLE } from '../../../enums/user'
// import { createDbsyncZod } from './dbsync.validations'
import {
  deleteUnmarge,
  getUnmarge,
  getUnsyncs,
  testDbsync,
  updateUnsyncs,
} from './dbsync.controllers'

const router = express.Router()

// example dbsync route
router.route('/').get(auth(ENUM_USER_ROLE.OWNER), testDbsync)

router
  .route('/unSyncLtoR')
  .get(auth(ENUM_USER_ROLE.OWNER), getUnsyncs)
  .patch(auth(ENUM_USER_ROLE.OWNER), updateUnsyncs)

router
  .route('/unSyncRtoL')
  .get(auth(ENUM_USER_ROLE.OWNER), getUnsyncs)
  .patch(auth(ENUM_USER_ROLE.OWNER), updateUnsyncs)

router
  .route('/unmarge')
  .get(auth(ENUM_USER_ROLE.OWNER), getUnmarge)
  .delete(auth(ENUM_USER_ROLE.OWNER), deleteUnmarge)

export default router
