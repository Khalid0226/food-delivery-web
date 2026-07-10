import express from 'express'
import orderModel from '../models/Order.js'
import { order } from '../controllers/OrderController.js'
import { getAllOrder } from '../controllers/OrderController.js'

const router = express.Router()

router.post('/orders',order)
router.get('/list',getAllOrder)

export default router
