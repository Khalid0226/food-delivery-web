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
            error: error.message
        })
    }
}


export const getProductById = async (req, res) => {
    try {
        const product = await menuItem.findById(req.params.id)

        if (!product) {
            res.status(404).json({
                message: 'product not found!!'
            })
        }
        res.status(200).json({
            message: 'success!!',
            product: product
        })
    } catch (error) {
        res.status(500).json({
            message: 'failed',
            error: error.message
        })
    }
}


export const deleteProduct = async (req, res) => {
    try {
        const deleteItem = await menuItem.findByIdAndDelete(req.params.id)
        res.status(200).json({
            message: 'item deleted successfully!!'
        })
    } catch (error) {
        res.status(500).json({
            message: 'failed!!',
            error: error.message
        })
    }
}

// export const updateProduct = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const updateData = { ...req.body };

//         console.log("ID received:", req.params.id);
//         console.log("Body received:", req.body);
//         console.log("File received:", req.file);

//         // Agar nayi image upload hui hai, toh uska naam updateData mein add karein
//         if (req.file) {
//             updateData.image = req.file.filename;
//         }

//         const updatedItem = await menuItem.findByIdAndUpdate(id, updateData, { new: true });

//         if (!updatedItem) {
//             res.status(401).json({
//                 message: 'failed to update product!!'
//             })
//         }
//         res.status(200).json({
//             message: 'product update successfully!!',
//             product: updateItem
//         })
//     } catch (error) {
//         res.status(500).json({
//             message: 'try again later',
//             error: error.message
//         })
//     }
// }

export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = { ...req.body };

        // 1. Price ko Number mein convert karein (Kyuki body mein wo string '4200' aa raha hai)
        if (updateData.price) {
            updateData.price = Number(updateData.price);
        }

        // 2. Agar file hai, toh image update karein
        if (req.file) {
            updateData.image = req.file.filename;
        }

        // 3. Database Update - 'runValidators: true' yahan important hai
        const updatedItem = await menuItem.findByIdAndUpdate(id, updateData, { 
            new: true,
            runValidators: true 
        });

        if (!updatedItem) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({
            message: 'Product updated successfully!!',
            product: updatedItem
        });
    } catch (error) {
        // Yahan ab terminal mein error ka exact reason dikhega
        console.error("DEBUG ERROR:", error); 
        res.status(500).json({ 
            message: 'Update failed', 
            error: error.message 
        });
    }
}