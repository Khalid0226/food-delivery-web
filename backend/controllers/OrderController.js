import orderModel from "../models/Order.js";

export const order = async (req, res) => {
    try {
        // console.log("Request body:", req.body);
        const newOrder = new orderModel(
            req.body
            // totalAmount: Number(req.body.totalAmount), // Yahan explicit convert karein
            // items: req.body.items // Array jaise hai waise hi rehne dein
        );
        newOrder.save()
        res.status(201).json({
            message: 'order placed Successfully!!',
            order: newOrder
        })
    } catch (error) {
        res.status(500).json({
            message: 'failed to place order',
            error: error.message
        })
    }
}

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