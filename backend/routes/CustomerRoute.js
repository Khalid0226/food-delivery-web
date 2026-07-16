import express from 'express'
import { deleteCustomer, register,getCustomerById } from '../controllers/CustomerController.js'
import { login } from '../controllers/CustomerController.js'
// import authMiddleware from '../middleware/authMiddleware.js'



const router = express.Router()

router.post('/register',register)

router.post('/login',login)

router.delete('/customer/:email',deleteCustomer)

router.get('/customer/:id',getCustomerById)


export default router