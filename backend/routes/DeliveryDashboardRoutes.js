import { deliveryDashboardData } from "../controllers/DeliveryController.js";

import express from 'express'

const router = express.Router()

router.get('/dashboard-data',deliveryDashboardData)

export default router