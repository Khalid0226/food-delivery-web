import userModel from "../models/User.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'; // import zaroor karein
import orderModel from "../models/Order.js";
import nodemailer from 'nodemailer'

export const register = async (req, res) => {
    try {
        const { name, email, phone, password, role } = req.body

        const exist = await userModel.findOne({ email })
        if (exist) {
            return res.status(400).json({
                message: 'user already exist!!'
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await userModel.create({
            name, email, phone, password: hashedPassword, role
        })
        res.status(201).json({
            message: 'user created successfully!!',
            user: user
        })
    } catch (error) {
        res.status(500).json({
            message: 'try Again later!!!',
            error: error.message
        })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email })

        if (!user) {
            return res.status(404).json({
                message: 'user not found'
            })
        }

        console.log(password);
        console.log(user.password);



        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({
                message: 'invalid user!!'
            })
        }

        const token = jwt.sign(
            { id: user._id, role: user.role },
            // 'secretkey',
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        )

        res.status(200).json({
            message: 'success',
            token: token,
            user: user
        })


    } catch (error) {
        res.status(500).json({
            message: 'try again later!!',
            error: error.message
        })
    }
}

export const deleteCustomer = async (req, res) => {
    try {
        const { email } = req.params;

        // 1. Pehle userModel se user ko delete karein
        const userDeleted = await userModel.findOneAndDelete({ email: email });

        // 2. Ab orderModel se uske saare orders delete karein
        const ordersDeleted = await orderModel.deleteMany({ email: email });

        // Check karein ki kya user exist karta tha
        if (!userDeleted) {
            return res.status(404).json({ message: 'Customer not found in system!' });
        }

        return res.status(200).json({
            message: 'Customer and their orders deleted successfully',
            userDeleted,
            ordersDeleted
        });

    } catch (error) {
        res.status(500).json({ message: 'Failed to delete customer', error: error.message });
    }
}

export const getCustomerById = async (req, res) => {

    const { id } = req.params
    const user = await userModel.findById(id)

    const orders = await orderModel.find({ email: user.email }).sort({ createdAt: -1 });

    // if (!Array.isArray(orders)) orders = [];

    // // Ab sort safely karo
    // orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

    const totalSpent = await orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0)

    if (!user) {
        res.status(404).json({
            message: 'customer not found!!'
        })
    }
    res.status(200).json({
        message: 'success',
        user: user,
        orders: orders,
        stats: {
            totalOrders: orders.length,
            totalSpent,
            avgOrder: orders.length > 0 ? (totalSpent / orders.length).toFixed(2) : 0
        }
    })
    try {

    } catch (error) {
        res.status(500).json({
            message: 'failed to fetch customer!!',
            error: error.message
        })
    }
}



export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body

        const user = await userModel.findOne({ email })

        if (!user) {
            return res.status(404).json({
                message: 'user Not Found!!'
            })
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString()

        user.resetPasswordOtp = otp
        user.resetPasswordExpire = Date.now() + 10 * 60 * 1000
        await user.save()

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
        })

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: 'Password Reset OTP',
            text: `Your OTP for password reset is: ${otp}. It is valid for 10 minutes.`
        })

        res.status(200).json({
            message: "OTP sent to your email successfully"
        });
    } catch (error) {
        console.error("Error in forgotPassword:", error);
        res.status(500).json({
            message: 'failed to send otp',
            error: error.message
        })
    }
}


export const verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body

        const user = await userModel.findOne({ email })

        if (!user || user.resetPasswordOtp !== otp || user.resetPasswordExpire < Date.now()) {
            return res.status(404).json({
                message: 'Invalid or Expired OTP'
            })
        }

        res.status(200).json({ message: "OTP verified successfully" });
    } catch (error) {
        res.status(500).json({
            message: 'Server error',
            error: error.message
        })
    }
}

export const resetPassword = async (req, res) => {
    try {
        const { email, otp, newPassword } = req.body

        const user = await userModel.findOne({ email })

        if (!user || user.resetPasswordOtp !== otp || user.resetPasswordExpire < Date.now()) {
            return res.status(404).json({
                message: 'Invalid or Expired OTP'
            })
        }

        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(newPassword, salt)

        user.resetPasswordOtp = undefined
        user.resetPasswordExpire = undefined
        await user.save()

        res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}