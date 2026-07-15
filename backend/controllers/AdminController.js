import orderModel from "../models/Order.js";
import userModel from "../models/User.js";


export const getDashboardStats = async (req, res) => {
    try {
        const revenueData = await orderModel.aggregate([
            { $match: { status: { $ne: 'Cancelled' } } },
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


export const getAllCustomers = async (req, res) => {
    try {
        const customerReport = await orderModel.aggregate([
            {
                $group: {
                    _id: '$email',
                    doc: { $first: "$$ROOT" },
                    name: { $first: '$fullName' },
                    mobile: { $first: '$mobile' },
                    totalOrders: { $sum: 1 },
                    // totalSpent: { $sum: { $sum: "$totalAmount" } }
                    totalSpent: { $sum: "$totalAmount" }
                }
            },

            {
                $project: {
                    _id: 0,
                    id: "$doc._id",
                    name: 1,
                    email: "$_id",
                    mobile: 1,
                    totalOrders: 1,
                    totalSpent: 1
                }
            }
        ])

        res.status(200).json({
            message:'success',
            data:customerReport
        })
    } catch (error) {
        res.status(500).json({
            message: 'failed',
            error: error.message
        })
    }
}
