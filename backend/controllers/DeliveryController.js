import orderModel from "../models/Order.js";
import userModel from "../models/User.js";

export const deliveryDashboardData = async (req,res) => {
    try {
        const { userId } = req.query;

        const availableOrder = await orderModel.find({
            status:{$in:['pending']}
        }).sort({createdAt:-1})
        

        const activeOrder = await orderModel.findOne({
            deliveryBoy:userId,
            status: {$nin: ['pending', 'Pending', 'Completed', 'In Transit', 'Cancelled'] }
        })


        
        let deliveryUser = null;
        if (userId) {
            deliveryUser = await userModel.findById(userId);
        }
        

        const totalDeliveries = await orderModel.countDocuments({status:'Completed'})

        res.status(200).json({
            message:'success',
            availableOrders: availableOrder,
            activeOrder,
            states:{
                totalDeliveries,
                pendingOrders:availableOrder.length,
                todayEarnings:totalDeliveries*50,
                isOnline: deliveryUser ? deliveryUser.isOnline : false
            }
        })
    } catch (error) {
        res.status(500).json({
            message:'failed',
            error:error.message
        })
    }
}


export const toggleOnlineStatus = async (req,res) => {
    try {
        const {userId,isOnline} = req.body

        const updateUser = await userModel.findByIdAndUpdate(
            userId,
            {isOnline},
            {new:true}
        )

        if (!updateUser) {
            return res.status(404).json({
                message:'delivery boy not found!!'
            })
        }

        res.status(200).json({
            message: `Status updated to ${isOnline ? 'Online' : 'Offline'}`,
            isOnline: updateUser.isOnline

        })
        
    } catch (error) {
        res.status(500).json({
            message:'failed',
            error:error.message
        })
    }
}


export const acceptOrder = async (req,res) => {
    try {
        const {orderId,deliveryBoyId} = req.body

        const updateOrder = await orderModel.findByIdAndUpdate(
            orderId,
            {
                status:'Preparing',
                deliveryBoy:deliveryBoyId
            },
            {new:true}
        )

        if (!updateOrder) {
            return res.status(404).json({
                message:'order not found!!'
            })
        }

        res.status(200).json({
            message:'order accepted successfully!!!',
            order:updateOrder
        })
    } catch (error) {
        res.status(500).json({
            message:'failed to accept order!!',
            error:error.message
        })
    }
}


export const completeOrder = async (req,res) => {
    try {
        const {orderId} = req.body
        const updateOrder = await orderModel.findByIdAndUpdate(
            orderId,
            {status:'Completed'},
            {new:true}
        )

        if (!updateOrder) {
            res.status(404).json({
                message:"order not found"
            })
        }
        
        res.status(200).json({
            message:'order complete successfully!!',
            updateOrder
        })

    } catch (error) {
        res.status(500).json({
            message:"failed to complete order",
            error:error.message
        })
    }
}