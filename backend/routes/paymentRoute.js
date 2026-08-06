import express from 'express';
import { createRazorpayOrder, verifyRazorpayPayment } from '../controllers/paymentController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/create-order',authMiddleware, createRazorpayOrder);
router.post('/verify-payment',authMiddleware, verifyRazorpayPayment);

export default router;