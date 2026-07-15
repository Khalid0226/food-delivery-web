import express from 'express'
import { deleteCustomer, register } from '../controllers/CustomerController.js'
import { login } from '../controllers/CustomerController.js'
// import authMiddleware from '../middleware/authMiddleware.js'



const router = express.Router()

router.post('/register',register)

router.post('/login',login)

router.delete('/customer/:id',deleteCustomer)


export default router