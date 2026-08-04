import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
    fullName: String,
    email: String,
    mobile: String,
    status: { type: String, default: 'pending' },
    address: String,
    pincode: String,
    city: String,
    paymentMethod: String,
    items: Array,
    totalAmount: Number,
    paymentId: { 
        type: String, 
        default: null 
    }, // Razorpay transaction ID store karne ke liye
    isPaid: { 
        type: Boolean, 
        default: false 
    }, // Track karne ke liye ki payment ho gayi ya nahi
    deliveryBoy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    deliveryEarnings: {
        type: Number,
        default: 50
    },
    deliveredAt: {
        type: Date
    },
    createdAt: { type: Date, default: Date.now }
})

const orderModel = mongoose.model('Order', orderSchema)
export default orderModel