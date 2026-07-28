import { deliveryDashboardData,toggleOnlineStatus } from "../controllers/DeliveryController.js";

import express from 'express'

const router = express.Router()

router.get('/dashboard-data',deliveryDashboardData)

router.patch('/update-status',toggleOnlineStatus)

export default router