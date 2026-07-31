import { deliveryDashboardData,toggleOnlineStatus,acceptOrder, completeOrder,getAssignedOrders, updateTOInTransit, getDeliveryHistory } from "../controllers/DeliveryController.js";

import express from 'express'

const router = express.Router()

router.get('/dashboard-data',deliveryDashboardData)

router.patch('/update-status',toggleOnlineStatus)

router.patch('/accept-order',acceptOrder)

router.patch('/in-transit',updateTOInTransit)

router.patch('/complete-order',completeOrder)

router.get('/assigned-orders',getAssignedOrders)

router.get('/delivery-history',getDeliveryHistory)

export default router