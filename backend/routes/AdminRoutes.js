import express from 'express'

import { getAllCustomers, getDashboardStats, getGraphRevenue } from '../controllers/AdminController.js'
import { authMiddleware } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/dashboard-stats',authMiddleware,getDashboardStats)

router.get('/customers',authMiddleware,getAllCustomers)

router.get('/graph',authMiddleware,getGraphRevenue)

export default router