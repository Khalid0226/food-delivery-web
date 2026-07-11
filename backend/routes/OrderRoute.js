import express from 'express'
import orderModel from '../models/Order.js'
import { getUserOrderById, order } from '../controllers/OrderController.js'
import { getAllOrder,updateOrder ,userOrder} from '../controllers/OrderController.js'

const router = express.Router()

router.post('/orders',order)
router.get('/list',getAllOrder)
router.post('/update-status',updateOrder)
router.post('/user-order',userOrder)

router.get('/user-order/:orderId',getUserOrderById)

export default router
