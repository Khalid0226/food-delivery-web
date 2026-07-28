import orderModel from "../models/Order.js";
import userModel from "../models/User.js";

export const deliveryDashboardData = async (req,res) => {
    try {
        const availableOrder = await orderModel.find({
            status:{$in:['pending']}
        }).sort({createdAt:-1})

        const { userId } = req.query;
        let deliveryUser = null;
        if (userId) {
            deliveryUser = await userModel.findById(userId);
        }
        

        const totalDeliveries = await orderModel.countDocuments({status:'Completed'})

        res.status(200).json({
            message:'success',
            availableOrders: availableOrder,
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