import express from 'express'
import orderModel from '../models/Order.js'
import { getPendingCount, getUserOrderById, order } from '../controllers/OrderController.js'
import { getAllOrder,updateOrder ,userOrder} from '../controllers/OrderController.js'
import { authMiddleware } from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/orders',authMiddleware,order)
router.get('/list',authMiddleware,getAllOrder)
router.post('/update-status',authMiddleware,updateOrder)
router.post('/user-order',authMiddleware,userOrder)

router.get('/user-order/:orderId',authMiddleware,getUserOrderById)

router.get('/pending-orders',authMiddleware,getPendingCount)

export default router
