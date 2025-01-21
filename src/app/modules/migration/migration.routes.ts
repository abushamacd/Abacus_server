import express from 'express'
// import reqValidate from '../../../middleware/reqValidate'
// import { auth } from '../../../middleware/auth'
// import { ENUM_USER_ROLE } from '../../../enums/user'
// import { createMigrationZod } from './migration.validations'
import {
  // createMigration,
  // deleteMigration,
  // getMigration,
  // getMigrations,
  // updateMigration,
  testDBConnect,
} from './migration.controllers'

import { connectivity } from '../../../middleware/connectivity'

const router = express.Router()

// example migration route
// router
//   .route('/')
//   .post(
//     auth(ENUM_USER_ROLE.OWNER),
//     reqValidate(createMigrationZod),
//     createMigration,
//   )
//   .get(auth(ENUM_USER_ROLE.OWNER), getMigrations)

router.route('/testConnect').get(
  // auth(ENUM_USER_ROLE.OWNER),
  connectivity,
  testDBConnect,
)

// router
//   .route('/:id')
//   .get(auth(ENUM_USER_ROLE.OWNER, ENUM_USER_ROLE.MANAGER), getMigration)
//   .patch(auth(ENUM_USER_ROLE.OWNER, ENUM_USER_ROLE.MANAGER), updateMigration)
//   .delete(auth(ENUM_USER_ROLE.OWNER), deleteMigration)

export default router
