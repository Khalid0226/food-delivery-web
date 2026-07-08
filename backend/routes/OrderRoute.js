import express from 'express'
import orderModel from '../models/Order.js'
import { order } from '../controllers/OrderController.js'


const router = express.Router()

router.post('/orders',order)

export default router
