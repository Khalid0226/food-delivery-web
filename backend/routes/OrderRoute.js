import express from 'express'
import orderModel from '../models/Order.js'
import { getPendingCount, getUserOrderById, order } from '../controllers/OrderController.js'
import { getAllOrder,updateOrder ,userOrder} from '../controllers/OrderController.js'
import { authMiddleware, authorizeRoles } from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/orders',authorizeRoles('admin'),authMiddleware,order)
router.get('/list',authMiddleware,authorizeRoles('admin'),getAllOrder)
router.post('/update-status',authMiddleware,authorizeRoles('admin'),updateOrder)
router.post('/user-order',authMiddleware,authorizeRoles('customer'),userOrder)

router.get('/user-order/:orderId',authMiddleware,authorizeRoles('customer','admin'),getUserOrderById)

router.get('/pending-orders',authMiddleware,authorizeRoles('admin','delivery'),getPendingCount)

export default router
