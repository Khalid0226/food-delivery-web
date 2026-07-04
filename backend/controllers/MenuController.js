import menuItem from "../models/MenuItem.js";

export const addItem = async (req,res) => {
    try {
        const newItem = new menuItem(req.body);
        await newItem.save()

        res.status(201).json({
            message:'item added Successfully!!!',
            item:newItem
        })
    } catch (error) {
        res.status(500).json({
            message:'try again later',
            error:error.message
        })
    }
}


export const getAllItems = async (req,res)=>{
    try {
        const items = await menuItem.find()
        res.status(200).json({
            message:'success',
            item:items
        })
        
    } catch (error) {
        res.status(500).json({
            message:'try Again Later!!',
            error:message.error
        })   
    }
}
