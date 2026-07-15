import express from 'express'

import { getAllCustomers, getDashboardStats } from '../controllers/AdminController.js'

const router = express.Router()

router.get('/dashboard-stats',getDashboardStats)

router.get('/customers',getAllCustomers)


export default router