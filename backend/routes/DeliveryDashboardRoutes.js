import { deliveryDashboardData,toggleOnlineStatus,acceptOrder } from "../controllers/DeliveryController.js";

import express from 'express'

const router = express.Router()

router.get('/dashboard-data',deliveryDashboardData)

router.patch('/update-status',toggleOnlineStatus)

router.patch('/accept-order',acceptOrder)

export default router