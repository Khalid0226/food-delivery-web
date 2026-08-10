import { deliveryDashboardData,toggleOnlineStatus,acceptOrder, completeOrder,getAssignedOrders, updateTOInTransit, getDeliveryHistory } from "../controllers/DeliveryController.js";
import { authMiddleware, authorizeRoles } from "../middleware/authMiddleware.js";
import { sendDeliveryOtp,verifyDeliveryOtp } from "../controllers/DeliveryController.js";
import express from 'express'

const router = express.Router()

router.get('/dashboard-data',authMiddleware,authorizeRoles('delivery'),deliveryDashboardData)

router.patch('/update-status',authMiddleware,authorizeRoles('delivery'),toggleOnlineStatus)

router.patch('/accept-order',authMiddleware,authorizeRoles('delivery'),acceptOrder)

router.patch('/in-transit',authMiddleware,authorizeRoles('delivery'),updateTOInTransit)

router.patch('/complete-order',authMiddleware,authorizeRoles('delivery'),completeOrder)

router.get('/assigned-orders',authMiddleware,authorizeRoles('delivery'),getAssignedOrders)

router.get('/delivery-history',authMiddleware,authorizeRoles('delivery'),getDeliveryHistory)

router.post('/send-delivery-otp/:orderId', authMiddleware, authorizeRoles('delivery'), sendDeliveryOtp)

router.post('/verify-delivery-otp', authMiddleware, authorizeRoles('delivery'), verifyDeliveryOtp)

export default router