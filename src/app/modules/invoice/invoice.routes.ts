import express from 'express'
import reqValidate from '../../../middleware/reqValidate'
import { auth } from '../../../middleware/auth'
import { ENUM_USER_ROLE } from '../../../enums/user'
import { createInvoiceZod } from './invoice.validations'
import {
  createInvoice,
  deleteInvoice,
  deleteInvoices,
  getInvoice,
  getInvoices,
  updateInvoice,
} from './invoice.controllers'

const router = express.Router()

// create & gets invoice
router
  .route('/')
  .post(
    auth(ENUM_USER_ROLE.OWNER, ENUM_USER_ROLE.MANAGER),
    reqValidate(createInvoiceZod),
    createInvoice,
  )
  .get(
    auth(
      ENUM_USER_ROLE.OWNER,
      ENUM_USER_ROLE.MANAGER,
      ENUM_USER_ROLE.RETAILER,
      ENUM_USER_ROLE.CONSUMER,
    ),
    getInvoices,
  )
  .delete(auth(ENUM_USER_ROLE.OWNER), deleteInvoices)

// get, update & delete invoices
router
  .route('/:id')
  .get(
    auth(
      ENUM_USER_ROLE.OWNER,
      ENUM_USER_ROLE.MANAGER,
      ENUM_USER_ROLE.RETAILER,
      ENUM_USER_ROLE.CONSUMER,
    ),
    getInvoice,
  )
  .patch(auth(ENUM_USER_ROLE.OWNER, ENUM_USER_ROLE.MANAGER), updateInvoice)
  .delete(auth(ENUM_USER_ROLE.OWNER), deleteInvoice)

export default router
