import express from 'express'

import { getAllCustomers, getDashboardStats, getGraphRevenue } from '../controllers/AdminController.js'
import { authMiddleware,authorizeRoles } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/dashboard-stats',authMiddleware,authorizeRoles('admin'),getDashboardStats)

router.get('/customers',authMiddleware,authorizeRoles('admin'),getAllCustomers)

router.get('/graph',authMiddleware,authorizeRoles('admin'),getGraphRevenue)

export default router