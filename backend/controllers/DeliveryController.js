import orderModel from "../models/Order.js";

export const deliveryDashboardData = async (req,res) => {
    try {
        const availableOrder = await orderModel.find({
            status:{$in:['pending']}
        }).sort({createdAt:-1})
        

        const totalDeliveries = await orderModel.countDocuments({status:'Completed'})

        res.status(200).json({
            message:'success',
            availableOrders: availableOrder,
            states:{
                totalDeliveries,
                pendingOrders:availableOrder.length,
                todayEarnings:totalDeliveries*50
            }
        })
    } catch (error) {
        res.status(500).json({
            message:'failed',
            error:error.message
        })
    }
}