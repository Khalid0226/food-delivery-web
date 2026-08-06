import { deliveryDashboardData,toggleOnlineStatus,acceptOrder, completeOrder,getAssignedOrders, updateTOInTransit, getDeliveryHistory } from "../controllers/DeliveryController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import express from 'express'

const router = express.Router()

router.get('/dashboard-data',authMiddleware,deliveryDashboardData)

router.patch('/update-status',authMiddleware,toggleOnlineStatus)

router.patch('/accept-order',authMiddleware,acceptOrder)

router.patch('/in-transit',authMiddleware,updateTOInTransit)

router.patch('/complete-order',authMiddleware,completeOrder)

router.get('/assigned-orders',authMiddleware,getAssignedOrders)

router.get('/delivery-history',authMiddleware,getDeliveryHistory)

export default router