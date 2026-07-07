import express from 'express'
import { getAllItems,addItem, getProductById, deleteProduct, updateProduct} from '../controllers/MenuController.js'
import path from 'path'
import multer from 'multer'

const router = express.Router()

const storage = multer.diskStorage({
    destination:'./uploads/',
    filename:(req,file,cb)=>{
        cb(null, Date.now() + path.extname(file.originalname));
    }
})

const upload = multer({storage:storage})

router.post('/add-item',upload.single('image'),addItem)

router.get('/view-item',getAllItems)

router.get('/product/:id',getProductById)

router.delete('/product/:id',deleteProduct)

router.put('/product/:id',upload.single('image'),updateProduct)

export default router