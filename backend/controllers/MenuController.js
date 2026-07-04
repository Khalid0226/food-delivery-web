import menuItem from "../models/MenuItem.js";

export const addItem = async (req, res) => {

    // console.log("Body Data:", req.body); // Text data check karo
    // console.log("File Data:", req.file); // Yahan check karo null toh nahi aa raha?
    try {
        const newItem = new menuItem({
            ...req.body,
            image: req.file ? req.file.filename : ""
        });
        await newItem.save()

        res.status(201).json({
            message: 'item added Successfully!!!',
            item: newItem
        })
    } catch (error) {
        res.status(500).json({
            message: 'try again later',
            error: error.message
        })
    }
}


export const getAllItems = async (req, res) => {
    try {
        const items = await menuItem.find()
        res.status(200).json({
            message: 'success',
            item: items
        })

    } catch (error) {
        res.status(500).json({
            message: 'try Again Later!!',
            error: message.error
        })
    }
}
