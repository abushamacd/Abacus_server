import express from 'express'
const router = express.Router()
import authRoute from '../modules/auth/auth.routes'
import userRoute from '../modules/user/user.routes'
import supplierRoute from '../modules/supplier/supplier.routes'
import unitRoute from '../modules/unit/unit.routes'
import productRoute from '../modules/product/product.routes'
import invoiceRoute from '../modules/invoice/invoice.routes'
import dbsyncRoute from '../modules/dbsync/dbsync.routes'

const appRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/user',
    route: userRoute,
  },
  {
    path: '/supplier',
    route: supplierRoute,
  },
  {
    path: '/unit',
    route: unitRoute,
  },
  {
    path: '/product',
    route: productRoute,
  },
  {
    path: '/invoice',
    route: invoiceRoute,
  },
  {
    path: '/dbsync',
    route: dbsyncRoute,
  },
]

appRoutes.forEach(route => router.use(route.path, route.route))

export default router
