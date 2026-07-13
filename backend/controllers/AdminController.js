import orderModel from "../models/Order.js";
import userModel from "../models/User.js";


export const getDashboardStats = async (req, res) => {
    try {
        const revenueData = await orderModel.aggregate([
            { $match: { status: { $ne: 'cancelled' } } },
            { $group: { _id: null, total: { $sum: '$totalAmount' } } }
        ])

        const totalOrders = await orderModel.countDocuments()

        const pendingOrders = await orderModel.countDocuments({
            status: { $in: ["pending", "Preparing", "In Transit"] }
        });

        // const totalCustomers = await orderModel.countDocuments()
        // Total Customers (Unique Emails count)
        const totalCustomers = await orderModel.distinct('email', {
            email: { $ne: 'admin@gmail.com' } // Yahan apna admin email daalein
        }).then(data => data.length);

        res.status(201).json({
            message: 'success',
            data: {
                totalRevenue: revenueData[0]?.total || 0,
                totalOrders,
                pendingOrders,
                totalCustomers,
            }
        })

    } catch (error) {
        res.status(500).json({
            message: 'failed',
            error: error.message
        })
    }
}