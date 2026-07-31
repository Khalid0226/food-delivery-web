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
    deliveryBoy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // ya jo bhi tera User model ka naam ho
        default: null
    },
    deliveryEarnings: {
        type: Number,
        default: 50 // Default delivery commission
    },
    deliveredAt: {
        type: Date
    },
    createdAt: { type: Date, default: Date.now }
})

const orderModel = mongoose.model('Order', orderSchema)
export default orderModel