import express from 'express'
import { getAllItems,addItem } from '../controllers/MenuController.js'

const router = express.Router()


router.post('/add-item',addItem)

router.get('/view-item',getAllItems)

export default router