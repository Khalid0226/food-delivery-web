import orderModel from "../models/Order.js";
import userModel from "../models/User.js";

export const deliveryDashboardData = async (req, res) => {
    try {
        const { userId } = req.query;

        // 1. Sabse pehle delivery boy ka status check karo
        let deliveryUser = null;
        if (userId) {
            deliveryUser = await userModel.findById(userId);
        }

        // 2. Agar delivery boy offline hai (ya user nahi mila), toh availableOrders empty rahenge
        let availableOrder = [];
        if (deliveryUser && deliveryUser.isOnline) {
            availableOrder = await orderModel.find({
                status: { $in: ['pending'] }
            }).sort({ createdAt: -1 });
        }

        const activeOrder = await orderModel.findOne({
            deliveryBoy: userId,
            status: { $nin: ['pending', 'Pending', 'Completed', 'In Transit', 'Cancelled'] }
        });

        const totalDeliveries = await orderModel.countDocuments({ deliveryBoy: userId, status: 'Completed' });

        res.status(200).json({
            message: 'success',
            availableOrders: availableOrder,
            activeOrder,
            states: {
                totalDeliveries,
                pendingOrders: availableOrder.length,
                todayEarnings: totalDeliveries * 50,
                isOnline: deliveryUser ? deliveryUser.isOnline : false
            }
        });
    } catch (error) {
        res.status(500).json({
            message: 'failed',
            error: error.message
        });
    }
}


export const toggleOnlineStatus = async (req, res) => {
    try {
        const { userId, isOnline } = req.body

        const updateUser = await userModel.findByIdAndUpdate(
            userId,
            { isOnline },
            { new: true }
        )

        if (!updateUser) {
            return res.status(404).json({
                message: 'delivery boy not found!!'
            })
        }

        res.status(200).json({
            message: `Status updated to ${isOnline ? 'Online' : 'Offline'}`,
            isOnline: updateUser.isOnline

        })

    } catch (error) {
        res.status(500).json({
            message: 'failed',
            error: error.message
        })
    }
}


export const acceptOrder = async (req, res) => {
    try {
        const { orderId, deliveryBoyId } = req.body

        const updateOrder = await orderModel.findByIdAndUpdate(
            orderId,
            {
                status: 'Preparing',
                deliveryBoy: deliveryBoyId
            },
            { new: true }
        )

        if (!updateOrder) {
            return res.status(404).json({
                message: 'order not found!!'
            })
        }

        res.status(200).json({
            message: 'order accepted successfully!!!',
            order: updateOrder
        })
    } catch (error) {
        res.status(500).json({
            message: 'failed to accept order!!',
            error: error.message
        })
    }
}

export const updateTOInTransit = async (req, res) => {
    try {
        const { orderId } = req.body
        const updateOrder = await orderModel.findByIdAndUpdate(
            orderId,
            { status: "In Transit" },
            { new: true }
        )

        if (!updateOrder) {
            return res.status(404).json({
                message: 'order not found'
            })
        }

        res.status(200).json({
            message: 'success!!!',
            updateOrder

        })
    } catch (error) {
        res.status(500).json({
            message: 'failed',
            error: error.message
        })
    }
}

export const completeOrder = async (req, res) => {
    try {
        const { orderId, deliveryBoyId } = req.body;
        
        const updateOrder = await orderModel.findByIdAndUpdate(
            orderId,
            {
                deliveryEarnings: 50,
                status: 'Completed',
                deliveryBoy: deliveryBoyId,
                deliveredAt: new Date(),
                isPaid: true  // <--- Ye add kar diya taaki COD complete hote hi payment true ho jaye!
            },
            { new: true }
        );

        if (!updateOrder) {
            return res.status(404).json({
                message: "order not found"
            }); // <--- Yahan 'return' lagana zaroori hai!
        }

        return res.status(200).json({
            message: 'order complete successfully!!',
            updateOrder
        });

    } catch (error) {
        return res.status(500).json({
            message: "failed to complete order",
            error: error.message
        });
    }
}

export const getAssignedOrders = async (req, res) => {
    try {
        const { deliveryBoyId } = req.query;

        // 1. Pehle delivery boy ka status check karo
        let deliveryUser = null;
        if (deliveryBoyId) {
            deliveryUser = await userModel.findById(deliveryBoyId);
        }

        let query = {};

        // 2. Agar delivery boy ONLINE hai, toh use apne assigned orders + unassigned pending orders dikhao
        if (deliveryUser && deliveryUser.isOnline) {
            query = {
                $or: [
                    { deliveryBoy: deliveryBoyId },
                    { deliveryBoy: null, status: 'pending' }
                ]
            };
        } else {
            // 3. Agar OFFLINE hai, toh sirf wahi orders dikhao jo strictly isko assigned hain
            query = {
                deliveryBoy: deliveryBoyId
            };
        }

        const orders = await orderModel.find(query).sort({ createdAt: -1 });

        res.status(200).json({
            message: "success",
            orders
        });
    } catch (error) {
        res.status(500).json({
            message: 'failed',
            error: error.message
        });
    }
};

export const getDeliveryHistory = async (req, res) => {
    try {
        const { deliveryBoyId } = req.query
        // console.log("Searching for deliveryBoyId:", deliveryBoyId);

        const deliveryHistory = await orderModel.find({
            deliveryBoy: deliveryBoyId,
            status: 'Completed'
        }).sort({ deliveredAt: - 1 })

        // console.log("2. Database se kitne orders mile:", deliveryHistory.length);
        // console.log("3. Orders ka data:", deliveryHistory); // Ye terminal me print karega
        if (!deliveryHistory) {
            return res.status(404).json({
                message: "history not found!!"
            })
        }

        res.status(200).json({
            message: 'history fetched successfully',
            deliveryHistory
        })
    } catch (error) {
        res.status(500).json({
            message: 'failed to fetch order history',
            error: error.message
        })
    }
}