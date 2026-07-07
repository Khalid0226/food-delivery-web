import mongoose from 'mongoose'

const menuItemSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    category:{
        type:String,
        required:true,
        enum:['Starters', 'Main Course', 'Desserts', 'Chicken', 'Fish', 'Burgers', 'Sides', 'Platters']
    },
    image:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    status: {
        type: String,
        enum: ['Available', 'Unavailable'],
        default: 'Available'
    }
})

const menuItem = mongoose.model('menuItem',menuItemSchema)
export default menuItem