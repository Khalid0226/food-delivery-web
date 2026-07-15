import userModel from "../models/User.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'; // import zaroor karein


export const register = async (req,res) =>{
    try {
        const {name,email,phone,password,role} = req.body

        const exist = await userModel.findOne({email})
        if (exist) {
           return res.status(400).json({
            message:'user already exist!!'
           })
        }

        const hashedPassword = await bcrypt.hash(password,10)
        
        const user = await userModel.create({
            name,email,phone,password:hashedPassword,role
        })
        res.status(201).json({
            message:'user created successfully!!',
            user:user
        })
    } catch (error) {
        res.status(500).json({
            message:'try Again later!!!',
            error:error.message
        })   
    }
}

export const login = async (req,res) =>{
    try {
        const {email,password} = req.body;
        
        const user =await userModel.findOne({email})

        if (!user) {
           return res.status(404).json({
                message:'user not found'
            })
        }

        console.log(password);
        console.log(user.password);
        
        

        const isMatch = await bcrypt.compare(password,user.password)
        if (!isMatch) {
           return res.status(400).json({
                message:'invalid user!!'
            })
        }

        const token = jwt.sign(
            {id:user._id,role:user.role},
            'secretkey',
            {expiresIn:'1h'}
        )

        res.status(200).json({
            message:'success',
            token:token,
            user:user
        })


    } catch (error) {
        res.status(500).json({
            message:'try again later!!',
            error:error.message
        })
    }
}

export const deleteCustomer = async (req,res) => {
    try {
        // console.log(req.params.id);
        // const {id} = req.params

        const {email} = req.params
        
        const customerDelete = await userModel.findOneAndDelete({email:email})
        if (!customerDelete) {
            return res.status(404).json({
                message:'no user found!!'
            })
        }
        return res.status(200).json({
            message:'success',
            data:customerDelete
        })
        
    } catch (error) {
        res.status(500).json({
            message:'failed to Delete Customer',
            error:error.message
        })
    }
}

