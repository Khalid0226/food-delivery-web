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


// export const getAllCustomers = async (req, res) => {
//     try {
//         const customerReport = await orderModel.aggregate([
//             {
//                 $group: {
//                     _id: '$email',
//                     doc: { $first: "$$ROOT" },
//                     name: { $first: '$fullName' },
//                     mobile: { $first: '$mobile' },
//                     totalOrders: { $sum: 1 },
//                     // totalSpent: { $sum: { $sum: "$totalAmount" } }
//                     totalSpent: { $sum: "$totalAmount" }
//                 }
//             },

//             {
//                 $project: {
//                     _id: 0,
//                     id: "$doc._id",
//                     name: 1,
//                     email: "$_id",
//                     mobile: 1,
//                     totalOrders: 1,
//                     totalSpent: 1
//                 }
//             }
//         ])

//         res.status(200).json({
//             message:'success',
//             data:customerReport
//         })
//     } catch (error) {
//         res.status(500).json({
//             message: 'failed',
//             error: error.message
//         })
//     }
// }

export const getAllCustomers = async (req, res) => {
    try {
        const customerReport = await userModel.aggregate([
            // 1. Sirf 'customer' role wale users lo
            { $match: { role: 'customer' } },

            // 2. Orders collection ke saath join karo
            {
                $lookup: {
                    from: 'orders', // Aapke orders collection ka actual naam
                    localField: 'email',
                    foreignField: 'email',
                    as: 'orders'
                }
            },

            // 3. Data format karo
            {
                $project: {
                    _id: 0,
                    id: "$_id", // User ID
                    name: 1,
                    email: 1,
                    mobile: "$phone",
                    totalOrders: { $size: "$orders" },
                    totalSpent: { $sum: "$orders.totalAmount" }
                }
            }
        ]);

        res.status(200).json({
            message: 'success',
            data: customerReport
        });
    } catch (error) {
        res.status(500).json({
            message: 'failed',
            error: error.message
        });
    }
}


export const getGraphRevenue = async (req, res) => {
    try {

        const { filter } = req.query
        const days = filter === 'days' ? 7 : 30

        const data = await orderModel.aggregate([
            { $match: { createdAt: { $gte: new Date(new Date() - days * 24 * 60 * 60 * 1000) } } },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                    revenue: { $sum: "$totalAmount" }
                }
            },
            {$sort:{_id:1}}
        ])

        res.status(200).json({
            message:'success',
            data:data
        })

    } catch (error) {
        res.status(500).json({
            message: 'failed to fetch revenue!!',
            error: error.message
        })
    }
}