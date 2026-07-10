import express from 'express'
import orderModel from '../models/Order.js'
import { order } from '../controllers/OrderController.js'
import { getAllOrder,updateOrder } from '../controllers/OrderController.js'

const router = express.Router()

router.post('/orders',order)
router.get('/list',getAllOrder)
router.post('/update-status',updateOrder)

export default router
