import express from 'express'
import { getAllItems,addItem, getProduct} from '../controllers/MenuController.js'
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

router.get('/product/:id',getProduct)

export default router