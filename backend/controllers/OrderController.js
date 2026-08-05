import orderModel from "../models/Order.js";
import userModel from "../models/User.js";
import mongoose from "mongoose";

export const order = async (req, res) => {
    try {
        // console.log("Request body:", req.body);
        
        const newOrder = new orderModel({
            ...req.body,
            // Agar frontend se 'id' aa raha hai user ka, to ensure karne ke liye:
            // userId: req.body.id 
        });

        // Yahan 'await' lagana bohot zaroori hai!
        await newOrder.save(); 

        res.status(201).json({
            message: 'order placed Successfully!!',
            order: newOrder
        });
    } catch (error) {
        console.error("Order save error:", error);
        res.status(500).json({
            message: 'failed to place order',
            error: error.message
        });
    }
};

export const getAllOrder = async(req,res) =>{
    try {
        const allOrder = await orderModel.find().sort({createdAt:-1})
        res.status(200).json({
            message:'successfully fetch orders',
            order:allOrder
        })
    } catch (error) {
        res.status(500).json({
            message:'failed to fetch orders!!',
            error:error.message
        })
    }
}

export const updateOrder = async (req,res) => {
    try {
        const {orderId,status} = req.body
        // console.log("Updating:", orderId, status);
        await orderModel.findByIdAndUpdate(orderId,{status:status},{ new: true })
        res.status(201).json({
            success:true,
            message:'success',

        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:'failed'
        })
    }
}


export const userOrder = async (req,res) => {
    try {
        const {email}  = req.body

        const order = await orderModel.find({email:email})

        res.status(200).json({
            message:'success',
            order:order
        })
        
    } catch (error) {
        res.status(500).json({
            message:'failed to fetch order',
            error:error.message
        })
    }
}

export const getUserOrderById = async (req,res) => {
    try {
        const order = await orderModel.findById(req.params.orderId)
        if (!order) {
            res.status(404).json({
                message:'order not found!!'
            })
        }
        res.status(200).json({
            message:'success!!',
            order:order
        })
    } catch (error) {
        res.status(500).json({
            message:'failed to fetch order',
            error:error.message
        })
    }
}


export const getPendingCount = async (req, res) => {
    try {
        const { deliveryBoyId } = req.query;

        if (deliveryBoyId && deliveryBoyId !== 'undefined' && deliveryBoyId !== 'null' && mongoose.Types.ObjectId.isValid(deliveryBoyId)) {
            try {
                const deliveryUser = await userModel.findById(deliveryBoyId);
                const isOnline = deliveryUser?.isOnline === true || deliveryUser?.isOnline === "true" || deliveryUser?.isOnline === 1;

                if (!deliveryUser || !isOnline) {
                    return res.status(200).json({
                        message: 'success',
                        count: 0
                    });
                }
            } catch (err) {
                return res.status(200).json({
                    message: 'success',
                    count: 0
                });
            }
        } else if (deliveryBoyId) {
            return res.status(200).json({
                message: 'success',
                count: 0
            });
        }

        // Yahan se `{ deliveryBoy: "" }` hata diya hai taaki CastError na aaye
        const count = await orderModel.countDocuments({
            status: 'pending',
            $or: [
                { deliveryBoy: null },
                { deliveryBoy: { $exists: false } }
            ]
        });

        res.status(200).json({
            message: 'success',
            count: count
        });

    } catch (error) {
        console.error("--> MAIN CATCH ERROR:", error.message);
        res.status(500).json({
            message: 'failed to fetch new orders',
            error: error.message
        });
    }
}