import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phone:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['customer','admin','delivery'],
        default:'customer'
    },
    isOnline:{
        type:Boolean,
        default:false
    },
    resetPasswordOtp:{
        type:String
    },
    resetPasswordExpire:{
        type:String
    }
},{timestamps:true})

const userModel = mongoose.model('User',userSchema)
export default userModel