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

router
  .route('/unSyncLtoR')
  //   .post(
  //     auth(ENUM_USER_ROLE.OWNER,),
  //     reqValidate(createDbsyncZod),
  //     createDbsync
  //   )
  .get(getUnsyncs)
  .patch(updateUnsyncs)

// router
//   .route('/:id')
//   .get(auth(ENUM_USER_ROLE.OWNER, ENUM_USER_ROLE.MANAGER), getDbsync)
//   .patch(auth(ENUM_USER_ROLE.OWNER, ENUM_USER_ROLE.MANAGER), updateDbsync)
//     .delete(auth(ENUM_USER_ROLE.OWNER), deleteDbsync)

export default router
