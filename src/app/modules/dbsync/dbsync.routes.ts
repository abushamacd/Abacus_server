import express from 'express'
// import reqValidate from '../../../middleware/reqValidate'
import { auth } from '../../../middleware/auth'
import { ENUM_USER_ROLE } from '../../../enums/user'
// import { createDbsyncZod } from './dbsync.validations'
import { getUnsyncs, testDbsync, updateUnsyncs } from './dbsync.controllers'

const router = express.Router()

// example dbsync route
router
  .route('/')
  //   .post(
  //     auth(ENUM_USER_ROLE.OWNER,),
  //     reqValidate(createDbsyncZod),
  //     createDbsync
  //   )
  .get(auth(ENUM_USER_ROLE.OWNER), testDbsync)

router.route('/unSyncLtoR').get(getUnsyncs).patch(updateUnsyncs)

router.route('/unSyncRtoL').get(getUnsyncs).patch(updateUnsyncs)

export default router
