import express from 'express'
import { deleteCustomer, register,getCustomerById } from '../controllers/CustomerController.js'
import { login } from '../controllers/CustomerController.js'
import { authMiddleware, authorizeRoles } from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/register',register)

router.post('/login',login)

router.delete('/customer/:email',authMiddleware,authorizeRoles('admin',"customer"),deleteCustomer)

router.get('/customer/:id',authMiddleware,authorizeRoles('admin','customer'),getCustomerById)


export default router