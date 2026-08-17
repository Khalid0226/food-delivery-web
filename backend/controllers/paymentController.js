import Razorpay from 'razorpay';
import crypto from 'crypto';

// Helper function jo runtime par instance banayega (jab env load ho chuka hoga)
const getRazorpayInstance = () => {
    return new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
};

// 1. Order Create karne ki API
export const createRazorpayOrder = async (req, res) => {
    try {
        const { amount } = req.body; // Amount Rupees me aayega

        const razorpayInstance = getRazorpayInstance();

        const options = {
            amount: Number(amount) * 100, // Razorpay paise me accept karta hai (₹100 = 10000 paise)
            currency: "INR",
            receipt: `receipt_${Date.now()}`
        };

        const order = await razorpayInstance.orders.create(options);
        
        res.status(200).json({
            success: true,
            order,
            keyId: process.env.RAZORPAY_KEY_ID // <--- Yeh line zaroor add karein
        });
    } catch (error) {
        console.error("Razorpay Order Error:", error);
        res.status(500).json({ success: false, message: "Failed to create order" });
    }
};

// 2. Payment Verify karne ki API (Security ke liye)
export const verifyRazorpayPayment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        const body = razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(body.toString())
            .digest('hex');

        const isAuthentic = expectedSignature === razorpay_signature;

        if (isAuthentic) {
            // Payment 100% successful aur secure hai!
            res.status(200).json({
                success: true,
                message: "Payment verified successfully",
                paymentId: razorpay_payment_id
            });
        } else {
            res.status(400).json({
                success: false,
                message: "Invalid payment signature"
            });
        }
    } catch (error) {
        console.error("Verification Error:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};