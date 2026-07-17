import express from 'express'

import { getAllCustomers, getDashboardStats, getGraphRevenue } from '../controllers/AdminController.js'

const router = express.Router()

router.get('/dashboard-stats',getDashboardStats)

router.get('/customers',getAllCustomers)

router.get('/graph',getGraphRevenue)

export default router