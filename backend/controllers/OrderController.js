import orderModel from "../models/Order.js";
import userModel from "../models/User.js";
import mongoose from "mongoose";
import nodemailer from 'nodemailer'

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

export const getAllOrder = async (req, res) => {
    try {
        const allOrder = await orderModel.find().sort({ createdAt: -1 })
        res.status(200).json({
            message: 'successfully fetch orders',
            order: allOrder
        })
    } catch (error) {
        res.status(500).json({
            message: 'failed to fetch orders!!',
            error: error.message
        })
    }
}

export const updateOrder = async (req, res) => {
    try {
        const { orderId, status } = req.body
        // console.log("Updating:", orderId, status);
        await orderModel.findByIdAndUpdate(orderId, { status: status }, { new: true })
        res.status(201).json({
            success: true,
            message: 'success',

        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'failed'
        })
    }
}


export const userOrder = async (req, res) => {
    try {
        const { email } = req.body

        const order = await orderModel.find({ email: email })

        res.status(200).json({
            message: 'success',
            order: order
        })

    } catch (error) {
        res.status(500).json({
            message: 'failed to fetch order',
            error: error.message
        })
    }
}

export const getUserOrderById = async (req, res) => {
    try {
        const order = await orderModel.findById(req.params.orderId).populate('deliveryBoy')
        // console.log(order);

        if (!order) {
            res.status(404).json({
                message: 'order not found!!'
            })
        }
        res.status(200).json({
            message: 'success!!',
            order: order
        })
    } catch (error) {
        res.status(500).json({
            message: 'failed to fetch order',
            error: error.message
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


export const createOrder = async (req, res) => {
    try {
        const { fullName, email, mobile, address, city, pincode, paymentMethod, items, totalAmount, paymentId, isPaid } = req.body;

        // 1. Check if email exists
        if (!email) {
            return res.status(400).json({ success: false, message: "Customer email is required for invoice" });
        }

        // 2. Save Order to Database
        const newOrder = new orderModel({
            fullName,
            email,
            mobile,
            address,
            city,
            pincode,
            paymentMethod,
            items,
            totalAmount,
            paymentId: paymentId || null,
            isPaid: isPaid || false,
            status: 'pending'
        });

        const savedOrder = await newOrder.save();

        // 3. Generate Items HTML for Invoice (Fallback add kiya hai 'name' ya 'title' ke liye)
        let itemsHTML = '';
        if (items && items.length > 0) {
            itemsHTML = items.map(item => `
                <tr>
                    <td style="padding: 10px; border-bottom: 1px solid #ddd;">${item.name || item.title || 'Product'}</td>
                    <td style="padding: 10px; border-bottom: 1px solid #ddd; text-align: center;">${item.quantity || 1}</td>
                    <td style="padding: 10px; border-bottom: 1px solid #ddd; text-align: right;">₹${item.price || 0}</td>
                </tr>
            `).join('');
        }

        // 4. Send Invoice Email via Nodemailer (Updated with secure host/port for Render)
        try {
            const transporter = nodemailer.createTransport({
                host: 'smtp-relay.brevo.com',
                port: 587,
                secure: false,
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS
                },
                tls: {
                    rejectUnauthorized: false
                }
            });

            const invoiceHTML = `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 8px; background-color: #f9f9f9;">
                    <h2 style="color: #16a34a; text-align: center;">Order Placed Successfully! 🎉</h2>
                    <p>Hello <b>${fullName}</b>,</p>
                    <p>Thank you for your order. Here are your invoice details:</p>
                    
                    <div style="background: #fff; padding: 15px; border-radius: 6px; margin-bottom: 20px; border: 1px solid #e0e0e0;">
                        <p><b>Order ID:</b> ${savedOrder._id}</p>
                        <p><b>Delivery Address:</b> ${address}, ${city} - ${pincode}</p>
                        <p><b>Payment Method:</b> ${paymentMethod || 'COD'}</p>
                    </div>

                    <table style="width: 100%; border-collapse: collapse; background: #fff; border-radius: 6px; overflow: hidden; border: 1px solid #e0e0e0;">
                        <thead>
                            <tr style="background-color: #f2f2f2;">
                                <th style="padding: 10px; text-align: left;">Item</th>
                                <th style="padding: 10px; text-align: center;">Qty</th>
                                <th style="padding: 10px; text-align: right;">Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${itemsHTML}
                        </tbody>
                    </table>

                    <h3 style="text-align: right; color: #111; margin-top: 15px;">Total Amount: ₹${totalAmount}</h3>
                </div>
            `;

            await transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: email,
                subject: `Invoice: Order #${savedOrder._id.toString().slice(-6)} Placed Successfully`,
                html: invoiceHTML
            });
        } catch (emailError) {
            console.error("Email sending failed, but order was saved:", emailError.message);
        }

        return res.status(201).json({
            success: true,
            message: "Order placed successfully!",
            orderId: savedOrder._id
        });

    } catch (error) {
        console.error("Error in createOrder:", error);
        return res.status(500).json({ success: false, message: "Failed to place order", error: error.message });
    }
};