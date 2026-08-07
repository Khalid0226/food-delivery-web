import express from 'express'
import { getAllItems,addItem, getProductById, deleteProduct, updateProduct} from '../controllers/MenuController.js'
import path from 'path'
import multer from 'multer'
import { authMiddleware, authorizeRoles } from '../middleware/authMiddleware.js'

const router = express.Router()

const storage = multer.diskStorage({
    destination:'./uploads/',
    filename:(req,file,cb)=>{
        cb(null, Date.now() + path.extname(file.originalname));
    }
})

const upload = multer({storage:storage})

router.get('/view-item',getAllItems)

router.get('/product/:id',getProductById)

router.post('/add-item',authMiddleware,authorizeRoles('admin'),upload.single('image'),addItem)

router.delete('/product/:id',authMiddleware,authorizeRoles('admin'),deleteProduct)

router.put('/product/:id',authMiddleware,authorizeRoles('admin'),upload.single('image'),updateProduct)

export default router